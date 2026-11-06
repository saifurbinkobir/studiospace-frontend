const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description: "Explore creative studios and find a space that fits your project.",
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description: "Choose the date and number of hours that work best for your shoot.",
  },
  {
    number: "03",
    title: "Book Instantly",
    description: "Reserve your selected studio with clear pricing and no hidden fees.",
  },
  {
    number: "04",
    title: "Create & Produce",
    description: "Arrive ready to work and bring your next creative idea to life.",
  },
];

const WorkFlow = () => {
  return (
    <section className="bg-slate-50 px-5 py-20 dark:bg-slate-900 sm:px-8 lg:px-10" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">From idea to production in four simple steps.</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Find your space, book your hours, and focus on creating your best work.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950" key={step.number}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">{step.number}</span>
              <h3 className="mt-6 text-lg font-semibold text-slate-950 dark:text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
