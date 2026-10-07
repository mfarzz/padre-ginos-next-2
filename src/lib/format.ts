import type { Pizza } from "./types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number): string {
  return usd.format(value);
}

export function lowestPrice(pizza: Pizza): number {
  return Math.min(...Object.values(pizza.sizes).filter((p) => p > 0));
}

export function filterPizzas(
  pizzas: Pizza[],
  query: string,
  category: string,
): Pizza[] {
  const q = query.trim().toLowerCase();
  return pizzas.filter((pizza) => {
    const matchesCategory = category === "All" || pizza.category === category;
    const matchesQuery =
      q === "" ||
      pizza.name.toLowerCase().includes(q) ||
      pizza.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

/** Returns a whole number 1–5, or null for anything else. */
export function parseStars(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isInteger(n)) return null;
  return n >= 1 && n <= 5 ? n : null;
}

export function parseValidDate(value?: string): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? value
    : null;
}

export function parsePrice(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d+(\.\d{1,2})?$/.test(value.trim())) {
    return null;
  }
  const n = Number(value);
  return n >= 0.01 && n <= 100 ? n : null;
}