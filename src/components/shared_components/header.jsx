"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["Explore Studios", "/studios"],
  ["How It Works", "/how-it-works"],
  ["About Us", "/about"],
];

export default function SiteHeader() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setDark((current) => !current);
  }

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link className="flex items-center gap-2 text-xl font-bold text-slate-950 dark:text-white" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" aria-hidden="true">◉</span>
          StudioSpace
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link className="text-sm text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400" href={href} key={href}>{label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="Change theme" className="rounded-full border border-slate-200 px-3 py-2 text-sm dark:border-slate-700" onClick={toggleTheme} type="button">{dark ? "☀" : "🌑"}</button>
          <Link className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-block" href="/login">Login</Link>
          <Link className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700" href="/register">Register</Link>
        </div>
      </div>

      <nav className="flex gap-4 overflow-x-auto border-t border-slate-100 px-5 py-3 md:hidden dark:border-slate-800" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link className="whitespace-nowrap text-sm text-slate-600 dark:text-slate-300" href={href} key={href}>{label}</Link>)}
      </nav>
    </header>
  );
}
