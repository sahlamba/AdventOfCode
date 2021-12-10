import { processLineByLine } from '../../utils/index.js'

class Solution {
  static score = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }
  static opening = new Set(['(', '[', '{', '<'])
  static closing = new Set([')', ']', '}', '>'])
  static openingBrace = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  }
  static errorScore = 0

  static process(line) {
    const stack = []
    const braces = line.trim().split('')

    for (let e of braces) {
      if (this.opening.has(e)) {
        stack.push(e)
      } else if (this.closing.has(e)) {
        const top = stack.pop()
        if (top !== this.openingBrace[e]) {
          this.errorScore += this.score[e]
          break
        }
      }
    }
  }

  static result() {
    return this.errorScore
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
