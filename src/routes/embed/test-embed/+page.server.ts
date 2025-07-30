import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const test_data = "Hi";
  return {
    test_data,
  }
}
