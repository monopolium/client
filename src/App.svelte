<script lang="ts">
  import './styles/main.css'
  import { Route, router } from 'svelte-micro'
  import Home from './routes/Home.svelte'
  import Game from './routes/Game.svelte'
  import { getToken } from './lib/token'
  import { createReopenableSocketStore } from './lib/socket'

  const socket = createReopenableSocketStore()
  const { message, state } = socket

  getToken('http://localhost:7654/token').then((token) => socket.open('ws://localhost:7654/ws/' + token))

  message.subscribe((data) => console.log(data))
  state.subscribe((state) => console.log('WebSocket state: ' + state))
  // Debug
  ;(window as typeof globalThis & { socket?: any }).socket = socket
</script>

<Route>
  <Route path="/">
    <Home />
  </Route>

  <Route path="/game">
    <Game />
  </Route>

  <Route fallback>
    {router.replace('/')}
  </Route>
</Route>
