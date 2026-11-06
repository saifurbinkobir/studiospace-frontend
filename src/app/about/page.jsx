import Link from "next/link";

const values = [
  {
    icon: "✦",
    title: "Made for creators",
    description: "From photo studios and sound stages to podcast rooms and music suites, every space supports the way creators work.",
  },
  {
    icon: "✓",
    title: "Clear and transparent",
    description: "See hourly rates, security deposits, amenities, and studio details before making a booking decision.",
  },
  {
    icon: "◈",
    title: "Built on trust",
    description: "Verified profiles, practical studio information, and host support help every booking feel more confident.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-full bg-slate-50 dark:bg-slate-900">
      <section className="bg-white px-5 py-16 dark:bg-slate-950 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">About StudioSpace</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">The right space can change the way an idea comes to life.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">StudioSpace is a creative space marketplace that connects creators with inspiring studios, stages, lounges, and workshops built for meaningful work.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" href="/studios">Explore Studios</Link><Link className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300" href="/add-studio">List Your Space</Link></div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-cyan-700 p-8 text-white dark:bg-cyan-950 sm:p-10">
            <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-24 border-cyan-400/30" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-28 border-cyan-300/20" />
            <div className="relative"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Our purpose</p><p className="mt-6 text-2xl font-semibold leading-9">Make creative spaces easier to discover, easier to trust, and easier to book.</p><p className="mt-6 text-sm leading-7 text-cyan-50">We bring hosts and creators together so more time can be spent creating and less time can be spent searching.</p></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">What we believe</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">A better home for creative work.</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">StudioSpace is designed around the needs of independent creators, production teams, and hosts who want their spaces to be put to good use.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{values.map((value) => <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950" key={value.title}><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-xl font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">{value.icon}</span><h3 className="mt-6 text-lg font-semibold text-slate-950 dark:text-white">{value.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{value.description}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24"><div className="mx-auto max-w-6xl rounded-3xl border border-cyan-200 bg-cyan-50 p-8 dark:border-cyan-900 dark:bg-cyan-950/40 sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Create your next chapter</p><div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Whether you are booking a room or sharing one, there is a place for your next idea here.</h2><Link className="shrink-0 rounded-full bg-cyan-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" href="/studios">Start exploring</Link></div></div></section>
    </main>
  );
}
