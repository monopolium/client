<script lang="ts">
  import { Route, router } from 'svelte-micro'
  import Home from './routes/Home.svelte'
</script>

<Route>
  <Route path="/">
    <Home />
  </Route>

  <Route fallback>
    {router.replace('/')}
  </Route>
</Route>
