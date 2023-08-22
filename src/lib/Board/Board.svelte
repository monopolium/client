<script lang="ts">
  import { defaultTiles } from './tile'
  import Tile from './Tile.svelte'
</script>

<div class="board">
  <div class="grid">
    {#each defaultTiles as tile (tile.id)}
      <Tile {tile} />
    {/each}
  </div>
</div>

<style>
  .board {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .grid {
    display: grid;

    height: min(100vw, 100vh);
    aspect-ratio: 1/1;

    grid-template-columns: 2.5fr repeat(9, 1fr) 2.5fr;
    grid-template-rows: 2.5fr repeat(9, 1fr) 2.5fr;
    gap: 2px;
    grid-template-areas:
      't0  t1  t2  t3  t4  t5  t6  t7  t8  t9  t10'
      't39 c   c   c   c   c   c   c   c   c   t11'
      't38 c   c   c   c   c   c   c   c   c   t12'
      't37 c   c   c   c   c   c   c   c   c   t13'
      't36 c   c   c   c   c   c   c   c   c   t14'
      't35 c   c   c   c   c   c   c   c   c   t15'
      't34 c   c   c   c   c   c   c   c   c   t16'
      't33 c   c   c   c   c   c   c   c   c   t17'
      't32 c   c   c   c   c   c   c   c   c   t18'
      't31 c   c   c   c   c   c   c   c   c   t19'
      't30 t29 t28 t27 t26 t25 t24 t23 t22 t21 t20';
  }
</style>
