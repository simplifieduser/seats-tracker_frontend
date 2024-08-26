<script lang="ts">
  import { roomViewSelectedSeat } from "../../global";
  import type { Seat } from "../../types";

  export let seat: Seat

  $: selected = seat.row === $roomViewSelectedSeat?.row && seat.column === $roomViewSelectedSeat?.column

  function select() {
    $roomViewSelectedSeat = seat
  }

</script>

{#if seat.row % 2 == 0}

{#if seat.status === "SEAT_BROKEN" || seat.status === "TABLE_BROKEN"}
  {#if selected}
    <button on:click={select} class="w-8 h-8 rounded-lg border-2 border-slate-100 bg-red-700 flex justify-center items-center">
      <p class="text-slate-100">{seat.column}</p>
    </button>
  {:else}
    <button on:click={select} class="w-8 h-8 rounded-lg bg-red-700 flex justify-center items-center">
      <p class="text-slate-100">{seat.column}</p>
    </button>
  {/if}
{:else}
  {#if selected}
    <button on:click={select} class="w-8 h-8 rounded-lg border-2 border-slate-100 bg-slate-700 flex justify-center items-center">
      <p class="text-slate-100">{seat.column}</p>
    </button>
  {:else}
    <button on:click={select} class="w-8 h-8 rounded-lg bg-slate-700 flex justify-center items-center">
      <p class="text-slate-100">{seat.column}</p>
    </button>
  {/if}
{/if}



{:else}

{#if seat.status === "SEAT_BROKEN" || seat.status === "TABLE_BROKEN"}
{#if selected}
<button on:click={select} class="w-8 h-8 rounded-lg border-2 border-slate-100 bg-red-600 flex justify-center items-center">
  <p class="text-slate-100">{seat.column}</p>
</button>
{:else}
<button on:click={select} class="w-8 h-8 rounded-lg bg-red-600 flex justify-center items-center">
  <p class="text-slate-100">{seat.column}</p>
</button>
{/if}
{:else}
{#if selected}
<button on:click={select} class="w-8 h-8 rounded-lg border-2 border-slate-100 bg-slate-600 flex justify-center items-center">
  <p class="text-slate-100">{seat.column}</p>
</button>
{:else}
<button on:click={select} class="w-8 h-8 rounded-lg bg-slate-600 flex justify-center items-center">
  <p class="text-slate-100">{seat.column}</p>
</button>
{/if}
{/if}
{/if}