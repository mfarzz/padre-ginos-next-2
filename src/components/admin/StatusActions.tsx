"use client";

import { useActionState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  nextStatuses,
  STATUS_LABELS,
  type OrderStatus,
} from "@/lib/orders";
import {
  updateOrderStatusAction,
  type StatusFormState,
} from "@/app/admin/actions";

export default function StatusActions({
  orderId,
  initialStatus,
}: {
  orderId: number;
  initialStatus: OrderStatus;
}) {
  const initialState: StatusFormState = {
    status: initialStatus,
    error: null,
  };

  const [state, formAction, isPending] = useActionState(
    updateOrderStatusAction,
    initialState,
  );

  const next = nextStatuses(state.status);

  return (
    <div className="flex flex-col items-start gap-3">
      <StatusBadge status={state.status} />

      {next.length === 0 ? (
        <p className="text-sm text-ink/60">
          Status final, tidak bisa diubah lagi.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {next.map((status) => (
            <form key={status} action={formAction}>
              <input type="hidden" name="id" value={orderId} />
              <button
                type="submit"
                name="status"
                value={status}
                disabled={isPending}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Menyimpan…" : `Ubah ke ${STATUS_LABELS[status]}`}
              </button>
            </form>
          ))}
        </div>
      )}

      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}
    </div>
  );
}