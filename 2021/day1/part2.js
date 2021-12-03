import fs from 'fs'
import readline from 'readline'

class Solution {
  static window = []
  static windowSum = 0
  static windowSize = 0

  static count = 0

  static countMeasurementIncreases(value) {
    if (this.windowSize < 3) {
      this.window[this.windowSize++] = value
      this.windowSum += value
      return
    }

    const first = this.window[0]
    const nextSum = this.windowSum - first + value

    if (nextSum > this.windowSum) {
      this.count++
    }

    this.windowSum = nextSum
    this.window.shift()
    this.window.push(value)
  }
}

async function solve() {
  const FILE = '/2021/day1/input.txt'

  const fileStream = fs.createReadStream(process.cwd() + FILE)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    Solution.countMeasurementIncreases(Number.parseInt(line))
  }

  console.info(Solution.count)
}

solve()
