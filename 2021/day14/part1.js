import { readFile } from '../../utils/index.js'

class Solution {
  static polymerTemplate = ''
  static pairInsertionRules = {}

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
  }

  static run(steps) {
    for (let i = 0; i < steps; i++) {
      this.polymerTemplate = this.apply(
        this.polymerTemplate,
        this.pairInsertionRules
      )
    }
  }

  static apply(polymer, pairInsertions) {
    const elements = polymer.split('')
    const n = elements.length

    const insertions = []
    for (let i = 0; i < n - 1; i++) {
      const pair = `${elements[i]}${elements[i + 1]}`
      insertions.push(pairInsertions[pair] ? pairInsertions[pair] : null)
    }

    let resultantPolymer = ''
    for (let i = 0; i < n - 1; i++) {
      resultantPolymer =
        resultantPolymer + elements[i] + (insertions[i] ? insertions[i] : '')
    }
    return resultantPolymer + elements[n - 1]
  }

  static result() {
    this.run(10)

    const counts = {}
    const elements = this.polymerTemplate.split('')
    for (let e of elements) {
      counts[e] = counts[e] ? counts[e] + 1 : 1
    }

    let max = Number.MIN_SAFE_INTEGER
    let min = Number.MAX_SAFE_INTEGER
    Object.keys(counts).forEach((e) => {
      max = Math.max(counts[e], max)
      min = Math.min(counts[e], min)
    })

    return max - min
  }
}

async function solve() {
  const input = await readFile('/2021/day14/input.txt')

  Solution.parseInput(input)
  console.info(Solution.result())
}

solve()
