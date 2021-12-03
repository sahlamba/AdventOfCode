import { processLineByLine } from '../../utils/index.js'

class Solution {
  static count = -1
  static prev = 0

  static countMeasurementIncreases(value) {
    if (value > this.prev) {
      this.count++
    }
    this.prev = value
  }
}

async function solve() {
  await processLineByLine(
    '/2021/day1/input.txt',
    (line) => {
      Solution.countMeasurementIncreases(Number.parseInt(line))
    },
    () => {
      console.info(Solution.count)
    }
  )
}

solve()
