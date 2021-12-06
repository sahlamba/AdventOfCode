import { readFile } from '../../utils/index.js'

class Solution {
  static state = []

  static parseInput(input) {
    this.state = input
      .trim()
      .split(',')
      .filter((num) => num !== null)
      .map((num) => Number.parseInt(num))
  }

  static simulateLanternfishLifecycle() {
    const DAYS = 80

    for (let day = 0; day < DAYS; day++) {
      const n = this.state.length
      for (let k = 0; k < n; k++) {
        this.state[k] -= 1
        if (this.state[k] === -1) {
          this.state[k] = 6
          this.state.push(8)
        }
      }
    }
  }

  static result() {
    Solution.simulateLanternfishLifecycle()
    return this.state.length
  }
}

async function solve() {
  const file = await readFile('/2021/day6/input.txt')

  Solution.parseInput(file)

  console.info(Solution.result())
}

solve()
