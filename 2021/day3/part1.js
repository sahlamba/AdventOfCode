import { processLineByLine } from '../../utils/index.js'

class Solution {
  static zeroCount = null
  static oneCount = null

  static init(length) {
    if (!this.oneCount) {
      this.oneCount = new Array(length).fill(0)
    }
    if (!this.zeroCount) {
      this.zeroCount = new Array(length).fill(0)
    }
  }

  static updateCounts(input) {
    this.init(input.length)

    input.split('').forEach((bit, index) => {
      if (bit === '0') {
        this.zeroCount[index]++
      } else if (bit === '1') {
        this.oneCount[index]++
      }
    })
  }

  static powerConsumption() {
    let gammaRate = 0
    let epsilonRate = 0

    const n = this.zeroCount.length
    for (let i = n - 1; i > -1; i--) {
      const zeroes = this.zeroCount[i]
      const ones = this.oneCount[i]
      if (ones < zeroes) {
        epsilonRate += Math.pow(2, n - i - 1)
      } else if (ones > zeroes) {
        gammaRate += Math.pow(2, n - i - 1)
      }
    }

    return gammaRate * epsilonRate
  }
}

async function solve() {
  await processLineByLine(
    '/2021/day3/input.txt',
    (line) => {
      Solution.updateCounts(line)
    },
    () => {
      console.info(Solution.powerConsumption())
    }
  )
}

solve()
