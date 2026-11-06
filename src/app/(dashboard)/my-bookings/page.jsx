"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { PageLoader } from "@/components/ui/loading-state";
import { showErrorToast, showSuccessToast } from "@/lib/feedback";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const statusStyles = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  completed: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

function formatDate(value) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function MyBookingsPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  
  useEffect(() => {
    if (sessionPending) return;

    async function loadBookings() {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const token = await getTokenFromClient();
        const response = await fetch(`${apiUrl}/studios/bookings?email=${encodeURIComponent(user.email)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Unable to load your bookings");
        setBookings(await response.json());
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [sessionPending, user?.email]);

  async function handleCancelBooking(bookingId) {
    setCancellingId(bookingId);

    try {
      const token = await getTokenFromClient();
      const response = await fetch(`${apiUrl}/studios/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to cancel this booking");
      }

      setBookings((currentBookings) => currentBookings.map((booking) => booking._id === bookingId ? { ...booking, status: "Cancelled" } : booking));
      showSuccessToast("Booking cancelled", "Your pending booking has been cancelled.");
    } catch (cancelError) {
      showErrorToast("Booking cancellation failed", cancelError, "Unable to cancel this booking.");
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <main className="min-h-full bg-slate-50 px-5 py-12 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Your reservations</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">My Bookings</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Review your upcoming and past studio reservations.</p>
        </div>

        {loading || sessionPending || !user ? (
          <PageLoader label="Loading your bookings..." />
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">You do not have any bookings yet.</div>
        ) : (
          <div className="mt-10 space-y-5">
            {bookings.map((booking) => {
              const status = (booking.status || "Pending").toLowerCase();
              const isPending = status === "pending";

              return (
                <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-7" key={booking._id}>
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{booking.studioTitle}</h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>{booking.status || "Pending"}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Booking ID: {booking._id}</p>
                    </div>
                    <Link className="text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-400" href={`/studios/${booking.studioId}`}>View Studio</Link>
                  </div>

                  <dl className="mt-6 grid gap-5 border-t border-slate-200 pt-5 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800">
                    <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Start</dt><dd className="mt-1 text-sm font-medium text-slate-950 dark:text-white">{formatDate(booking.startDateTime)}</dd></div>
                    <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">End</dt><dd className="mt-1 text-sm font-medium text-slate-950 dark:text-white">{formatDate(booking.endDateTime)}</dd></div>
                    <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Duration</dt><dd className="mt-1 text-sm font-medium text-slate-950 dark:text-white">{booking.totalHours || 0} hours</dd></div>
                    <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Total price</dt><dd className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">${Number(booking.totalPrice || 0).toFixed(2)}</dd></div>
                  </dl>

                  {isPending && <div className="mt-6 flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800"><button className="flex items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white" disabled={cancellingId === booking._id} onClick={() => handleCancelBooking(booking._id)} type="button">{cancellingId === booking._id && <Spinner />}{cancellingId === booking._id ? "Cancelling..." : "Cancel Booking"}</button></div>}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
