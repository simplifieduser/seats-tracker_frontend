
<script lang="ts">
  import { roomViewSelectedRoom, API_BASE, roomViewSelectedSeat } from "../../global";
  import type { GetAllSeats, GetRoom } from "../../types";
    import RoomViewEdit from "./RoomViewEdit.svelte";
  import RoomViewMatrix from "./RoomViewMatrix.svelte";

  let room: Promise<GetRoom> = new Promise(async (res, rej) => {
    let reqUrl = API_BASE + "rooms/" + $roomViewSelectedRoom?.id
    let fetchRes = await fetch(reqUrl)
    res(await fetchRes.json() as GetRoom)
  })

  let seats: Promise<GetAllSeats> = new Promise(async (res, rej) => {
    let reqUrl = API_BASE + "rooms/" + $roomViewSelectedRoom?.id + "/seats"
    let fetchRes = await fetch(reqUrl)
    res(await fetchRes.json() as GetAllSeats)
  })

  function back() {
    $roomViewSelectedSeat = null
    $roomViewSelectedRoom = null
  }

</script>

{#await room}

  <main class="max-w-[1200px] w-[95%] bg-slate-700 m-auto mt-6 mb-6 p-6 rounded-2xl flex flex-col gap-6">
    <div class="bg-slate-600 w-full rounded-xl p-3 flex justify-between sm:items-center gap-3 flex-col sm:flex-row">
      <div>
        <h2 class="font-bold text-3xl text-slate-100">{$roomViewSelectedRoom?.building + " " + $roomViewSelectedRoom?.room_code}</h2>
        <h3 class="text-xl text-slate-100">{$roomViewSelectedRoom?.name || "Unknown"}</h3>
      </div>
      <button on:click={back} class="p-3 text-center bg-slate-100 text-slate-600 font-bold rounded-lg">Back</button>
    </div>
    <div class="bg-slate-800 w-full rounded-xl">
      <p class="text-xl text-slate-100 p-6">Loading...</p>
    </div>
  </main>

{:then room} 

  <main class="max-w-[1200px] w-[95%] bg-slate-700 m-auto mt-6 mb-6 p-6 rounded-2xl flex flex-col gap-6">
    <div class="bg-slate-600 w-full rounded-xl p-3 flex justify-between sm:items-center gap-3 flex-col sm:flex-row">
      <div>
        <h2 class="font-bold text-3xl text-slate-100">{room.building + " " + room.room_code}</h2>
        <h3 class="text-xl text-slate-100">{room.name || ""}</h3>
      </div>
      <button on:click={back} class="p-3 text-center bg-slate-100 text-slate-600 font-bold rounded-lg">Back</button>
    </div>
    <div class="bg-slate-800 w-full rounded-xl">

      {#await seats}

        <p class="text-xl text-slate-100 p-6">Loading...</p>

      {:then seats} 

        <RoomViewMatrix {room} {seats}></RoomViewMatrix>

        <RoomViewEdit></RoomViewEdit>

      {/await}

    </div>
  </main>

{/await}