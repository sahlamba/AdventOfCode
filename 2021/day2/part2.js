import { processLineByLine } from '../../utils/index.js'

class Solution {
  static x = 0
  static depth = 0
  static aim = 0

  static parseInput(input) {
    const [dir, mag] = input.split(' ')
    return [dir, Number.parseInt(mag)]
  }

  static move([dir, mag]) {
    switch (dir) {
      case 'forward':
        this.x += mag
        this.depth += this.aim * mag
        break
      case 'down': {
        this.aim += mag
        break
      }
      case 'up': {
        this.aim -= mag
        break
      }
    }
  }

  static result() {
    return this.x * this.depth
  }
}

async function solve() {
  await processLineByLine(
    '/2021/day2/input.txt',
    (line) => {
      Solution.move(Solution.parseInput(line))
    },
    () => {
      console.info(Solution.result())
    }
  )
}

solve()
