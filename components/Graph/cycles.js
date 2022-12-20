let color = []
let parent = []
let cycleStart, cycleEnd

const toNode = (n, adjacency) => Object.keys(adjacency)[n]
const toIndex = (n, adjacency) =>
  Object.keys(adjacency).findIndex(ad => ad === n)

function dfs(v, adjacency) {
  color[v] = 1

  // console.log('dfs', v, toNode(v), adjacency[toNode(v)])
  adjacency[toNode(v, adjacency)].forEach(u => {
    if (color[toIndex(u, adjacency)] === 0) {
      parent[toIndex(u, adjacency)] = v
      if (dfs(toIndex(u, adjacency), adjacency)) return true
    } else if (color[toIndex(u, adjacency)] === 1) {
      cycleStart = toIndex(u, adjacency)
      cycleEnd = v
      return true
    }
  })
  color[v] = 2
  return false
}

function removeCycle(adjacency, list) {
  console.log('before remove', adjacency, list)

  for (let i = 0; i < list.length - 1; i++) {
    const from = toNode(list[i], adjacency)
    const to = toNode(list[i + 1], adjacency)

    console.log('remove is', from, to)
    adjacency[from] = adjacency[from].filter(n => n === to)
  }

  console.log('after remove', adjacency, list)
}

let counter = 0
export function findCycle(adjacency) {
  const n = Object.keys(adjacency).length

  if (counter++ > 50) return
  color = [...new Array(n).keys()].map(k => 0)
  parent = [...new Array(n).keys()].map(k => -1)
  cycleStart = -1
  const nodes = Object.keys(adjacency)

  for (let v = 0; v < n; v++) {
    if (color[v] === 0 && dfs(v, adjacency)) break
  }

  if (cycleStart === -1) return
  let cycle = []

  console.log('cycle start isz', cycleStart)
  cycle.push(cycleStart)
  for (let v = cycleEnd; v !== cycleStart; v = parent[v]) {
    cycle.push(v)
  }
  cycle.push(cycleStart)
  cycle.reverse()

  removeCycle(adjacency, cycle)
  findCycle(adjacency)
  // console.log('cycles', cycle.map(c => toNode(c, adjacency)))
}
