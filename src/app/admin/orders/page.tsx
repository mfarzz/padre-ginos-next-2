import Link from "next/link";
import { getOrders } from "@/lib/admin-data";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice, parseValidDate } from "@/lib/format";

type OrdersPageProps = {
  searchParams: Promise<{
    page?: string;
    date?: string;
  }>;
};

function ordersHref(page: number, date: string | null) {
  const params = new URLSearchParams();

  if (date) params.set("date", date);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return `/admin/orders${query ? `?${query}` : ""}`;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;

  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const date = parseValidDate(params.date);

  const { orders, totalPages } = await getOrders({ page, date });
  const visiblePageCount = 2;
  const startPage = Math.max(1, page - visiblePageCount);
  const endPage = Math.min(totalPages, page + visiblePageCount);

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Orders</h1>
          <p className="mt-1 text-ink/70">Kelola pesanan pelanggan</p>
        </div>
      </div>

      <form
        method="get"
        className="mt-6 flex flex-wrap items-end gap-3 rounded-xl bg-white p-4 shadow-sm justify-end"
      >
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-semibold">
            Filter tanggal
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={date ?? ""}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Terapkan
        </button>

        {date && (
          <Link
            href="/admin/orders"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5"
          >
            Reset
          </Link>
        )}
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-stone-50 text-xs uppercase text-ink/60">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Waktu</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Item</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink/60">
                  Tidak ada order pada tanggal tersebut.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-semibold">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-brand hover:underline"
                    >
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {order.date} {order.time}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-right">{order.items}</td>
                  <td className="px-4 py-3 text-right">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <nav
        aria-label="Pagination orders"
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        <Link
          prefetch={false}
          href={ordersHref(Math.max(1, page - 1), date)}
          aria-disabled={page === 1}
          className={`rounded-lg border border-black/10 px-3 py-2 text-sm font-semibold ${
            page === 1
              ? "pointer-events-none bg-stone-100 text-ink/30"
              : "bg-white hover:bg-stone-50"
          }`}
        >
          Sebelumnya
        </Link>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index,
        ).map((pageNumber) => (
          <Link
            prefetch={false}
            key={pageNumber}
            href={ordersHref(pageNumber, date)}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              pageNumber === page
                ? "bg-brand text-white"
                : "border border-black/10 bg-white hover:bg-stone-50"
            }`}
          >
            {pageNumber}
          </Link>
        ))}

        <Link
          prefetch={false}
          href={ordersHref(Math.min(totalPages, page + 1), date)}
          aria-disabled={page === totalPages}
          className={`rounded-lg border border-black/10 px-3 py-2 text-sm font-semibold ${
            page === totalPages
              ? "pointer-events-none bg-stone-100 text-ink/30"
              : "bg-white hover:bg-stone-50"
          }`}
        >
          Berikutnya
        </Link>
      </nav>
    </section>
  );
}
