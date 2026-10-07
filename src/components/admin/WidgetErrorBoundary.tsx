"use client";

import { catchError, type ErrorInfo } from "next/error";

type WidgetErrorProps = {
  title: string;
};

function WidgetErrorFallback(
  { title }: WidgetErrorProps,
  { error, retry }: ErrorInfo,
) {
  console.error(error);

  return (
    <section
      role="alert"
      className="min-h-40 rounded-xl bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-3 text-sm text-ink/70">
        Gagal memuat data ini.
      </p>
      <button
        type="button"
        onClick={retry}
        className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Coba lagi
      </button>
    </section>
  );
}

const WidgetErrorBoundary = catchError(WidgetErrorFallback);

export default WidgetErrorBoundary;