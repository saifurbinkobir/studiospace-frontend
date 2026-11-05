"use client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
const labelClassName =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function AddStudioPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Handle checkboxes and numbers
    data.amenities = formData.getAll("amenities");
    data.imageUrl = [data.imageUrl];
    data.hourlyRate = Number(data.hourlyRate);
    data.securityDeposit = Number(data.securityDeposit);
    data.capacity = Number(data.capacity);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/studios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      toast.add({ title: "Studio created successfully", type: "success" });
      router.push("/my-listing");
    } else {
      toast.add({ title: "Failed to create studio", type: "error" });
    }
  };

  return (
    <main className="min-h-full bg-slate-50 px-5 py-12 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Studio management
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Add New Studio
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Share your creative space with creators looking for their next
            production location.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8"
        >
          <section>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Studio information
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClassName} htmlFor="title">
                  Title
                </label>
                <input
                  className={inputClassName}
                  id="title"
                  name="title"
                  placeholder="e.g. Downtown Photo Studio"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="category">
                  Category
                </label>
                <select
                  className={inputClassName}
                  defaultValue=""
                  id="category"
                  name="category"
                  required
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  <option>Photo Studios</option>
                  <option>Sound Stages</option>
                  <option>Podcast Rooms</option>
                  <option>Music Suites</option>
                  <option>Art Workshops</option>
                </select>
              </div>
              <div>
                <label className={labelClassName} htmlFor="location">
                  Location / Address
                </label>
                <input
                  className={inputClassName}
                  id="location"
                  name="location"
                  placeholder="City, state, or full address"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="hourlyRate">
                  Hourly Rate ($)
                </label>
                <input
                  className={inputClassName}
                  id="hourlyRate"
                  min="0"
                  name="hourlyRate"
                  placeholder="50"
                  required
                  type="number"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="securityDeposit">
                  Security Deposit ($)
                </label>
                <input
                  className={inputClassName}
                  id="securityDeposit"
                  min="0"
                  name="securityDeposit"
                  placeholder="100"
                  required
                  type="number"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="capacity">
                  Max Capacity
                </label>
                <input
                  className={inputClassName}
                  id="capacity"
                  min="1"
                  name="capacity"
                  placeholder="10"
                  required
                  type="number"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="imageUrl">
                  Image URL
                </label>
                <input
                  className={inputClassName}
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/studio.jpg"
                  required
                  type="url"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Amenities
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {amenities.map((amenity) => (
                <label
                  className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300"
                  key={amenity}
                >
                  <input
                    className="h-4 w-4 accent-cyan-600"
                    name="amenities"
                    type="checkbox"
                    value={amenity}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <label className={labelClassName} htmlFor="overview">
              Detailed Overview
            </label>
            <textarea
              className={`${inputClassName} min-h-36 resize-y`}
              id="overview"
              name="overview"
              placeholder="Describe the space, its best uses, and what creators can expect."
              required
            />
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Host information
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="ownerName">
                  User Name
                </label>
                <input
                  className={`${inputClassName} cursor-not-allowed opacity-75`}
                  id="ownerName"
                  name="ownerName"
                  readOnly
                  value={user?.name || "Loading user..."}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="ownerEmail">
                  User Email
                </label>
                <input
                  className={`${inputClassName} cursor-not-allowed opacity-75`}
                  id="ownerEmail"
                  name="ownerEmail"
                  readOnly
                  type="email"
                  value={user?.email || "Loading email..."}
                />
              </div>
            </div>
          </section>

          <button
            className="w-full rounded-lg bg-cyan-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 sm:w-auto"
            type="submit"
          >
            Create Studio Listing
          </button>
        </form>
      </div>
    </main>
  );
}
