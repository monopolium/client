<script lang="ts">
  import './styles/main.css'
  import { Route, router } from 'svelte-micro'
  import Home from './routes/Home.svelte'
  import Game from './routes/Game.svelte'
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
