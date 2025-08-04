import { db } from "$lib/server/db";
import { todoTable } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const todos = await db.select().from(todoTable);
  return json({ todos }, { status: 200 })
}
