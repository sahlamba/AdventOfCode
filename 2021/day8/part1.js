import { processLineByLine } from '../../utils/index.js'

class Solution {
  static readings = []

  static parseInput(input) {
    this.readings = [
      ...this.readings,
      ...input
        .split('|')
        .map((s) => s.trim())
        .map((s) => s.split(' ').map((x) => x.trim().length))[1],
    ]
  }

  static count1478() {
    const lengths = new Set([
      2, // segmentLength(1)
      4, // segmentLength(4)
      3, // segmentLength(7)
      7, // segmentLength(8)
    ])

    return this.readings.filter((r) => lengths.has(r)).length
  }

  static result() {
    return this.count1478()
  }
}

async function solve() {
  processLineByLine(
    '/2021/day8/input.txt',
    (line) => {
      Solution.parseInput(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
