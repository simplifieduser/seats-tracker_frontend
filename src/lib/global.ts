import { writable, type Writable } from "svelte/store"
import type { Room, Seat, Session } from "./types"

export const API_BASE = "https://seats.chuangsheep.com/api/"

export const roomViewSelectedRoom: Writable<Room | null> = writable(null)
export const roomViewSelectedSeat: Writable<Seat | null> = writable(null) 

export const loginSession: Writable<Session | null> = writable(null)
export const showLoginPrompt: Writable<boolean> = writable(false)