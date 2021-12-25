import { readFile } from '../../utils/index.js'

class Solution {
  static grid = []

  static parseInput(input) {
    input
      .trim()
      .split('\n')
      .filter((line) => line)
      .forEach((line) => {
        this.grid.push(line.trim().split(''))
      })
  }

  static step(x) {
    const R = this.grid.length
    const C = this.grid[0].length
    // Move east
    const eastSources = []
    const eastTargets = []
    for (let [r, row] of this.grid.entries()) {
      for (let [c, cell] of row.entries()) {
        if (cell !== '>') continue
        if (this.grid[r][(c + 1) % C] === '.') {
          eastSources.push([r, c])
          eastTargets.push([r, (c + 1) % C])
        }
      }
    }
    for (let source of eastSources) {
      this.grid[source[0]][source[1]] = '.'
    }
    for (let target of eastTargets) {
      this.grid[target[0]][target[1]] = '>'
    }
    const southSources = []
    const southTargets = []
    // Move south
    for (let [r, row] of this.grid.entries()) {
      for (let [c, cell] of row.entries()) {
        if (cell !== 'v') continue
        if (this.grid[(r + 1) % R][c] === '.') {
          southSources.push([r, c])
          southTargets.push([(r + 1) % R, c])
        }
      }
    }
    for (let source of southSources) {
      this.grid[source[0]][source[1]] = '.'
    }
    for (let target of southTargets) {
      this.grid[target[0]][target[1]] = 'v'
    }
    console.info(`===== Step ${x} =====`)
    this.print()
    return eastTargets.length || southTargets.length // We moved if we had some east/south targets
  }

  static print() {
    console.info(this.grid.map((row) => row.join('')).join('\n'))
  }

  static run() {
    let steps = 1
    while (this.step(steps)) {
      steps++
    }
    return steps
  }

  static result() {
    return this.run()
  }
}

async function solve() {
  const input = await readFile('/2021/day25/input.txt')

  Solution.parseInput(input)
  console.info(Solution.result())
}

solve()
