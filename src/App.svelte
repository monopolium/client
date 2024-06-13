<script lang="ts">
  import './styles/main.css'
  import { Route, router } from 'svelte-micro'
  import Home from './routes/Home.svelte'
  import Game from './routes/Game.svelte'
  import { getToken } from './lib/token'
  import { createSocketStore, reopenable } from './lib/socket'

  const socket = reopenable(createSocketStore())

  getToken('http://localhost:7654/token').then((token) => {
    socket.open('ws://localhost:7654/ws/' + token)
  })

  socket.state.subscribe((state) => console.log('Socket state: ' + state))
  socket.message.subscribe((data) => console.log(data))

  // debug
  const _applySocketToWindow = (socket: any) => {
    ;(window as Window & { socket?: any }).socket = socket
  }

  _applySocketToWindow(socket)
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
