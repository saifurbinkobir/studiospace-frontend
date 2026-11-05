const assurances = [
  {
    icon: "◈",
    title: "Liability Protection",
    description: "Added peace of mind for hosts and creators throughout every booking.",
  },
  {
    icon: "✓",
    title: "Verified Profiles",
    description: "Connect with trusted people through clear profiles and booking details.",
  },
  {
    icon: "▣",
    title: "Equipment Safety",
    description: "Work confidently in spaces with clear equipment details and safety expectations.",
  },
  {
    icon: "◌",
    title: "24/7 Host Support",
    description: "Get help whenever you need it before, during, or after your studio booking.",
  },
];

const HostGuarantee = () => {
  return (
    <section className="bg-white px-5 py-20 dark:bg-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative overflow-hidden bg-cyan-700 p-8 text-white sm:p-12 dark:bg-cyan-950">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[24px] border-cyan-500/30" />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[28px] border-cyan-400/20" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Host guarantee & creator support</p>
            <h2 className="mt-6 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">A little more confidence goes a long way.</h2>
            <p className="mt-5 max-w-md leading-7 text-cyan-50">From the first message to the final shot, StudioSpace helps keep every creative booking clear, safe, and supported.</p>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-50"><span className="text-lg">✦</span> Built for creators and hosts</div>
          </div>
        </div>

        <div className="grid gap-px bg-slate-200 dark:bg-slate-800 sm:grid-cols-2">
          {assurances.map((assurance) => (
            <article className="bg-slate-100 p-7 dark:bg-slate-900" key={assurance.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-semibold text-cyan-700 shadow-sm dark:bg-slate-950 dark:text-cyan-300">{assurance.icon}</span>
              <h3 className="mt-6 text-lg font-semibold text-slate-950 dark:text-white">{assurance.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{assurance.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostGuarantee;
