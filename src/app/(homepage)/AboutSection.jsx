import React from "react";
import { Check, Users } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12 py-20 px-6 items-center"
    >
      {/* ==== Images (Responsive) ==== */}
      <div className="relative flex justify-center items-center w-full ">
        {/* Image 1 */}
        <div className="relative w-64 h-72 sm:w-80 sm:h-96 md:w-[380px] md:h-[440px] ">
          <Image
            src="/about1.png"
            alt="Repairing laptop"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 2 (overlay) */}
        <div
          className="absolute bottom-[-40px] right-[-15px] sm:bottom-[-50px] sm:right-[-20px] md:bottom-[-60px] md:right-[-30px] 
                        w-40 h-60 sm:w-52 sm:h-72 md:w-[250px] md:h-[380px] 
                          "
        >
          <Image
            src="/about3.png"
            alt="Technician"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ==== Content Section ==== */}
      <div className="mt-16 md:mt-0 text-justify md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600 mb-3">
          <Users className="w-5 h-5" />
          <span className="text-xl md:text-2xl font-medium">About Us</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
          Kami Menyediakan Layanan Perbaikan Berkualitas
        </h2>

        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          A+ Service Center adalah pusat layanan perbaikan handphone dan laptop
          terpercaya di Manado. Kami hadir untuk memberikan:
        </p>

        <ul className="text-base md:text-lg space-y-2 text-gray-700 mb-6">
          <li className="flex items-center justify-start md:justify-start gap-2">
            <Check /> Solusi Cepat & Akurat
          </li>
          <li className="flex items-center justify-start md:justify-start gap-2">
            <Check /> Teknisi Profesional
          </li>
          <li className="flex items-center justify-start md:justify-start gap-2">
            <Check /> Estimasi Transparan
          </li>
        </ul>

        {/* Experience Badges */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <span className="px-4 py-2 border border-slate-800 rounded-2xl text-base md:text-lg font-medium">
            8+ Tahun Pengalaman
          </span>
          <span className="px-4 py-2 border border-slate-800 rounded-2xl text-base md:text-lg font-medium">
            10.000+ Perangkat Diperbaiki
          </span>
        </div>
      </div>
    </section>
  );
}
