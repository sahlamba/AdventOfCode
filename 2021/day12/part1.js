import { readFile } from '../../utils/index.js'

class Solution {
  static graph = {}
  static smallCaves = new Set()

  static buildGraph(input) {
    input
      .trim()
      .split('\n')
      .forEach((line) => {
        const edge = line.trim().split('-')
        const source = edge[0],
          dest = edge[1]
        // Undirected graph so add incoming and outgoing edges
        this.addEdge(source, dest)
        this.addEdge(dest, source)
        if (this.isSmallCave(source)) {
          this.smallCaves.add(source)
        }
        if (this.isSmallCave(dest)) {
          this.smallCaves.add(dest)
        }
      })
  }

  static addEdge(source, dest) {
    if (this.graph[source]) {
      this.graph[source].push(dest)
    } else {
      this.graph[source] = [dest]
    }
  }

  static run() {
    const paths = []
    this.dfs(this.graph, 'start', 'end', new Set(), [], paths)
    return paths
  }

  static dfs(graph, current, target, visited, currentPath, paths) {
    if (!current || current.length === 0) {
      return
    }

    if (current === target) {
      paths.push([...currentPath, current])
      return
    }

    currentPath.push(current)
    if (this.smallCaves.has(current)) {
      visited.add(current)
    }

    const neighbours = graph[current]
    if (neighbours) {
      for (let neighbour of neighbours) {
        if (this.isAllowed(neighbour, visited)) {
          this.dfs(graph, neighbour, target, visited, currentPath, paths)
        }
      }
    }

    currentPath.pop()
    visited.delete(current)
  }

  static isAllowed(cave, visited) {
    if (cave === 'start') {
      return false
    }
    return !visited.has(cave)
  }

  static isSmallCave(cave) {
    if (cave === 'start' || cave === 'end') {
      return false
    }
    return !this.isUpperCase(cave)
  }

  static isUpperCase(str) {
    return (
      str.split('').filter((c) => c === c.toUpperCase()).length === str.length
    )
  }

  static result() {
    const result = this.run()
    // console.info(result.map((path) => path.join(',')).join('\n'))
    return result.length
  }
}

async function solve() {
  const input = await readFile('/2021/day12/input.txt')

  Solution.buildGraph(input)
  console.info(Solution.result())
}

solve()
