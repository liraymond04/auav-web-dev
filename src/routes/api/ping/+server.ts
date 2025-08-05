import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  return json({ msg: "pong" }, { status: 200 })
}
