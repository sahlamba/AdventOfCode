import { processLineByLine } from '../../utils/index.js'

class Solution {
  static gridPointCount = {}

  static makeKey(x, y) {
    return `${x},${y}`
  }

  static registerInput(line) {
    const [[x1, y1], [x2, y2]] = this.parseInput(line)
    this.markPointsOnGrid(x1, y1, x2, y2)
  }

  static parseInput(line) {
    return line
      .split('->')
      .map((coords) => coords.trim())
      .map((coords) => coords.split(',').map((x) => Number.parseInt(x)))
  }

  static markPointsOnGrid(x1, y1, x2, y2) {
    if (this.is45DegDiagonal(x1, x2, y1, y2)) {
      this.diagonalHelper(x1, x2, y1, y2)
      return
    }

    if (x1 === x2) {
      this.horizontalVerticalHelper(x1, y1, y2, (x, y) => this.makeKey(x, y))
      return
    }

    if (y1 === y2) {
      this.horizontalVerticalHelper(y1, x1, x2, (y, x) => this.makeKey(x, y))
      return
    }
  }

  static horizontalVerticalHelper(a, b1, b2, keyMaker) {
    for (let i = Math.min(b1, b2); i <= Math.max(b1, b2); i++) {
      const point = keyMaker(a, i)
      this.markPointHelper(point)
    }
  }

  static diagonalHelper(x1, x2, y1, y2) {
    let x = []
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      x.push(i)
    }

    let y = []
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      y.push(i)
    }

    if (this.slope(x1, x2, y1, y2) === -1) {
      if (x2 < x1) {
        y.reverse()
      } else if (y2 < y1) {
        x.reverse()
      }
    }

    for (let i = 0; i < x.length; i++) {
      this.markPointHelper(this.makeKey(x[i], y[i]))
    }
  }

  static is45DegDiagonal(x1, x2, y1, y2) {
    return Math.abs(this.slope(x1, x2, y1, y2)) === 1
  }

  static slope(x1, x2, y1, y2) {
    return (y2 - y1) / (x2 - x1)
  }

  static markPointHelper(point) {
    let pointCount = this.gridPointCount[point]
    if (pointCount) {
      this.gridPointCount[point] = pointCount + 1
    } else {
      this.gridPointCount[point] = 1
    }
  }

  static result() {
    // console.info(this.gridPointCount)
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
