import { writable } from 'svelte/store'

interface BaseTile {
  id: number
  type: 'start' | 'jail' | 'jackpot' | 'arrest' | 'chance' | 'bank'
}

interface CompanyTile {
  id: number
  type: 'company'
  group: 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow'
  name: string
  price: number
  upgradePrice: number
  baseIncome: number
  collectionIncome: number
  levelIncome: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

interface AutomotiveTile {
  id: number
  type: 'automotive'
  group: 'darkred'
  name: string
  price: number
  quantityIncome: {
    1: number
    2: number
    3: number
    4: number
  }
}

interface ServiceTile {
  id: number
  type: 'service'
  name: string
  group: 'darkpurple'
  price: number
  stepIncome: number
  quantityMultiplier: {
    1: number
    2: number
  }
}

export type Tile = BaseTile | CompanyTile | AutomotiveTile | ServiceTile

export const defaultTiles: Tile[] = [
  {
    id: 0,
    type: 'start',
  },
  {
    id: 1,
    type: 'company',
    name: 'todo',
    group: 'green',
    price: 1000,
  },
  {
    id: 2,
    type: 'chance',
  },
  {
    id: 3,
    type: 'company',
    name: 'todo',
    group: 'green',
    price: 1000,
  },
  {
    id: 4,
    type: 'bank',
  },
  {
    id: 5,
    type: 'automotive',
    name: 'todo',
    group: 'darkred',
    price: 1000,
  },
  {
    id: 6,
    type: 'company',
    name: 'todo',
    group: 'cyan',
    price: 1000,
  },
  {
    id: 7,
    type: 'chance',
  },
  {
    id: 8,
    type: 'company',
    name: 'todo',
    group: 'cyan',
    price: 1000,
  },
  {
    id: 9,
    type: 'company',
    name: 'todo',
    group: 'cyan',
    price: 1000,
  },
  {
    id: 10,
    type: 'jail',
  },
  {
    id: 11,
    type: 'company',
    name: 'todo',
    group: 'blue',
    price: 1000,
  },
  {
    id: 12,
    type: 'service',
    name: 'todo',
    group: 'darkpurple',
    price: 1000,
  },
  {
    id: 13,
    type: 'company',
    name: 'todo',
    group: 'blue',
    price: 1000,
  },
  {
    id: 14,
    type: 'company',
    name: 'todo',
    group: 'blue',
    price: 1000,
  },
  {
    id: 15,
    type: 'automotive',
    name: 'todo',
    group: 'darkred',
    price: 1000,
  },
  {
    id: 16,
    type: 'company',
    name: 'todo',
    group: 'purple',
    price: 1000,
  },
  {
    id: 17,
    type: 'chance',
  },
  {
    id: 18,
    type: 'company',
    name: 'todo',
    group: 'purple',
    price: 1000,
  },
  {
    id: 19,
    type: 'company',
    name: 'todo',
    group: 'purple',
    price: 1000,
  },
  {
    id: 20,
    type: 'jackpot',
  },
  {
    id: 21,
    type: 'company',
    name: 'todo',
    group: 'pink',
    price: 1000,
  },
  {
    id: 22,
    type: 'chance',
  },
  {
    id: 23,
    type: 'company',
    name: 'todo',
    group: 'pink',
    price: 1000,
  },
  {
    id: 24,
    type: 'company',
    name: 'todo',
    group: 'pink',
    price: 1000,
  },
  {
    id: 25,
    type: 'automotive',
    name: 'todo',
    group: 'darkred',
    price: 1000,
  },
  {
    id: 26,
    type: 'company',
    name: 'todo',
    group: 'red',
    price: 1000,
  },
  {
    id: 27,
    type: 'service',
    name: 'todo',
    group: 'darkpurple',
    price: 1000,
  },
  {
    id: 28,
    type: 'company',
    name: 'todo',
    group: 'red',
    price: 1000,
  },
  {
    id: 29,
    type: 'company',
    name: 'todo',
    group: 'red',
    price: 1000,
  },
  {
    id: 30,
    type: 'jail',
  },
  {
    id: 31,
    type: 'company',
    name: 'todo',
    group: 'orange',
    price: 1000,
  },
  {
    id: 32,
    type: 'company',
    name: 'todo',
    group: 'orange',
    price: 1000,
  },
  {
    id: 33,
    type: 'chance',
  },
  {
    id: 34,
    type: 'company',
    name: 'todo',
    group: 'orange',
    price: 1000,
  },
  {
    id: 35,
    type: 'automotive',
    name: 'todo',
    group: 'darkred',
    price: 1000,
  },
  {
    id: 36,
    type: 'bank',
  },
  {
    id: 37,
    type: 'company',
    name: 'todo',
    group: 'orange',
    price: 1000,
  },
  {
    id: 38,
    type: 'chance',
  },
  {
    id: 39,
    type: 'company',
    name: 'todo',
    group: 'orange',
    price: 1000,
  },
]

const createBoard = (tiles: Tile[]) => {
  const { subscribe, set } = writable(tiles)

  return {
    subscribe,
  }
}

const board = createBoard(defaultTiles)
