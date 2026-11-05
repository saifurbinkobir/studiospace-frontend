"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const amenities = [
  "Wi-Fi",
  "Lighting",
  "Cyc Wall",
  "Soundproofing",
  "Microphones",
  "Parking",
  "Makeup Station",
  "Kitchen",
];

const inputClassName = "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
const labelClassName = "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function StudioEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadStudio() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/studios/${id}`);
        if (!response.ok) throw new Error("Unable to load studio details");
        const data = await response.json();
        setStudio({
          ...data,
          imageUrl: Array.isArray(data.imageUrl) ? data.imageUrl[0] : data.imageUrl,
        });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) loadStudio();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const updatedData = {
      title: formData.get("title"),
      category: formData.get("category"),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      capacity: Number(formData.get("capacity")),
      location: formData.get("location"),
      imageUrl: [formData.get("imageUrl")],
      amenities: formData.getAll("amenities"),
      overview: formData.get("overview"),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/studios/${id}`, {
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });

      if (!response.ok) throw new Error("Unable to update studio listing");

      toast.add({ title: "Studio updated successfully", type: "success" });
      router.push("/my-listing");
    } catch (saveError) {
      toast.add({ title: "Update failed", description: saveError.message, type: "error" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="flex-1 bg-slate-50 p-8 text-slate-600 dark:bg-slate-900 dark:text-slate-400">Loading studio details...</main>;
  if (error || !studio) return <main className="flex-1 bg-slate-50 p-8 text-red-700 dark:bg-slate-900 dark:text-red-300">{error || "Studio not found"}</main>;

  return (
    <main className="min-h-full bg-slate-50 px-5 py-12 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Studio management</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Update Studio</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Update the details of your creative space.</p>

        <form className="mt-10 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8" onSubmit={handleSubmit}>
          <section>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Studio information</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className={labelClassName} htmlFor="title">Title</label><input className={inputClassName} defaultValue={studio.title} id="title" name="title" required type="text" /></div>
              <div><label className={labelClassName} htmlFor="category">Category</label><select className={inputClassName} defaultValue={studio.category} id="category" name="category" required><option>Photo Studios</option><option>Sound Stages</option><option>Podcast Rooms</option><option>Music Suites</option><option>Art Workshops</option></select></div>
              <div><label className={labelClassName} htmlFor="location">Location / Address</label><input className={inputClassName} defaultValue={studio.location} id="location" name="location" required type="text" /></div>
              <div><label className={labelClassName} htmlFor="hourlyRate">Hourly Rate ($)</label><input className={inputClassName} defaultValue={studio.hourlyRate} id="hourlyRate" min="0" name="hourlyRate" required type="number" /></div>
              <div><label className={labelClassName} htmlFor="securityDeposit">Security Deposit ($)</label><input className={inputClassName} defaultValue={studio.securityDeposit} id="securityDeposit" min="0" name="securityDeposit" required type="number" /></div>
              <div><label className={labelClassName} htmlFor="capacity">Max Capacity</label><input className={inputClassName} defaultValue={studio.capacity} id="capacity" min="1" name="capacity" required type="number" /></div>
              <div><label className={labelClassName} htmlFor="imageUrl">Image URL</label><input className={inputClassName} defaultValue={studio.imageUrl} id="imageUrl" name="imageUrl" required type="url" /></div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Amenities</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{amenities.map((amenity) => <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300" key={amenity}><input className="h-4 w-4 accent-cyan-600" defaultChecked={(studio.amenities || []).includes(amenity)} name="amenities" type="checkbox" value={amenity} />{amenity}</label>)}</div>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800"><label className={labelClassName} htmlFor="overview">Detailed Overview</label><textarea className={`${inputClassName} min-h-36 resize-y`} defaultValue={studio.overview} id="overview" name="overview" required /></section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Host information</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div><label className={labelClassName} htmlFor="ownerName">User Name</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="ownerName" readOnly value={user?.name || studio.ownerName || "Loading user..."} /></div>
              <div><label className={labelClassName} htmlFor="ownerEmail">User Email</label><input className={`${inputClassName} cursor-not-allowed opacity-75`} id="ownerEmail" readOnly type="email" value={user?.email || studio.ownerEmail || "Loading email..."} /></div>
            </div>
          </section>

          <button className="rounded-lg bg-cyan-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" disabled={saving} type="submit">{saving ? "Updating..." : "Update Studio"}</button>
        </form>
      </div>
    </main>
  );
}
