"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  "/gallery/repair1.png",
  "/gallery/repair2.png",
  "/gallery/repair3.png",
  "/gallery/repair4.png",
  "/gallery/repair5.png",
  "/gallery/repair6.png",
  "/gallery/repair7.png",
  "/gallery/repair8.png",
  "/gallery/repair9.png",
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (src) => {
    setSelectedImage(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxOpen(false);
  };
  return (
    <section id="galleries" className="max-w-6xl mx-auto px-4 py-12 w-full ">
      {/* Section Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 text-black mb-2">
          <Image src={"/gallery-icon.svg"} width={24} height={24} alt="Logo" />
          <h3 className="text-2xl">Gallery</h3>
        </div>
        <h2 className="font-semibold text-lg sm:text-2xl md:text-3xl">
          Galeri Perbaikan Perangkat
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((src, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(src)}
            className="relative w-full h-64 rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition duration-300"
          >
            <Image
              src={src}
              alt={`Gallery ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full p-4">
            <Image
              src={selectedImage}
              alt="Selected"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={closeLightbox}
              className=" cursor-pointer absolute top-4 right-4 bg-white text-black px-3 py-3 rounded-full shadow-md"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
