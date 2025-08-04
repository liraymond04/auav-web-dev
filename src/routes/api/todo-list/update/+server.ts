import { db } from "$lib/server/db";
import { todoTable } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request }) => {
  const { id, ...fields } = await request.json()

  if (!id || typeof id !== 'number') {
    return json({ success: false, error: 'Missing or invalid ID' }, { status: 400 });
  }

  const validFields = ['title', 'comments', 'completed'];
  const updateFields: Record<string, any> = {};

  for (const key of validFields) {
    if (key in fields) {
      updateFields[key] = fields[key];
    }
  }

  if (Object.keys(updateFields).length === 0) {
    return json({ success: false, error: 'No valid fields provided' }, { status: 400 });
  }

  try {
    await db
      .update(todoTable)
      .set(updateFields)
      .where(eq(todoTable.id, id))
  } catch (e) {
    console.log(e)
  }

  return json({ success: true }, { status: 200 })
}
