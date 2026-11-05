import Image from "next/image";
import { notFound } from "next/navigation";

const DetailsStudioPage = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(
    `${process.env.STUDIO_SPACE_BACKEND_URL}studios/${id}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    notFound();
  }

  const studio = await response.json();

  if (!studio) {
    notFound();
  }

  return (
    <main className="flex-1 bg-slate-50 px-5 py-12 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
            <Image
              alt={studio.title}
              className="h-auto max-h-155 w-full object-cover"
              height={900}
              priority
              src={studio.imageUrl}
              width={1200}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">{studio.category}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">★ {studio.rating}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">{studio.title}</h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">{studio.location}</p>
            <p className="mt-6 text-2xl font-bold text-slate-950 dark:text-white">${studio.hourlyRate}<span className="ml-1 text-base font-normal text-slate-500 dark:text-slate-400">/ hr</span></p>

            <button className="mt-8 w-full rounded-full bg-cyan-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" type="button">Book Workspace Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">About this workspace</h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{studio.overview}</p>

            <h2 className="mt-8 text-xl font-semibold text-slate-950 dark:text-white">Amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {(studio.amenities || []).map((amenity) => (
                <li className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300" key={amenity}>✓ {amenity}</li>
              ))}
            </ul>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Workspace details</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-slate-500 dark:text-slate-400">Capacity</dt><dd className="font-medium text-slate-950 dark:text-white">{studio.capacity} people</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500 dark:text-slate-400">Security deposit</dt><dd className="font-medium text-slate-950 dark:text-white">${studio.securityDeposit}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500 dark:text-slate-400">Rating</dt><dd className="font-medium text-slate-950 dark:text-white">★ {studio.rating} / 5</dd></div>
              </dl>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Meet your host</h2>
              <p className="mt-4 font-medium text-slate-950 dark:text-white">{studio.ownerName}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{studio.ownerEmail}</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailsStudioPage;
