<script lang="ts">
  import { router } from 'svelte-micro'
</script>

<main>
  <h1>Monopolium</h1>
  {router.replace('/game')}
</main>
