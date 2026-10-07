"use client";
import { STATUS_LABELS, type OrderStatus } from "@/lib/orders";

function statusClass(status: OrderStatus) {
  const classes: Record<OrderStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-emerald-100 text-emerald-800",
    delivered: "bg-stone-200 text-stone-700",
    cancelled: "bg-red-100 text-red-800",
  };

  return classes[status];
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusClass(status)}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
