<script lang="ts">
  import type { Tile } from './tile'

  export let tile: Tile
</script>

<div class="tile {tile.type}" style={`grid-area: t${tile.id};`} id="tile-{tile.id}">{tile.id}</div>

<style>
  .tile {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
  }
</style>
