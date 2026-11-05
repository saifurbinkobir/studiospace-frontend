"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const inputClassName = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
const labelClassName = "mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300";

function getBookingSummary(startValue, endValue, hourlyRate, securityDeposit) {
  if (!startValue || !endValue) return { hours: 0, total: 0 };

  const start = new Date(startValue);
  const end = new Date(endValue);
  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  if (!Number.isFinite(hours) || hours <= 0) return { hours: 0, total: 0 };

  return {
    hours,
    total: hours * Number(hourlyRate) + Number(securityDeposit),
  };
}

export default function BookingPopover({ studio }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { hours, total } = getBookingSummary(startDateTime, endDateTime, studio.hourlyRate, studio.securityDeposit);

  async function handleSubmit(event) {
    event.preventDefault();


    if (!hours) {
      toast.add({ title: "Choose a valid booking time range", type: "error" });
      return;
    }

    setSubmitting(true);

    const booking = {
      studioId: studio._id,
      studioTitle: studio.title,
      userName: user.name || "User",
      userEmail: user.email,
      startDateTime: new Date(startDateTime).toISOString(),
      endDateTime: new Date(endDateTime).toISOString(),
      totalHours: hours,
      hourlyRate: Number(studio.hourlyRate),
      securityDeposit: Number(studio.securityDeposit),
      totalPrice: total,
    };

    try {
      const response = await fetch(`${apiUrl}/studios/bookings`, {
        body: JSON.stringify(booking),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.status === 409) {
        toast.add({ title: "Studio Already Booked", description: "This studio is already booked during the selected time period.", type: "error" });
        return;
      }

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Booking failed");
      }

      toast.add({ title: "Booking request submitted", description: "Your booking is pending confirmation.", type: "success" });
      setStartDateTime("");
      setEndDateTime("");
      router.push("/my-bookings");
    } catch (error) {
      toast.add({ title: "Booking failed", description: error.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="mt-8 w-full rounded-full bg-cyan-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" type="button">Book Workspace Now</PopoverTrigger>
      <PopoverContent align="end" className="max-h-[calc(100vh-2rem)] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:p-6">
        <PopoverHeader>
          <PopoverTitle className="text-lg font-semibold">Book this workspace</PopoverTitle>
          <PopoverDescription className="mt-1 text-slate-500 dark:text-slate-400">Choose your production hours to calculate the booking total.</PopoverDescription>
        </PopoverHeader>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={labelClassName} htmlFor="booking-start">Start Date &amp; Time</label><input className={inputClassName} id="booking-start" name="startDateTime" onChange={(event) => setStartDateTime(event.target.value)} required type="datetime-local" value={startDateTime} /></div>
            <div><label className={labelClassName} htmlFor="booking-end">End Date &amp; Time</label><input className={inputClassName} id="booking-end" name="endDateTime" onChange={(event) => setEndDateTime(event.target.value)} required type="datetime-local" value={endDateTime} /></div>
          </div>

          <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
            <div><label className={labelClassName} htmlFor="booking-title">Studio Title</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="booking-title" readOnly value={studio.title} /></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><label className={labelClassName} htmlFor="booking-rate">Hourly Rate</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="booking-rate" readOnly value={`$${studio.hourlyRate} / hr`} /></div>
              <div><label className={labelClassName} htmlFor="booking-deposit">Security Deposit</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="booking-deposit" readOnly value={`$${studio.securityDeposit}`} /></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><label className={labelClassName} htmlFor="booking-user-name">User Name</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="booking-user-name" readOnly value={user?.name || "Not signed in"} /></div>
              <div><label className={labelClassName} htmlFor="booking-user-email">User Email</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="booking-user-email" readOnly value={user?.email || "Not signed in"} /></div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 dark:border-cyan-900 dark:bg-cyan-950/40">
            <div><p className="text-sm font-semibold text-slate-950 dark:text-white">Total Price</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hours ? `${hours.toFixed(2)} hours + security deposit` : "Select start and end times"}</p></div>
            <p className="text-right text-sm font-bold text-cyan-700 dark:text-cyan-300">${total.toFixed(2)}</p>
          </div>

          <button className="w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" disabled={submitting} type="submit">{submitting ? "Submitting..." : "Confirm Booking"}</button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
