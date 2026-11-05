import StudioCard from "@/components/cards/StudioCard";
import Link from "next/link";

const Studios = async ({ searchParams }) => {
  const params = await searchParams;
  const rawCategory = params?.category;
  const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  const studiosUrl = `${process.env.STUDIO_SPACE_BACKEND_URL}studios`;
  const allStudiosRequest = fetch(studiosUrl, { cache: "no-store" });
  const filteredStudiosRequest = category
    ? fetch(`${studiosUrl}?category=${encodeURIComponent(category)}`, {
        cache: "no-store",
      })
    : allStudiosRequest;
  const [allStudiosResponse, studiosResponse] = await Promise.all([
    allStudiosRequest,
    filteredStudiosRequest,
  ]);
  const allStudios = await allStudiosResponse.json();
  const studios = category ? await studiosResponse.json() : allStudios;
  const categories = [
    ...new Set(allStudios.map((studio) => studio.category).filter(Boolean)),
  ].sort();
  const filters = [
    { label: "All Studios", value: "" },
    ...categories.map((studioCategory) => ({
      label: studioCategory,
      value: studioCategory,
    })),
  ];

  return (
    <main className="flex-1 bg-slate-50 px-5 py-16 dark:bg-slate-900 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Explore creative spaces
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Explore Studios
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Find the right studio, stage, or creative workspace for your next
            project.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-3"
          aria-label="Filter studios by category"
        >
          {filters.map((filter) => {
            const isActive = filter.value === (category || "");
            const href = filter.value
              ? `/studios?category=${encodeURIComponent(filter.value)}`
              : "/studios";

            return (
              <Link
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-slate-950"
                    : "border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                }`}
                href={href}
                key={filter.label}
                aria-current={isActive ? "page" : undefined}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>

        {studios.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              {category
                ? "No studios found in this category"
                : "No studios available yet"}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Please check back soon for new creative spaces.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Studios;
