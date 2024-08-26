<script lang="ts">
    import { onMount } from "svelte";
  import type { Room, Seat } from "../../types";
    import RoomViewMatrixEntry from "./RoomViewMatrixEntry.svelte";

  export let room: Room
  export let seats: Seat[]

  let matrix: Seat[][] = []

  onMount(() => {
    for (let row = 0; row < room.rows; row++) {

      const newRow: Seat[] = []

      for (let col = 0; col < room.columns; col++) {

        let stateStored = false

        // Check if state is stored
        for (const seat of seats) {
          if (seat.row === row && seat.column === col) {
            // Apply stored state
            newRow.push(seat)
            stateStored = true
            break
          }
        }

        // No state stored - apply default
        if (!stateStored) {
          newRow.push({
            id: -1,
            room_id: room.id,
            floor: 0,
            row: row,
            column: col,
            status: "UNKNOWN"
          })
        }


      }

      matrix.push(newRow)

    }
    
    matrix = matrix

  })

</script>
<div class="w-full relative p-3">
  <div class="absolute">
    <div class="flex flex-col gap-3">

      {#each matrix as _, rowIdx}

      <div class="w-8 h-8 flex justify-center items-center bg-slate-800">
        <p class="text-slate-100">{rowIdx}</p>
      </div>

      {/each}

    </div>
  </div>
  <div class="w-full overflow-scroll">
    <div class="flex flex-col gap-3 w-fit">
      {#each matrix as row}
    
        <div class="flex gap-3">
    
          <div class="w-6 h-8"></div>
    
          {#each row as seat}
    
            <RoomViewMatrixEntry {seat}></RoomViewMatrixEntry>
            
          {/each}
    
        </div>
    
      {/each}
    </div>
  </div>
</div>
