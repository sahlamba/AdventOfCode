import { readFile } from '../../utils/index.js'

class Solution {
  static positions = []
  static minTarget = Number.MAX_SAFE_INTEGER
  static maxTarget = Number.MIN_SAFE_INTEGER

  static parseInput(input) {
    input
      .split(',')
      .map((i) => Number.parseInt(i))
      .forEach((num) => {
        this.positions.push(num)
        this.minTarget = Math.min(this.minTarget, num)
        this.maxTarget = Math.max(this.maxTarget, num)
      })
  }

  static compute() {
    let targetPos = -1
    let minFuel = Number.MAX_SAFE_INTEGER
    for (let target = this.minTarget; target <= this.maxTarget; target++) {
      let fuel = 0
      for (let pos of this.positions) {
        const moves = Math.abs(target - pos)
        fuel += (moves * (moves + 1)) / 2
      }
      if (fuel < minFuel) {
        minFuel = fuel
        targetPos = target
      }
    }
    return { targetPos, minFuel }
  }

  static result() {
    return this.compute()
  }
}

async function solve() {
  const input = await readFile('/2021/day7/input.txt')

  Solution.parseInput(input)

  console.info(Solution.result())
}

solve()
