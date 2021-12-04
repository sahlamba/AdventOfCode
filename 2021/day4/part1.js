/**
 * Bingo Subsystem
 * ---
 *
 * Features
 * ---
 * - 5x5 grid of numbers
 * - every cell can be MARKED/UNMARKED, initial state is UNMARKED
 * - player wins if any row or column contains all MARKED cells
 *
 * Interface/operations
 * ---
 * - mark a cell
 *  -> cell value (number) as input
 *  -> Map of numbers as keys with [row, col] indices as value
 *
 * - check if board win condition is true/false
 *  -> does any row or col exist with all numbers MARKED?
 *  -> 2 arrays of numbers that represent row/column bitmaps (11111/00000)
 *  -> If all bits set to 1, then decimal value === 31
 *
 * - calculate score
 *  -> sum of all UNMARKED numbers
 *  -> maintain a hash set of UNMARKED numbers
 */

import { readFile } from '../../utils/index.js'

class BingoBoard {
  numbers = {}
  unmarkedSum = 0
  rows = [0, 0, 0, 0, 0]
  cols = [0, 0, 0, 0, 0]

  constructor(rows) {
    rows.forEach((row, i) => {
      row
        .split(' ')
        .map((val) => val.trim())
        .filter((val) => val && val.length > 0)
        .map((val) => Number.parseInt(val))
        .forEach((num, j) => {
          // Assuming every bingo board contains a number only once (unique)
          this.numbers[num] = [i, j]
          this.unmarkedSum += num
        })
    })
    // console.info(this.numbers, this.unmarkedNumbers)
  }

  mark(num) {
    if (!this.numbers[num]) {
      return
    }
    this.unmarkedSum -= num
    const [row, col] = this.numbers[num]
    // update bits
    this.rows[row] = this.setBit(this.rows[row], col)
    this.cols[col] = this.setBit(this.cols[col], row)
  }

  setBit(integer, pos) {
    const mask = 1 << pos
    integer |= mask
    return integer
  }

  hasWon() {
    const rowWin = this.rows.indexOf(31)
    const colWin = this.cols.indexOf(31)
    return rowWin > -1 || colWin > -1
  }

  score(latestNum) {
    return this.unmarkedSum * latestNum
  }
}

class Solution {
  static drawnNumbers = []
  static boards = []

  static parseInput(input) {
    const lines = input
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && l.length > 0)

    for (let i = 1; i < lines.length; i += 5) {
      let j = i
      let rows = []
      while (j < i + 5) {
        rows.push(lines[j])
        j++
      }
      this.boards.push(new BingoBoard(rows))
    }

    this.drawnNumbers = lines[0].split(',').map((val) => Number.parseInt(val))
  }

  static solve() {
    for (let num of this.drawnNumbers) {
      for (let board of this.boards) {
        board.mark(num)
        if (board.hasWon()) {
          return board.score(num)
        }
      }
    }
    return 0
  }
}

async function solve() {
  const input = await readFile('/2021/day4/input.txt')
  Solution.parseInput(input)

  console.info(Solution.solve())
}

solve()
