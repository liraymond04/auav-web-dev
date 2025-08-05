import type { Product } from "./types";

export function getProduct(products: Product[], id: number) {
  return products.find((item) => item.id === id)
}
