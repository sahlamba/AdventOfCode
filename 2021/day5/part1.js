import { processLineByLine } from '../../utils/index.js'

class Solution {
  static gridPointCount = {}

  static registerInput(line) {
    const [[x1, y1], [x2, y2]] = this.parseInput(line)
    this.markPointsOnGrid(x1, y1, x2, y2)
  }

  static parseInput(line) {
    return line
      .split('->')
      .map((coords) => coords.trim())
      .map((coords) => coords.split(','))
  }

  static markPointsOnGrid(x1, y1, x2, y2) {
    if (x1 === x2) {
      this.markPointsHelper(x1, y1, y2, (x, y) => `${x},${y}`)
      return
    }

    if (y1 === y2) {
      this.markPointsHelper(y1, x1, x2, (y, x) => `${x},${y}`)
    }
  }

  static markPointsHelper(a, b1, b2, keyMaker) {
    for (let i = Math.min(b1, b2); i <= Math.max(b1, b2); i++) {
      const point = keyMaker(a, i)
      let pointCount = this.gridPointCount[point]
      if (pointCount) {
        this.gridPointCount[point] = pointCount + 1
      } else {
        this.gridPointCount[point] = 1
      }
    }
  }

  static result() {
    return Object.keys(this.gridPointCount).filter(
      (point) => this.gridPointCount[point] >= 2
    ).length
  }
}

async function solve() {
  await processLineByLine(
    '/2021/day5/input.txt',
    (line) => {
      Solution.registerInput(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
