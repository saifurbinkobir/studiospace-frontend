import Link from "next/link";
import StudioCard from "../cards/StudioCard";

const FeaturedStudios = async () => {
  const res = await fetch(`${process.env.STUDIO_SPACE_BACKEND_URL}studios/featured`, {
  cache: "no-store",
});
  
  const featuredStudios = await res.json();

  return (
    <section className="bg-white px-5 py-20 dark:bg-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Featured studios</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Showcasing our Newest spaces for your next project.</h2>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Explore creative spaces loved by creators and ready for your next production.</p>
          </div>
          <Link className="text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300" href="/studios">View all studios →</Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStudios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStudios;