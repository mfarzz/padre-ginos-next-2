export default function WidgetLoading() {
  return (
    <section className="min-h-40 rounded-xl bg-white p-5 shadow-sm">
      <div className="h-5 w-36 animate-pulse rounded bg-stone-200" />
      <div className="mt-5 h-8 w-24 animate-pulse rounded bg-stone-200" />
      <div className="mt-3 h-4 w-48 animate-pulse rounded bg-stone-200" />
    </section>
  );
}