import { processLineByLine } from '../../utils/index.js'

class Solution {
  static readings = []

  static parseInput(input) {
    const tuple = input
      .split('|')
      .map((s) => s.trim())
      .map((s) => s.split(' ').map((x) => x.trim()))
    this.readings.push({ signals: tuple[0], output: tuple[1] })
  }

  static deduceOutput(signals, output) {
    const signalDigits = this.deduceSignalDigits(signals)

    return output.map((x) => {
      const sorted = x.split('').sort()
      return signalDigits[sorted.join('')]
    })
  }

  static deduceSignalDigits(signals) {
    const signalSets = {
      1: this.getDigitSegmentSetsBySize(signals, 2)[0],
      4: this.getDigitSegmentSetsBySize(signals, 4)[0],
      7: this.getDigitSegmentSetsBySize(signals, 3)[0],
      8: this.getDigitSegmentSetsBySize(signals, 7)[0],
    }
    this.addSegmentsOfSize5(signals, signalSets)
    this.addSegmentsOfSize6(signals, signalSets)

    // Reverse the map
    return Object.keys(signalSets).reduce((obj, key) => {
      const value = signalSets[key]
      const sorted = [...value].sort()
      obj[sorted.join('')] = key
      return obj
    }, {})
  }

  static addSegmentsOfSize5(signals, signalSets) {
    const size5Segments = this.getDigitSegmentSetsBySize(signals, 5)

    // Find and add 3
    const oneSet = signalSets[1]
    signalSets[3] = size5Segments.filter((s) => this.isSubset(s, oneSet))[0]

    // Find and add 2
    const fourSet = signalSets[4]
    signalSets[2] = size5Segments.filter(
      (s) => this.intersection(fourSet, s).size === 2
    )[0]

    // Remaining segment is for digit 5
    signalSets[5] = size5Segments.filter(
      (s) => s !== signalSets[2] && s !== signalSets[3]
    )[0]
  }

  static addSegmentsOfSize6(signals, signalSets) {
    const size6Segments = this.getDigitSegmentSetsBySize(signals, 6)

    // Find and add 9
    const fourSet = signalSets[4]
    signalSets[9] = size6Segments.filter((s) => this.isSubset(s, fourSet))[0]

    // Find and add 0 or 6
    const oneSet = signalSets[1]
    const zeroOrSix = size6Segments.filter((s) => s !== signalSets[9])
    // Assumption
    const zeroSet = zeroOrSix[0]
    const sixSet = zeroOrSix[1]
    // Constraint
    const diffSet = this.subtract(zeroSet, sixSet)
    if (this.isSubset(oneSet, diffSet)) {
      signalSets[0] = zeroSet
      signalSets[6] = sixSet
    } else {
      // Our assumption contradicts the constraint so swap values
      signalSets[0] = sixSet
      signalSets[6] = zeroSet
    }
  }

  static isSubset(superset, subset) {
    return [...subset].filter((x) => !superset.has(x)).length === 0
  }

  static intersection(set1, set2) {
    return new Set([...set1].filter((x) => set2.has(x)))
  }

  /**
   * returns (set1 - set2); all elements in set1 not in set2
   */
  static subtract(set1, set2) {
    return new Set([...set1].filter((x) => !set2.has(x)))
  }

  static getDigitSegmentSetsBySize(signals, uniqueSize) {
    return signals
      .filter((s) => s.length === uniqueSize)
      .map((s) => s.split('').reduce((set, s) => set.add(s), new Set()))
  }

  static result() {
    return this.readings.reduce(
      (sum, r) =>
        sum + Number.parseInt(this.deduceOutput(r.signals, r.output).join('')),
      0
    )
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
