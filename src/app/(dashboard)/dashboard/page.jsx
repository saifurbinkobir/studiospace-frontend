"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Building2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

function getInitials(user) {
  const name = user?.name || user?.email || "U";
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

const statCards = [
  { key: "studios", label: "My Studio Listings", href: "/my-listing", icon: Building2, color: "cyan" },
  { key: "bookings", label: "My Bookings", href: "/my-bookings", icon: CalendarDays, color: "violet" },
];

export default function DashboardPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;
  const [stats, setStats] = useState({ studios: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionPending) return;

    async function loadStats() {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const encodedEmail = encodeURIComponent(user.email);
        const [studiosResponse, bookingsResponse] = await Promise.all([
          fetch(`${apiUrl}/studios/my-studios?email=${encodedEmail}`),
          fetch(`${apiUrl}/studios/bookings?email=${encodedEmail}`),
        ]);

        if (!studiosResponse.ok || !bookingsResponse.ok) {
          throw new Error("Unable to load dashboard statistics");
        }

        const [studios, bookings] = await Promise.all([
          studiosResponse.json(),
          bookingsResponse.json(),
        ]);

        setStats({ studios: studios.length, bookings: bookings.length });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [sessionPending, user?.email]);

  return (
    <main className="min-h-full bg-slate-50 px-5 py-12 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-cyan-700 p-6 text-white dark:bg-cyan-950 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar className="size-20 border-4 border-white/20" size="lg">
              <AvatarImage alt={user?.name || "User profile"} src={user?.image || undefined} />
              <AvatarFallback>{sessionPending ? "…" : getInitials(user)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Your StudioSpace dashboard</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome, {user?.name || "Creator"}</h1>
              <p className="mt-2 text-cyan-100">{user?.email || "Manage your creative activity in one place."}</p>
            </div>
          </div>
        </section>

        {loading || sessionPending ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">Loading your dashboard...</div>
        ) : !user ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">Please log in to view your dashboard.</div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">{error}</div>
        ) : (
          <section className="mt-8 grid gap-5 md:grid-cols-3">
            {statCards.map(({ key, label, href, icon: Icon, color }) => (
              <Link className="group rounded-2xl border border-slate-200 bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950" href={href} key={key}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color === "cyan" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" : color === "violet" ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"}`}><Icon className="size-5" /></div>
                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <div className="mt-2 flex items-end justify-between gap-3"><p className="text-4xl font-bold text-slate-950 dark:text-white">{stats[key]}</p><ArrowRight className="mb-1 size-5 text-slate-400 transition-transform group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
