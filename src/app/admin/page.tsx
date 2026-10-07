import Link from "next/link";
import { Suspense } from "react";
import LatestDayWidget from "@/components/admin/LatestDayWidget";
import StatusWidget from "@/components/admin/StatusWidget";
import TopPizzasWidget from "@/components/admin/TopPizzasWidget";
import WidgetErrorBoundary from "@/components/admin/WidgetErrorBoundary";
import WidgetLoading from "@/components/admin/WidgetLoading";

export default function AdminHome() {
  return (
    <section>
      <h1 className="text-3xl font-black">Overview</h1>
      <p className="mt-2 text-ink/70">
        Ringkasan Operasional Toko Padre Gino&apos;s
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <WidgetErrorBoundary title="Order terbaru">
          <Suspense fallback={<WidgetLoading />}>
            <LatestDayWidget />
          </Suspense>
        </WidgetErrorBoundary>

        <WidgetErrorBoundary title="Status order hari ini">
          <Suspense fallback={<WidgetLoading />}>
            <StatusWidget />
          </Suspense>
        </WidgetErrorBoundary>

        <WidgetErrorBoundary title="Terlaris sepanjang masa">
          <Suspense fallback={<WidgetLoading />}>
            <TopPizzasWidget />
          </Suspense>
        </WidgetErrorBoundary>
      </div>
      <div className="mt-6 flex gap-4">
        <Link
          href="/admin/products"
          className="rounded-xl bg-white px-5 py-4 font-semibold shadow-sm"
        >
          Kelola produk →
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-xl bg-white px-5 py-4 font-semibold shadow-sm"
        >
          Lihat order →
        </Link>
      </div>
    </section>
  );
}
