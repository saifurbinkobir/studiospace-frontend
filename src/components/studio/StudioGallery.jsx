"use client";

import Image from "next/image";
import Slider from "react-slick";

function PreviousArrow({ onClick }) {
  return <button aria-label="Previous studio image" className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/60 text-2xl text-white hover:bg-slate-950/80" onClick={onClick} type="button">‹</button>;
}

function NextArrow({ onClick }) {
  return <button aria-label="Next studio image" className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/60 text-2xl text-white hover:bg-slate-950/80" onClick={onClick} type="button">›</button>;
}

export default function StudioGallery({ images, title }) {
  const galleryImages = Array.isArray(images) ? images : [images];

  return (
    <div className="overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
      <Slider
        arrows={galleryImages.length > 1}
        customPaging={(index) => <button aria-label={`Go to image ${index + 1}`} type="button" />}
        dots={galleryImages.length > 1}
        infinite={galleryImages.length > 1}
        nextArrow={<NextArrow />}
        prevArrow={<PreviousArrow />}
        slidesToScroll={1}
        slidesToShow={1}
        speed={500}
      >
        {galleryImages.map((image, index) => (
          <div key={image}>
            <Image alt={`${title} image ${index + 1}`} className="h-[360px] w-full object-cover sm:h-[520px]" height={900} priority={index === 0} src={image} width={1200} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
