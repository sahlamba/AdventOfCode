import fs from 'fs'
import readline from 'readline'

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
  const FILE = '/2021/day2/input.txt'

  const fileStream = fs.createReadStream(process.cwd() + FILE)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    Solution.move(Solution.parseInput(line))
  }

  console.info(Solution.result())
}

solve()
