<script lang="ts">
  import { API_BASE, loginSession, showLoginPrompt } from "../../global";
  import type { PostSessions } from "../../types";

  let formElem: HTMLFormElement
  let submitElem: HTMLInputElement

  let errorMsg = ""

  function close(event: any) {

    if (event.target === event.currentTarget) {
      errorMsg = ""
      $showLoginPrompt = false
    }

  }

  async function submit() {

    //TODO: Error message
    errorMsg = ""
    submitElem.disabled = true

    const formData = new FormData(formElem)
    const inpUser = formData.get("user")
    const inpPass = formData.get("password")

    if (!inpUser || !inpPass) return

    const reqUrl = API_BASE + "sessions/"

    const reqHeader = new Headers()
    reqHeader.append("content-type", "application/json")

    const reqBody = {
      username: inpUser,
      password: inpPass
    }

    const fetchRes = await fetch(reqUrl,{
      method: "POST",
      headers: reqHeader,
      body: JSON.stringify(reqBody),
      mode: "cors"
    })

    const sessionRes = await fetchRes.json() as PostSessions

    //TODO: Correct user role handling
    if ((sessionRes.privilege || "") !== "admin") return

    $loginSession = sessionRes

    errorMsg = ""
    submitElem.disabled = false
    $showLoginPrompt = false

  }


</script>


<button on:click={close} class="w-screen h-screen fixed top-0 bg-[#00000088] z-50 flex justify-center items-center cursor-default">
  <div class="bg-slate-700 p-6 rounded-2xl flex flex-col gap-6 justify-center">
    <form bind:this={formElem} class="flex flex-col sm:items-start gap-3">
      <input class="p-3 rounded-lg bg-slate-500 text-slate-100" type="text" name="user" id="user">
      <input class="p-3 rounded-lg bg-slate-500 text-slate-100" type="password" name="password" id="password">
      <input bind:this={submitElem} on:click|preventDefault={submit} class="p-3 bg-slate-100 rounded-lg text-slate-700 font-bold" type="submit" value="Login">
    </form>
  </div>
</button>