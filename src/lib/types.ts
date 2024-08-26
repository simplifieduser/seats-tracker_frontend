
export type GetRooms = Room[]
export type GetRoom = Room
export type GetAllSeats = Seat[]
export type PostSessions = Session

export type SeatStatus = "OK" | "SEAT_BROKEN" | "TABLE_BROKEN" | "BROKEN" | "UNKNOWN"

export type Seat = {
  id: number,
  room_id: number,
  row: number,
  column: number,
  floor: number,
  status: SeatStatus,
  note?: string,
}

export type Room =  {
  id: number,
  room_code: string,
  building: string,
  floors: number,
  rows: number,
  columns: number,
  short_code: string,
  name?: string,
  address?: string,
}

export type User = {
  id: number,
  username: string,
  password: string,
  privilege?: "admin",
}

export type Session = {
  id: number,
  username: string,
  password: string,
  privilege?: "admin",
  token: string,
  expiresAt: Date,
}