"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "../ui/toast";

const links = [
  ["Home", "/"],
  ["Explore Studios", "/studios"],
  ["How It Works", "/how-it-works"],
  ["About Us", "/about"],
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

export default function SiteHeader() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setDark((current) => !current);
  }

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function handleLogout() {
    authClient.signOut();
    setProfileOpen(false);
    toast.add({
      title: "Logged out successfully",
      type: "success",
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link
          className="flex items-center gap-2 text-xl font-bold text-slate-950 dark:text-white"
          href="/"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"
            aria-hidden="true"
          >
            ◉
          </span>
          StudioSpace
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => (
            <Link
              className={`text-sm transition-colors ${isActive(href) ? "font-semibold text-cyan-600 dark:text-cyan-400" : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"}`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Change theme"
            className="rounded-full border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
            onClick={toggleTheme}
            type="button"
          >
            {dark ? "☀" : "☾"}
          </button>
          {!isPending &&
            (user ? (
              <div className="group relative">
                <button
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                  className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setProfileOpen((open) => !open)}
                  type="button"
                >
                  <Avatar size="default">
                    <AvatarImage
                      alt={user.name || "User profile"}
                      src={user.image || undefined}
                    />
                    <AvatarFallback>{getInitials(user)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-28 truncate text-sm font-medium text-slate-700 dark:text-slate-200 sm:inline">
                    {user.name || "Profile"}
                  </span>
                </button>

                <div
                  className={`absolute right-0 top-full w-60 pt-3 ${profileOpen ? "block" : "hidden group-hover:block"}`}
                >
                  <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-800">
                      <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                        {user.name || "User"}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        href="/dashboard"
                      >
                        Dashboard
                      </Link>
                      <Link
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        href="/add-studio"
                      >
                        Add New Studio
                      </Link>
                      <Link
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        href="/my-listing"
                      >
                        My Studio Listings
                      </Link>
                      <Link
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        href="/my-bookings"
                      >
                        My Bookings
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                      <button onClick={handleLogout}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-block"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
                  href="/register"
                >
                  Register
                </Link>
              </>
            ))}
        </div>
      </div>

      <nav
        className="flex gap-4 overflow-x-auto border-t border-slate-100 px-5 py-3 md:hidden dark:border-slate-800"
        aria-label="Mobile navigation"
      >
        {links.map(([label, href]) => (
          <Link
            className={`whitespace-nowrap text-sm ${isActive(href) ? "font-semibold text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-slate-300"}`}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
