import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";
import StatusActions from "@/components/admin/StatusActions";

export default async function OrderDetailPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const orderId = Number(id);

  if (!Number.isSafeInteger(orderId) || orderId <= 0) {
    notFound();
  }

  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <section className="max-w-full">
      <Link
        href="/admin/orders"
        className="text-sm text-brand hover:underline"
      >
        ← Semua orders
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Order #{order.id}</h1>
          <p className="mt-1 text-ink/70">
            {order.date} {order.time}
          </p>
        </div>
        <StatusActions orderId={order.id} initialStatus={order.status} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="bg-stone-50 text-xs uppercase text-ink/60">
            <tr>
              <th className="px-4 py-3">Pizza</th>
              <th className="px-4 py-3">Ukuran</th>
              <th className="px-4 py-3 text-right">Jumlah</th>
              <th className="px-4 py-3 text-right">Harga</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.lines.map((line) => (
              <tr
                key={`${line.pizzaId}-${line.size}`}
                className="border-t border-black/5"
              >
                <td className="px-4 py-3 font-semibold">
                  <Link
                    href={`/admin/products/${line.pizzaId}`}
                    className="text-brand hover:underline"
                  >
                    {line.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{line.size}</td>
                <td className="px-4 py-3 text-right">{line.quantity}</td>
                <td className="px-4 py-3 text-right">
                  {formatPrice(line.price)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatPrice(line.price * line.quantity)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="border-t-2 border-black/10">
              <th
                colSpan={4}
                className="px-4 py-4 text-right text-base"
              >
                Total
              </th>
              <th className="px-4 py-4 text-right text-base">
                {formatPrice(order.total)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}