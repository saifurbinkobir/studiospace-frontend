"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { showErrorToast, showSuccessToast } from "@/lib/feedback";

const navigation = [
  ["Dashboard", "/dashboard"],
  ["Add New Studio", "/add-studio"],
  ["My Studio Listings", "/my-listing"],
  ["My Bookings", "/my-bookings"],
];

function getInitials(user) {
  const name = user?.name || user?.email || "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      const result = await authClient.signOut();
      if (result?.error) throw result.error;
      showSuccessToast("Logout successful", "You have been logged out of StudioSpace.");
      window.location.replace("/");
    } catch (error) {
      showErrorToast("Logout failed", error, "Unable to log out.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-1 bg-slate-50 dark:bg-slate-900">
      <aside className="hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:fixed md:inset-y-0 md:left-0 md:top-20 md:z-30 md:flex md:w-72 md:flex-col">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 lg:block">
            <Avatar className="size-14" size="lg">
              <AvatarImage
                alt={user?.name || "User profile"}
                src={user?.image || undefined}
              />
              <AvatarFallback>
                {isPending ? "…" : getInitials(user)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 lg:mt-4">
              <p className="truncate font-semibold text-slate-950 dark:text-white">
                {isPending ? "Loading profile" : user?.name || "User"}
              </p>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {isPending ? "" : user?.email || ""}
              </p>
            </div>
          </div>

          <nav
            className="mt-6 space-y-2 lg:mt-8"
            aria-label="Dashboard navigation"
          >
            {navigation.map(([label, href]) => {
              const active = pathname === href;

              return (
                <Link
                  className={`block w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${active ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"}`}
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            className="mt-6 flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/30 lg:mt-8"
            disabled={loggingOut}
            onClick={handleLogout}
            type="button"
          >
            {loggingOut && <Spinner />}
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 md:ml-72">{children}</div>
    </div>
  );
}
