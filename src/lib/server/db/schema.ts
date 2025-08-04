import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todo_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  comments: text(),
  completed: integer({ mode: 'boolean' }),
});
