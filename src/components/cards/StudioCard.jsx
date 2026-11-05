import Image from "next/image";
import Link from "next/link";

const StudioCard = ({ studio }) => {
  return (
    <div>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Image
          alt={studio.title}
          className="h-56 w-full object-cover"
          height={360}
          loading="lazy"
          src={studio.imageUrl}
          width={600}
        />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              {studio.category}
            </span>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              ★ {studio.rating}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
            {studio.title}
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {studio.location}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <p className="text-base font-semibold text-slate-950 dark:text-white">
              ${studio.hourlyRate}{" "}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                / hr
              </span>
            </p>
            <Link
              className="rounded-full border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-700 transition-colors hover:bg-cyan-600 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950"
              href={`/studios/${studio._id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default StudioCard;