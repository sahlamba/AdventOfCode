import fs from 'fs'
import readline from 'readline'

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
