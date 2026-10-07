// Becomes the <Suspense> fallback around this segment's page
export default function OrdersLoading() {
  return (
    <section>
      <h1 className="text-3xl font-black">Orders</h1>
      <p className="mt-6 animate-pulse text-ink/60">Memuat Orders...</p>
    </section>
  );
}