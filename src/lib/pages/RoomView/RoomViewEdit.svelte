<script lang="ts">
  import { API_BASE, loginSession, roomViewSelectedSeat } from "../../global";
  import type { SeatStatus } from "../../types";

  $: inpStatus = $roomViewSelectedSeat?.status
  $: inpNote = $roomViewSelectedSeat?.note

  function statusChanged() {

    if (!$roomViewSelectedSeat) return
    let temp = $roomViewSelectedSeat
    temp.status = inpStatus as SeatStatus
    $roomViewSelectedSeat = temp

    postSeat()

  }

  function noteChanged() {

    if (!$roomViewSelectedSeat) return
    let temp = $roomViewSelectedSeat
    temp.note = inpNote
    $roomViewSelectedSeat = temp

    postSeat()

  }

  async function postSeat() {

    if (!$roomViewSelectedSeat || !$loginSession) return false

    const reqUrl = API_BASE + "sessions/"

    const reqHeader = new Headers()
    reqHeader.append("content-type", "application/json")

    const reqBody = {
      state: inpStatus,
      note: inpNote
    }

    const fetchRes = await fetch(reqUrl,{
      method: "POST",
      headers: reqHeader,
      body: JSON.stringify(reqBody),
      mode: "cors"
    })

  }

</script>

<div class="bottom-0 left-0 fixed w-full">
  <div class="sm:p-3 w-full h-full">
    <div class="sm:rounded-xl shadow-xl border-2 border-slate-100 bg-slate-700 w-full h-full p-3 flex flex-col gap-3 sm:flex-row">
      {#if $roomViewSelectedSeat}

        <div class="flex flex-1 gap-6">
          <div>
            <p class="text-md text-slate-100">Selected Seat:</p>
            <p class="font-bold text-lg text-slate-100">{($roomViewSelectedSeat.row + 1) + ":" + ($roomViewSelectedSeat.column + 1)}</p>
          </div>
          <div>
            <p class="text-md text-slate-100">Status:</p>
            <p class="font-bold text-lg text-slate-100">{$roomViewSelectedSeat.status === "UNKNOWN" ? "OK" : $roomViewSelectedSeat.status}</p>
          </div>
          <div>
            <p class="text-md text-slate-100">Note:</p>
            <p class="font-bold text-lg text-slate-100">{$roomViewSelectedSeat.note || "None"}</p>
          </div>
        </div>
        {#if $loginSession?.privilege === "admin"}

          <form class="p-3 bg-slate-600 rounded-lg flex flex-col gap-3">
            <p class="font-bold text-lg text-slate-100">Edit Seat</p>
            <select bind:value={inpStatus} on:change={statusChanged} class="p-1 bg-slate-100 text-slate-600 font-bold rounded-lg" name="status" id="status">
              <option value="OK">OK</option>
              <option value="SEAT_BROKEN">BROKEN</option>
            </select>
            <textarea bind:value={inpNote} on:change={noteChanged} placeholder="Note" class="p-1 bg-slate-100 text-slate-600 font-bold rounded-lg" />
          </form>

        {/if}

      {:else}

        <p class="font-bold text-xl text-slate-100 flex-1 text-center">No seat selected</p>

      {/if}
    </div>
  </div>
</div>