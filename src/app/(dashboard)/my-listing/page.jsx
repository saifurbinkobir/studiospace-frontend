"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MyListingPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingStudio, setDeletingStudio] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (sessionPending) return;

    async function loadStudios() {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/studios/my-studios?email=${encodeURIComponent(user.email)}`);
        if (!response.ok) throw new Error("Unable to load studio listings");
        setStudios(await response.json());
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudios();
  }, [sessionPending, user?.email]);

  async function handleDelete() {
    if (!deletingStudio) return;
    setDeleting(true);

    try {
      const response = await fetch(`${apiUrl}/studios/${deletingStudio._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Unable to delete this studio listing");

      setStudios((currentStudios) => currentStudios.filter((studio) => studio._id !== deletingStudio._id));
      setDeletingStudio(null);
      toast.add({ title: "Studio listing deleted", type: "success" });
    } catch (deleteError) {
      toast.add({ title: "Delete failed", description: deleteError.message, type: "error" });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-full bg-slate-50 px-5 py-12 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Studio management</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">My Studio Listings</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Manage the creative spaces you have shared with the StudioSpace community.</p>
        </div>

        {loading || sessionPending ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">Loading your studio listings...</div>
        ) : !user ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">Please log in to view your studio listings.</div>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">{error}</div>
        ) : studios.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">You have not added any studio listings yet.</div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" key={studio._id}>
                <Image alt={studio.title} className="h-52 w-full object-cover" height={360} src={studio.imageUrl[0]} width={600} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">{studio.category}</span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">★ {studio.rating}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{studio.title}</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{studio.location}</p>
                  <p className="mt-4 text-base font-semibold text-slate-950 dark:text-white">${studio.hourlyRate} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ hr</span></p>
                  <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
                    <Link className="rounded-full border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" href={`/studios/${studio._id}`}>View Details</Link>
                    <Link className="rounded-full border border-cyan-600 px-3 py-2 text-center text-sm font-semibold text-cyan-700 hover:bg-cyan-600 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950" href={`/studios/edit/${studio._id}`}>Update</Link>
                    <button className="flex-1 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white" onClick={() => setDeletingStudio(studio)} type="button">Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Dialog open={Boolean(deletingStudio)} onOpenChange={(open) => !open && setDeletingStudio(null)}>
        <DialogContent className="dark:bg-slate-950 dark:text-white">
          <DialogHeader>
            <DialogTitle>Delete studio listing?</DialogTitle>
            <DialogDescription>Are you sure you want to delete “{deletingStudio?.title}”? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200" onClick={() => setDeletingStudio(null)} type="button">Cancel</button>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700" disabled={deleting} onClick={handleDelete} type="button">{deleting ? "Deleting..." : "Delete Listing"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
