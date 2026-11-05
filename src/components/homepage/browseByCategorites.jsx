import Link from "next/link";
const BrowseByCategorites = async () => {
  const res = await fetch(`${process.env.STUDIO_SPACE_BACKEND_URL}studios`, {
  cache: "no-store",
});
  const studios = await res.json();
  const categories = studios.filter(
    (studio, index, self) =>
      index === self.findIndex((item) => item.category === studio.category),
  );
  return (
    <section className="bg-slate-50 px-5 py-20 dark:bg-slate-900 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Find your creative space
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Browse by Studio Categories
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              Explore spaces designed around the way you create.
            </p>
          </div>
          <Link
            className="text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
            href="/studios"
          >
            Explore all spaces →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              className="group relative flex min-h-72 items-end overflow-hidden rounded-2xl bg-cover bg-center p-5 text-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl"
              href={`/studios?category=${category.category}`}
              key={category.title}
              style={{ backgroundImage: `url(${category.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/35 to-slate-950/5 transition-colors group-hover:from-cyan-950/90" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold">{category.category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategorites;
