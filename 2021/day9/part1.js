import { processLineByLine } from '../../utils/index.js'

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
    // console.info(lowPoints)
    return lowPoints
  }

  static result() {
    return this.findLowPoints().reduce(
      (totalRisk, point) => totalRisk + point.point + 1,
      0
    )
  }
}

async function solve() {
  processLineByLine(
    '/2021/day9/input.txt',
    (line) => {
      Solution.parseLine(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
