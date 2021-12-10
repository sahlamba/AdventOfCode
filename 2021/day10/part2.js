import { processLineByLine } from '../../utils/index.js'

class Solution {
  static score = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }
  static openingBraceForClosing = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  }
  static closingBraceForOpening = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  }
  static completionScores = []

  static process(line) {
    const stack = []
    const braces = line.trim().split('')

    // Filter corrupted strings
    for (let e of braces) {
      if (this.closingBraceForOpening[e]) {
        stack.push(e)
      } else if (this.openingBraceForClosing[e]) {
        const top = stack.pop()
        if (top !== this.openingBraceForClosing[e]) {
          // Corrupted string so no need to process further
          return
        }
      }
    }

    // Find completion string
    let completionString = ''
    const n = stack.length
    for (let i = 0; i < n; i++) {
      completionString += this.closingBraceForOpening[stack.pop()]
    }

    // Calculate completion score
    this.completionScores.push(
      completionString.split('').reduce((sum, e) => sum * 5 + this.score[e], 0)
    )
  }

  static result() {
    this.completionScores.sort((a, b) => a - b)
    const n = this.completionScores.length
    return this.completionScores[Math.floor(n / 2)]
  }
}

async function solve() {
  processLineByLine(
    '/2021/day10/input.txt',
    (line) => {
      Solution.process(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
