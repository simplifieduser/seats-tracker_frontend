<script lang="ts">
  import RoomEntry from './RoomListEntry.svelte';
  import { API_BASE } from '../../../lib/global';
  import type { GetRooms } from '../../../lib/types'

  let rooms: Promise<GetRooms> = new Promise(async (res, _) => {

    let reqUrl = API_BASE + "rooms/"
    let fetchRes = await fetch(reqUrl)
    res(await fetchRes.json() as GetRooms)

  })

</script>

<main class="max-w-[1200px] w-[95%] bg-slate-700 m-auto mt-6 mb-6 p-6 rounded-2xl flex flex-sp gap-6 flex-wrap">

  {#await rooms}

    <p class="text-xl text-slate-100">Loading...</p>
  {:then rooms} 

    {#each rooms as room}
      <RoomEntry {room}></RoomEntry>
    {/each}
    
  {/await}
</main>