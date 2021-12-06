import { readFile } from '../../utils/index.js'

class Solution {
  static state = [0, 0, 0, 0, 0, 0, 0, 0, 0] // 0 - 8

  static parseInput(input) {
    input
      .trim()
      .split(',')
      .filter((num) => num !== null)
      .forEach((num) => {
        this.state[Number.parseInt(num)] += 1
      })
  }

  static simulateLanternfishLifecycle() {
    const DAYS = 256

    for (let day = 0; day < DAYS; day++) {
      const newFishCount = this.state[0]
      for (let i = 1; i < 9; i++) {
        this.state[i - 1] = this.state[i]
      }
      this.state[6] += newFishCount
      this.state[8] = newFishCount
    }
  }

  static result() {
    Solution.simulateLanternfishLifecycle()
    return this.state.reduce((sum, curr) => sum + curr, 0)
  }
}

async function solve() {
  const file = await readFile('/2021/day6/input.txt')

  Solution.parseInput(file)

  console.info(Solution.result())
}

solve()
