"use client";

import { useState } from "react";
import ReviewCard from "@/components/cards/reviewCard";
import { toast } from "@/components/ui/toast";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
const inputClassName = "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
const labelClassName = "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function StudioReviews({ studioId, initialReviews, rating }) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const review = {
      name: formData.get("name"),
      image: formData.get("image"),
      rating: Number(formData.get("rating")),
      text: formData.get("text"),
      studioId,
      userEmail: user?.email || "",
      userName: user?.name || formData.get("name"),
    };

    try {
      const response = await fetch(`${apiUrl}/studios/reviews`, {
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) throw new Error("Unable to submit review");

      const reviewsResponse = await fetch(`${apiUrl}/studios/reviews/${studioId}`);
      const updatedReviews = reviewsResponse.ok ? await reviewsResponse.json() : [...reviews, review];
      setReviews(updatedReviews);
      form.reset();
      toast.add({ title: "Review submitted successfully", type: "success" });
    } catch (error) {
      toast.add({ title: "Review submission failed", description: error.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Community feedback</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Reviews</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Average rating: ★ {rating}</p>
      </div>

      {reviews.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {reviews.map((review, index) => <ReviewCard key={review._id || `${review.name}-${index}`} review={review} />)}
        </div>
      ) : (
        <p className="mt-6 rounded-lg bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">No reviews yet. Be the first to review this space.</p>
      )}

      <form className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Write a review</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div><label className={labelClassName} htmlFor="review-name">Name</label><input className={inputClassName} id="review-name" name="name" placeholder="Your name" required type="text" /></div>
          <div><label className={labelClassName} htmlFor="review-image">Profile image URL</label><input className={inputClassName} id="review-image" name="image" placeholder="https://example.com/profile.jpg" type="url" /></div>
          <div><label className={labelClassName} htmlFor="review-rating">Rating (0–5)</label><input className={inputClassName} id="review-rating" max="5" min="0" name="rating" placeholder="5" required step="0.1" type="number" /></div>
          <div className="sm:col-span-2"><label className={labelClassName} htmlFor="review-text">Review</label><textarea className={`${inputClassName} min-h-32 resize-y`} id="review-text" name="text" placeholder="Share your experience" required /></div>
        </div>
        <button className="mt-5 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" disabled={submitting} type="submit">{submitting ? "Submitting..." : "Submit Review"}</button>
      </form>
    </section>
  );
}
