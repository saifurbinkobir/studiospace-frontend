import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt={review.name} src={review.image} />
          <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{review.name}</h3>
          <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">★ {review.rating}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{review.text}</p>
    </article>
  );
}
