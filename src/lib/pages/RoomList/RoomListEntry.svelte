<script lang="ts">
  import { roomViewSelectedRoom } from "../../global";
  import type { Room } from "../../types";
  export let room: Room;

  function click() {
    $roomViewSelectedRoom = room
  }


</script>

<div class="bg-slate-600 min-w-[300px] rounded-xl p-3 flex flex-col">
  <h2 class="font-bold text-slate-100 text-2xl">{room.building + " " + room.room_code}</h2>
  <h3 class="text-slate-100 text-lg">{room.name}</h3>
  <div class="flex-1 m-3"></div>
  <button on:click={click} class="p-3 text-center bg-slate-100 text-slate-600 font-bold rounded-lg">Open</button>
</div>

