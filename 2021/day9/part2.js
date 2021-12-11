import { processLineByLine, writeFile } from '../../utils/index.js'

class Solution {
  static grid = []

  static parseLine(input) {
    this.grid.push(
      input
        .trim()
        .split('')
        .map((i) => Number.parseInt(i))
    )
  }

  static findLowPoints() {
    const lowPoints = []
    const n = this.grid.length
    const m = this.grid[0].length
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const point = this.grid[i][j]
        let up = Number.MAX_SAFE_INTEGER
        let down = Number.MAX_SAFE_INTEGER
        let left = Number.MAX_SAFE_INTEGER
        let right = Number.MAX_SAFE_INTEGER
        if (i > 0) {
          up = this.grid[i - 1][j]
        }
        if (i < n - 1) {
          down = this.grid[i + 1][j]
        }
        if (j > 0) {
          left = this.grid[i][j - 1]
        }
        if (j < m - 1) {
          right = this.grid[i][j + 1]
        }
        if (point < up && point < down && point < left && point < right) {
          lowPoints.push({ point, i, j })
        }
      }
    }
    return lowPoints
  }

  static findBasinSizes(lowPoints) {
    return lowPoints.map((point) => this.basinSize(this.grid, point.i, point.j))
  }

  static basinSize(grid, i, j) {
    let size = 0
    const n = grid.length
    const m = grid[0].length

    // Use BFS to find basin size with boundary as '9'
    const queue = [[i, j]]
    const visited = new Set(`${i}${j}`) // [0,1] -> "01" for easier check
    while (queue.length > 0) {
      const [x, y] = queue.shift()

      if (x > 0 && grid[x - 1][y] !== 9 && !visited.has(`${x - 1}${y}`)) {
        size++
        visited.add(`${x - 1}${y}`)
        queue.push([x - 1, y]) // Up
      }
      if (x < n - 1 && grid[x + 1][y] !== 9 && !visited.has(`${x + 1}${y}`)) {
        size++
        visited.add(`${x + 1}${y}`)
        queue.push([x + 1, y]) // Down
      }
      if (y > 0 && grid[x][y - 1] !== 9 && !visited.has(`${x}${y - 1}`)) {
        size++
        visited.add(`${x}${y - 1}`)
        queue.push([x, y - 1]) // Left
      }
      if (y < m - 1 && grid[x][y + 1] !== 9 && !visited.has(`${x}${y + 1}`)) {
        size++
        visited.add(`${x}${y + 1}`)
        queue.push([x, y + 1]) // Right
      }
    }
    return size
  }

  static result() {
    const basins = this.findBasinSizes(this.findLowPoints())
    basins.sort((a, b) => b - a) // DESC
    return basins[0] * basins[1] * basins[2]
  }

  static async publishGrid() {
    let content = '<div id="grid">'
    this.grid.map((row, i) => {
      content += `<div>${row
        .map(
          (point, j) =>
            `<span id="${i},${j}" style="display: inline-block; width:1rem; height:1rem;">${point}</span>`
        )
        .join('')}</div>`
    })
    content += '</div>'
    await writeFile('/2021/day9/visualization/grid.html', content)
  }
}

async function solve() {
  processLineByLine(
    '/2021/day9/input.txt',
    (line) => {
      Solution.parseLine(line)
    },
    async () => {
      console.info(Solution.result())
      // await Solution.publishGrid()
    }
  )
}

solve()
