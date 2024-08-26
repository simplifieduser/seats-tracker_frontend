
<script lang="ts">
  import RoomList from "./lib/pages/RoomList/RoomList.svelte";
  import RoomView from "./lib/pages/RoomView/RoomView.svelte";
  import { roomViewSelectedRoom, loginSession, showLoginPrompt } from "./lib/global";
  import Login from "./lib/pages/Login/Login.svelte";

  function loginClick() {

    if ($loginSession) {

      //TODO: Invalidate token
      $loginSession = null


    } else {

      $showLoginPrompt = true

    }

  }

</script>

<header class="max-w-[1200px] w-[95%] bg-slate-600 m-auto mt-6 mb-6 p-6 rounded-2xl">
  <div class="flex justify-between sm:items-center gap-3 flex-col sm:flex-row">
    <h1 class="font-bold text-4xl text-slate-100">Seat-Tracker</h1>
    <div class="flex flex-col sm:flex-row gap-3">
      {#if $loginSession}
        <div class="flex sm:flex-col gap-3 sm:gap-0">
          <p class="text-slate-100">Logged in as:</p>
          <p class="text-slate-100 font-bold">{$loginSession.username}</p>
        </div>
      {/if}
      <button on:click={loginClick} class="p-3 bg-slate-100 text-slate-600 font-bold rounded-lg">{$loginSession ? "Logout" : "Login"}</button>
    </div>
  </div>
</header>

{#if $showLoginPrompt}
  <Login></Login>
{/if}

{#if $roomViewSelectedRoom}
  <RoomView></RoomView>
{:else}
  <RoomList></RoomList>
{/if}