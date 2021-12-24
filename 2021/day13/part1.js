import { processLineByLine } from '../../utils/index.js'

class Solution {
  static paper = []
  static foldInstructions = []

  static parseLine(line) {
    if (!line.trim()) return
    if (line.startsWith('fold')) {
      const [axis, magnitude] = line.trim().split(' along ')[1].split('=')
      this.foldInstructions.push([axis, magnitude]) // E.g. [y, 7]
      return
    }
    this.paper.push(line.trim()) // E.g. 6,10
  }

  static fold(paper, folds) {
    let _paper = [...paper]
    for (const [axis, mag] of folds) {
      if (axis === 'y') {
        _paper = this.foldY(Number.parseInt(mag), _paper)
      } else if (axis === 'x') {
        _paper = this.foldX(Number.parseInt(mag), _paper)
      }
    }
    return _paper
  }

  static foldY(Y, paper) {
    /**
     * Because we're folding UP along y=Y' -
     * 1. All points at y=Y' are discarded
     * 2. All points with y > Y' are moved to (x, 2Y'-y)
     */
    const filtered = paper.filter((coords) => coords.split(',')[1] !== Y)
    const moved = filtered.map((coords) => {
      const [x, y] = coords.split(',')
      const yNum = Number.parseInt(y)
      if (yNum > Y) {
        return `${x},${2 * Y - yNum}`
      }
      return coords
    })
    return moved.filter((v, i, a) => a.indexOf(v) === i)
  }

  static foldX(X, paper) {
    /**
     * Because we're folding LEFT along x=X' -
     * 1. All points at x=X' are discarded
     * 2. All points with x > X' are moved to (2X'-x, y)
     */
    const filtered = paper.filter((coords) => coords.split(',')[0] !== X)
    const moved = filtered.map((coords) => {
      const [x, y] = coords.split(',')
      const xNum = Number.parseInt(x)
      if (xNum > X) {
        return `${2 * X - xNum},${y}`
      }
      return coords
    })
    return moved.filter((v, i, a) => a.indexOf(v) === i)
  }

  static result() {
    // console.info({ paper: this.paper, foldInstructions: this.foldInstructions })
    return this.fold(this.paper, [this.foldInstructions[0]]).length
  }
}

async function solve() {
  processLineByLine(
    '/2021/day13/input.txt',
    (line) => {
      Solution.parseLine(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
