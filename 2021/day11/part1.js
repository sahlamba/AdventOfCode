import { processLineByLine } from '../../utils/index.js'

const energyLevel = 0
const isFlashing = 1

class Solution {
  static grid = []

  static parseLine(line) {
    this.grid.push(
      line
        .trim()
        .split('')
        // Every cell in a grid is a tuple: [octopusEnergyLevel, isFlashing]
        .map((x) => [Number.parseInt(x.trim()), false])
    )
  }

  static updateGrid() {
    let flashCount = 0
    // Update isFlashing and energize
    for (let [i, row] of this.grid.entries()) {
      for (let [j, octopus] of row.entries()) {
        octopus[energyLevel] += 1
        if (octopus[energyLevel] > 9 && !octopus[isFlashing]) {
          octopus[isFlashing] = true
          this.energize(i, j)
        }
      }
    }
    // Reset energy levels and stop flashing
    for (let row of this.grid) {
      for (let octopus of row) {
        if (octopus[isFlashing]) {
          flashCount++
          octopus[energyLevel] = 0
          octopus[isFlashing] = false
        }
      }
    }
    return flashCount
  }

  static energize(i, j) {
    const directions = [
      [-1, -1], // top left
      [-1, 0], // top
      [-1, 1], // top right
      [0, -1], // left
      [0, 1], // right
      [1, -1], // bottom left
      [1, 0], // bottom
      [1, 1], // bottom right
    ]

    const queue = []
    queue.push([i, j])

    while (queue.length > 0) {
      const n = queue.length
      for (let k = 0; k < n; k++) {
        const [x, y] = queue.shift()
        for (let dir of directions) {
          const x1 = x + dir[0]
          const y1 = y + dir[1]
          if (this.withinGrid(x1, y1)) {
            const octopus = this.grid[x1][y1]
            if (!octopus[isFlashing]) {
              octopus[energyLevel] += 1
              if (octopus[energyLevel] > 9) {
                octopus[isFlashing] = true
                queue.push([x1, y1])
              }
            }
          }
        }
      }
    }
  }

  static withinGrid(i, j) {
    const n = this.grid.length
    const m = this.grid[0].length

    return i >= 0 && i < n && j >= 0 && j < m
  }

  static simulate(steps) {
    let flashes = 0
    for (let i = 0; i < steps; i++) {
      flashes += this.updateGrid()
    }
    return flashes
  }

  static result() {
    return this.simulate(100)
  }
}

async function solve() {
  processLineByLine(
    '/2021/day11/input.txt',
    (line) => {
      Solution.parseLine(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
