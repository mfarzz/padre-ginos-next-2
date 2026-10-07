import Link from "next/link";
import { getTopPizzas } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function TopPizzasWidget() {
  // Data historis mahal dan relatif stabil, jadi di-cache selama satu jam.
  const pizzas = await getTopPizzas();

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Terlaris sepanjang masa</h2>

      <ol className="mt-5 space-y-3">
        {pizzas.map((pizza, index) => (
          <li
            key={pizza.id}
            className="flex items-start justify-between gap-3 border-b border-black/5 pb-3 last:border-0"
          >
            <div className="flex min-w-0 gap-3">
              <span className="font-bold text-ink/50">{index + 1}</span>

              <div className="min-w-0">
                <Link
                  href={`/admin/products/${pizza.id}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {pizza.name}
                </Link>
                <p className="text-sm text-ink/60">
                  {pizza.sold.toLocaleString("en-US")} terjual
                </p>
              </div>
            </div>

            <span className="shrink-0 text-sm font-semibold">
              {formatPrice(pizza.revenue)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}