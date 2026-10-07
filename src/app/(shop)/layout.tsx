import FailureToggle from "@/components/FailureToggle";
import Header from "@/components/Header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-black/10 bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm text-ink/70">
            <span>
                Padre Gino&apos;s
            </span>
            <FailureToggle />
        </div>
      </footer>
    </div>
  );
}
