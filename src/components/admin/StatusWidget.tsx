import { getStatusCounts } from "@/lib/admin-data";
import { ORDER_STATUSES, STATUS_LABELS } from "@/lib/orders";

export default async function StatusWidget() {
  const counts = await getStatusCounts();

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Status order hari ini</h2>

      <dl className="mt-5 space-y-3">
        {ORDER_STATUSES.map((status) => (
          <div
            key={status}
            className="flex items-center justify-between border-b border-black/5 pb-2 last:border-0"
          >
            <dt className="text-sm text-ink/70">{STATUS_LABELS[status]}</dt>
            <dd className="font-bold">{counts[status]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}