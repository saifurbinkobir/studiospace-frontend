"use client";

import Link from "next/link";
import Slider from "react-slick";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
    eyebrow: "Make room for your next idea",
    title: "Find a space that brings your vision to life.",
    description: "Discover inspiring studios, stages, and creative spaces made for the way you work.",
  },
  {
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1800&q=85",
    eyebrow: "Sound made simple",
    title: "The right studio for every story you want to tell.",
    description: "Book podcast lounges, recording suites, and production-ready rooms from trusted hosts.",
  },
  {
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85",
    eyebrow: "Create without limits",
    title: "Your next production starts with the perfect setting.",
    description: "Explore flexible, transparent studio rentals for photoshoots, films, music, and more.",
  },
];

function PreviousArrow({ onClick }) {
  return <button aria-label="Previous banner slide" className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-950/20 bg-white/70 text-2xl text-slate-950 hover:bg-white sm:left-8 dark:border-white/30 dark:bg-slate-950/40 dark:text-white dark:hover:bg-slate-950/70" onClick={onClick} type="button">‹</button>;
}

function NextArrow({ onClick }) {
  return <button aria-label="Next banner slide" className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-950/20 bg-white/70 text-2xl text-slate-950 hover:bg-white sm:right-8 dark:border-white/30 dark:bg-slate-950/40 dark:text-white dark:hover:bg-slate-950/70" onClick={onClick} type="button">›</button>;
}

export default function BannerSection() {
  return (
    <section aria-label="Featured StudioSpace spaces" className="bg-white dark:bg-slate-950">
      <Slider arrows infinite nextArrow={<NextArrow />} prevArrow={<PreviousArrow />} slidesToScroll={1} slidesToShow={1} speed={500}>
        {slides.map((slide) => (
          <div key={slide.title}>
            <div className="relative flex min-h-130 items-center bg-cover bg-center px-6 py-20 sm:px-12 lg:min-h-160 lg:px-20" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/65" />
              <div className="relative z-10 mx-auto w-full max-w-7xl text-slate-950 dark:text-white">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">{slide.eyebrow}</p>
                <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">{slide.title}</h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-200 sm:text-lg">{slide.description}</p>
                <Link className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400" href="/studios">Explore Studios</Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
