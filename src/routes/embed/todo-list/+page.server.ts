import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/todo-list')
  const data = await response.json()
  const todos = data.todos

  return {
    todos,
  }
}
