import { readFile } from '../../utils/index.js'

class Solution {
  static polymerTemplate = ''
  static pairInsertionRules = {}
  static pairCounts = {}

  static parseInput(input) {
    const lines = input
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && line.length)

    this.polymerTemplate = lines[0]
    for (let i = 1; i < lines.length; i++) {
      const [pair, insertionElement] = lines[i]
        .split('->')
        .map((part) => part.trim())
      this.pairInsertionRules[pair] = insertionElement
    }

    const elements = this.polymerTemplate.split('')
    for (let i = 0; i < elements.length - 1; i++) {
      const pair = `${elements[i]}${elements[i + 1]}`
      this.pairCounts[pair] = this.pairCounts[pair]
        ? this.pairCounts[pair] + 1n
        : 1n
    }
  }

  static run(steps) {
    for (let i = 0; i < steps; i++) {
      this.pairCounts = this.step()
    }
  }

  static step() {
    const _pairCounts = { ...this.pairCounts }
    Object.keys(this.pairCounts).forEach((pair) => {
      const n = this.pairCounts[pair]
      const insertion = this.pairInsertionRules[pair]

      _pairCounts[pair] -= n

      const leftInsertionPair = '' + pair.charAt(0) + insertion
      _pairCounts[leftInsertionPair] = _pairCounts[leftInsertionPair]
        ? _pairCounts[leftInsertionPair] + BigInt(n)
        : BigInt(n)

      const rightInsertionPair = '' + insertion + pair.charAt(1)
      _pairCounts[rightInsertionPair] = _pairCounts[rightInsertionPair]
        ? _pairCounts[rightInsertionPair] + BigInt(n)
        : BigInt(n)
    })
    return _pairCounts
  }

  static result() {
    this.run(40)

    const counts = {}
    Object.keys(this.pairCounts).forEach((pair) => {
      const left = pair.charAt(0)
      const right = pair.charAt(1)
      const count = BigInt(this.pairCounts[pair])

      counts[left] = counts[left] ? counts[left] + count : count
      counts[right] = counts[right] ? counts[right] + count : count
    })

    counts[this.polymerTemplate.charAt(0)] += 1n
    counts[this.polymerTemplate.charAt(this.polymerTemplate.length - 1)] += 1n

    let max = BigInt(Number.MIN_SAFE_INTEGER)
    let min = BigInt(Number.MAX_SAFE_INTEGER)
    Object.keys(counts).forEach((e) => {
      counts[e] /= 2n
      if (counts[e] > max) max = counts[e]
      if (counts[e] < min) min = counts[e]
    })

    // console.info({ result: max - min, counts, pairCounts: this.pairCounts })
    return max - min
  }
}

async function solve() {
  const input = await readFile('/2021/day14/input.txt')

  Solution.parseInput(input)
  console.info(Solution.result())
}

solve()
