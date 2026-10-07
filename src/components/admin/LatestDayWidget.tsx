import { getLatestDay } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function LatestDayWidget() {
  const latestDay = await getLatestDay();

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Hari terakhir</h2>
      <p className="mt-1 text-sm text-ink/60">{latestDay.date}</p>

      <dl className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm text-ink/60">Omzet</dt>
          <dd className="mt-1 text-2xl font-black">
            {formatPrice(latestDay.revenue)}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-ink/60">Order</dt>
          <dd className="mt-1 text-2xl font-black">
            {latestDay.orders.toLocaleString("en-US")}
          </dd>
        </div>
      </dl>
    </section>
  );
}