import React, { Component } from 'react'
import Color from 'color'
import Graph from 'react-graph-vis'
const colors = [
  'rgb(243, 166, 131)',
  'rgb(247, 215, 148)',
  'rgb(119, 139, 235)',
  'rgb(231, 127, 103)',
  'rgb(207, 106, 135)',
  'rgb(241, 144, 102)',
  'rgb(245, 205, 121)',
  'rgb(84, 109, 229)',
  'rgb(225, 95, 65)',
  'rgb(196, 69, 105)',
  'rgb(120, 111, 166)',
  'rgb(248, 165, 194)',
  'rgb(99, 205, 218)',
  'rgb(234, 134, 133)',
  'rgb(89, 98, 117)',
  'rgb(87, 75, 144)',
  'rgb(247, 143, 179)',
  'rgb(61, 193, 211)',
  'rgb(230, 103, 103)',
  'rgb(48, 57, 82)',
  'rgb(252, 92, 101)',
  'rgb(253, 150, 68)',
  'rgb(254, 211, 48)',
  'rgb(38, 222, 129)',
  'rgb(43, 203, 186)',
  'rgb(235, 59, 90)',
  'rgb(250, 130, 49)',
  'rgb(247, 183, 49)',
  'rgb(32, 191, 107)',
  'rgb(15, 185, 177)',
  'rgb(69, 170, 242)',
  'rgb(75, 123, 236)',
  'rgb(165, 94, 234)',
  'rgb(209, 216, 224)',
  'rgb(119, 140, 163)',
  'rgb(45, 152, 218)',
  'rgb(56, 103, 214)',
  'rgb(136, 84, 208)',
  'rgb(165, 177, 194)',
  'rgb(75, 101, 132)'
]

const edges = [
  {
    from: '0',
    to: '00'
  },
  {
    from: '1',
    to: '0',
    label: 'projects'
  },
  {
    from: '6',
    to: '0',
    label: 'projects'
  },
  {
    from: '1',
    to: '2',
    label: 'PM'
  },
  {
    from: '1',
    to: '3',
    label: 'Solidity'
  },
  {
    from: '1',
    to: '4',
    label: 'Frontend'
  },
  {
    from: '1',
    to: '5',
    label: 'Frontend'
  },
  {
    from: '6',
    to: '7',
    label: 'Solidity'
  },
  {
    from: '6',
    to: '2',
    label: 'PM'
  }
]

const nodes = [
  {
    id: '00',
    label: 'Web3'
  },
  {
    id: '0',
    label: 'dDAO'
  },
  {
    id: '1',
    label: 'Join3'
  },
  {
    id: '2',
    label: 'Ada'
  },
  {
    id: '3',
    label: 'Demian.'
  },
  {
    id: '4',
    label: 'Muggle.'
  },
  {
    id: '5',
    label: '阿宇丶'
  },
  {
    id: '6',
    label: 'NFT Pass'
  },
  {
    id: '7',
    label: 'Jiang'
  }
].map((c, i) => ({
  ...c,
  color: {
    border: Color(colors[i]).darken(0.2).hex(),
    background: colors[i],
    highlight: {
      border: Color(colors[i]).darken(0.3).hex(),
      background: Color(colors[i]).darken(0.2).hex()
    },
    hover: {
      border: Color(colors[i]).darken(0.3).hex(),
      background: Color(colors[i]).darken(0.2).hex()
    }
  }
}))

function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

class ForceGraph extends Component {
  constructor() {
    super()
    this.state = {
      options: {
        layout: {
          randomSeed: 23,
          hierarchical: {
            enabled: true,
            levelSeparation: 40,
            nodeSpacing: 300,
            treeSpacing: 100,
            blockShifting: true,
            edgeMinimization: true,
            direction: 'LR',
            sortMethod: 'hubsize'
          }
        },
        edges: {
          smooth: {
            enabled: true,
            type: 'dynamic',
            roundness: 1
          },
          arrows: {
            from: {
              enabled: true,
              scaleFactor: 0.7
            },
            to: {
              enabled: false
            }
          }
        },
        nodes: {
          shape: 'box',
          font: {
            face: 'Circular, Futura',
            color: '#fff',
            size: 15
          },
          color: {
            border: 'red'
          },
          margin: {
            top: 7,
            bottom: 7,
            left: 10,
            right: 10
          },
          mass: 1
        },
        physics: {
          hierarchicalRepulsion: {
            centralGravity: 1,
            springLength: 200,
            springConstant: 0.1,
            nodeDistance: 150,
            damping: 1
          },
          maxVelocity: 500,
          minVelocity: 3,
          solver: 'barnesHut',
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
          },
          timestep: 0.5
        },
        interaction: {
          hover: true,
          hoverConnectedEdges: true,
          multiselect: true,
          dragView: false,
          zoomView: false
        }
      },
      graph: {
        nodes,
        edges: edges.map(e => ({
          ...e,
          width: 1.6, //0.6,
          color: { opacity: 0.8 }
        })),
        selected: []
      }
    }
    console.log('graph init', this.state.graph)
  }

  componentDidMount() {
    document.addEventListener('mousedown', e => {})
    document.addEventListener('mousemove', e => {})
  }

  network = {}

  refreshSelection = selected => {
    this.setState(
      {
        graph: {
          ...this.state.graph,
          nodes: nodes.map(n => {
            const selectedNodes = this.state.graph.edges
              .filter(edge =>
                selected.some(n => edge.from === n || edge.to === n)
              )
              .flatMap(edge => [edge.to, edge.from])

            const isSelected =
              selected.length === 0 || selectedNodes.some(s => s === n.id)

            return {
              ...n,
              font: {
                ...n.font,
                color: isSelected ? 'white' : 'rgba(255,255,255, 0.9)'
              },
              color: {
                ...n.color,
                opacity: 0.3,
                border: isSelected ? n.color.border : 'rgba(0,0,0,0.2)',
                background: isSelected
                  ? n.color.background
                  : 'rgba(30,30,30,0.15)'
              }
            }
          }),
          edges: edges.map(e => {
            const isSelected =
              selected.length === 0 ||
              selected.some(n => e.from === n || e.to === n)
            return {
              ...e,
              width: selected.length > 0 && isSelected ? 2.5 : 0.6,
              color: {
                opacity: isSelected ? 1 : 0.3
              },
              arrows: {
                ...e.arrows
              }
            }
          })
        }
      },
      () => {
        this.network.fit()
      }
    )
  }

  events = {
    dragStart: event => {},
    dragEnd: event => {
      console.log('dragged')
    },
    selectNode: event => {
      this.refreshSelection(event.nodes)
    },
    deselectNode: event => {
      this.refreshSelection(event.nodes)
    }
  }

  render() {
    return (
      <div id="graph" style={{ width: '100%', height: '600px' }}>
        <Graph
          graph={this.state.graph}
          options={this.state.options}
          events={this.events}
          getNetwork={network => {
            this.network = network
            setTimeout(() => network.fit(), 2000)
          }}
        />
      </div>
    )
  }
}

export default ForceGraph
