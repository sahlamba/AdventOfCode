const INPUT =
  '7222221271\n6463754232\n3373484684\n4674461265\n1187834788\n1175316351\n8211411846\n4657828333\n5286325337\n5771324832'

window.onload = function () {
  Viz.renderGrid(INPUT)
  OctopusGarden.init(INPUT)
}

function run() {
  OctopusGarden.simulate()
  document.getElementById('run-button').disabled = true
}

class Viz {
  static renderGrid(input) {
    let content = ''
    input.split('\n').map((row, i) => {
      content += `<div>${row
        .split('')
        .map(
          (_, j) =>
            `<i id="${i},${j}" \
            style="transform: rotate(${Utils.getRandomInt(-180, 180)}deg)" \
            class="octopus fab fa-octopus-deploy fa-3x"></i>`
        )
        .join('')}</div>`
    })
    document.getElementById('grid').innerHTML = content
  }

  static updateOctopus(x, y, energy) {
    const octopus = document.getElementById(`${x},${y}`)
    if (energy === 0) {
      octopus.style.color = `rgba(0, 256, 0, 1)`
    } else {
      octopus.style.color = `rgba(0, ${Math.floor(256 / (10 - energy))}, 0, 1)`
    }
  }

  static updateHUD(steps) {
    document.getElementById('steps').innerText = steps
  }
}

class OctopusGarden {
  static energyLevel = 0
  static isFlashing = 1
  static grid = []
  static steps = 0
  static flashes = 0

  static init(input) {
    input.split('\n').forEach((line) => {
      this.parseLine(line)
    })
  }

  static parseLine(line) {
    this.grid.push(
      line
        .trim()
        .split('')
        // Every cell in a grid is a tuple: [octopusEnergyLevel, isFlashing]
        .map((x) => [Number.parseInt(x.trim()), false])
    )
  }

  static updateGrid() {
    this.steps++
    let flashCount = 0
    // Update isFlashing and energize
    for (let [i, row] of this.grid.entries()) {
      for (let [j, octopus] of row.entries()) {
        octopus[this.energyLevel] += 1
        Viz.updateOctopus(
          i,
          j,
          octopus[this.energyLevel],
          octopus[this.isFlashing]
        )
        if (octopus[this.energyLevel] > 9 && !octopus[this.isFlashing]) {
          octopus[this.isFlashing] = true
          Viz.updateOctopus(
            i,
            j,
            octopus[this.energyLevel],
            octopus[this.isFlashing]
          )
          this.energize(i, j)
        }
      }
    }
    // Reset energy levels and stop flashing
    for (let [i, row] of this.grid.entries()) {
      for (let [j, octopus] of row.entries()) {
        if (octopus[this.isFlashing]) {
          flashCount++
          octopus[this.energyLevel] = 0
          octopus[this.isFlashing] = false
          Viz.updateOctopus(
            i,
            j,
            octopus[this.energyLevel],
            octopus[this.isFlashing]
          )
        }
      }
    }
    this.flashes = flashCount
  }

  static energize(i, j) {
    const directions = [
      [-1, -1], // top left
      [-1, 0], // top
      [-1, 1], // top right
      [0, -1], // left
      [0, 1], // right
      [1, -1], // bottom left
      [1, 0], // bottom
      [1, 1], // bottom right
    ]

    const queue = []
    queue.push([i, j])

    while (queue.length > 0) {
      const n = queue.length
      for (let k = 0; k < n; k++) {
        const [x, y] = queue.shift()
        for (let dir of directions) {
          const x1 = x + dir[0]
          const y1 = y + dir[1]
          if (this.withinGrid(x1, y1)) {
            const octopus = this.grid[x1][y1]
            if (!octopus[this.isFlashing]) {
              octopus[this.energyLevel] += 1
              Viz.updateOctopus(
                i,
                j,
                octopus[this.energyLevel],
                octopus[this.isFlashing]
              )
              if (octopus[this.energyLevel] > 9) {
                octopus[this.isFlashing] = true
                Viz.updateOctopus(
                  i,
                  j,
                  octopus[this.energyLevel],
                  octopus[this.isFlashing]
                )
                queue.push([x1, y1])
              }
            }
          }
        }
      }
    }
  }

  static withinGrid(i, j) {
    const n = this.grid.length
    const m = this.grid[0].length

    return i >= 0 && i < n && j >= 0 && j < m
  }

  static simulate() {
    const n = this.grid.length
    const m = this.grid[0].length

    const timer = setInterval(() => {
      if (this.flashes !== n * m) {
        this.updateGrid()
        Viz.updateHUD(this.steps)
      } else {
        clearInterval(timer)
      }
    }, 50)
  }
}

class Utils {
  static getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
