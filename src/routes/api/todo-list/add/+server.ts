import { db } from "$lib/server/db";
import { todoTable } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { title, comments } = await request.json()

  await db.insert(todoTable).values({ title, completed: false, comments })

  return json({ success: true }, { status: 201 })
}
