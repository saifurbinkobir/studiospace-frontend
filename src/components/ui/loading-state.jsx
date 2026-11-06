import { Aperture } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export function PageLoader({ label = "Loading StudioSpace..." }) {
  return (
    <div
      className="flex min-h-[22rem] flex-1 items-center justify-center bg-slate-50 px-5 py-16 dark:bg-slate-900 sm:px-8"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
          <Aperture className="size-7" aria-hidden="true" />
        </span>
        <Spinner className="size-5 text-cyan-600 dark:text-cyan-400" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export function InlineLoader({ label = "Loading..." }) {
  return (
    <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
      <Spinner className="size-4" />
      {label}
    </span>
  );
}
