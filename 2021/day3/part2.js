import { processLineByLine } from '../../utils/index.js'

class BitCriteria {
  prefix = ''
  zeroCount = null
  oneCount = null
  entryLength = null
  comparator = null

  constructor(entryLength, comparator) {
    this.zeroCount = new Array(entryLength).fill(0)
    this.oneCount = new Array(entryLength).fill(0)
    this.entryLength = entryLength
    this.comparator = comparator
  }

  updatePrefix(report, index) {
    report.forEach((e) => {
      const bit = e.split('')[index]
      if (bit === '0') {
        this.zeroCount[index]++
      } else if (bit === '1') {
        this.oneCount[index]++
      }
    })

    this.prefix = this.makePrefix(index)
  }

  makePrefix(index) {
    let startDigits = []
    for (let i = 0; i <= index; i++) {
      startDigits[i] = this.comparator(this.oneCount[i], this.zeroCount[i])
    }
    return startDigits.join('')
  }

  check(entry, index) {
    return entry.charAt(index) === this.prefix.charAt(index)
  }
}

class Solution {
  static report = []
  static entryLength = null

  static appendToReport(input) {
    this.report.push(input)

    if (!this.entryLength) {
      this.entryLength = input.length
    }
  }

  static calculateRating(comparator) {
    let report = [...this.report]

    const bitCriteria = new BitCriteria(this.entryLength, comparator)
    for (let i = 0; i < this.entryLength; i++) {
      bitCriteria.updatePrefix(report, i)
      report = report.filter((e) => bitCriteria.check(e, i))
      if (report.length === 1) {
        break
      }
    }

    let rating = 0
    report[0]
      .split('')
      .reverse()
      .forEach((bit, i) => {
        rating += Number.parseInt(bit) * Math.pow(2, i)
      })
    return rating
  }

  static result() {
    const oxygenGeneratorRating = this.calculateRating((ones, zeroes) =>
      ones >= zeroes ? '1' : '0'
    )
    const co2ScrubberRating = this.calculateRating((ones, zeroes) =>
      ones < zeroes ? '1' : '0'
    )
    return oxygenGeneratorRating * co2ScrubberRating
  }
}

async function solve() {
  await processLineByLine(
    '/2021/day3/input.txt',
    (line) => {
      Solution.appendToReport(line)
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
