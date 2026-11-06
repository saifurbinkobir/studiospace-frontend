import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-5 py-16 dark:bg-slate-900 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl justify-items-center gap-12 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">StudioSpace</p>
          <p className="mt-6 text-8xl font-bold tracking-tight text-slate-200 dark:text-slate-800 sm:text-9xl">404</p>
          <h1 className="-mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">This space is off the map.</h1>
          <p className="mt-5 max-w-lg leading-7 text-slate-600 dark:text-slate-400">The page you are looking for may have moved, or this creative space is not available anymore.</p>
          <Link className="mt-8 inline-flex rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" href="/">Return to Home</Link>
        </div>        
      </div>
    </main>
  );
}
