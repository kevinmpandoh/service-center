import React from "react";
import { Check, Users } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="container max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 py-24 px-6 items-center"
    >
      {/* Images */}
      <div className="relative flex justify-center items-start">
        <div className="w-[406px] h-[461px] -left-25 relative overflow-hidden">
          <Image
            src="/about1.png" // ganti gambar
            alt="Repairing laptop"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[260px] h-[395px] absolute -bottom-10 right-10 overflow-hidden">
          <Image
            src="/about2.png" // ganti gambar
            alt="Technician"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-2 text-slate-600 mb-3">
          <Users className="w-5 h-5" />
          <span className="text-2xl font-medium ">About Us</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug pr-4">
          Kami Menyediakan Layanan Perbaikan Berkualitas
        </h2>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          A+ Service Center adalah pusat layanan perbaikan handphone dan laptop
          terpercaya di Manado. Kami hadir untuk memberikan:
        </p>
        <ul className="text-xl space-y-2 text-gray-700 mb-6">
          <li className="flex items-center gap-2">
            <Check /> Solusi Cepat & Akurat
          </li>
          <li className="flex items-center gap-2">
            <Check />
            Teknisi Profesional
          </li>
          <li className="flex items-center gap-2">
            <Check />
            Estimasi Transparan
          </li>
        </ul>
        <div className="flex gap-4">
          <span className="px-4 py-2 border border-slate-800 rounded-2xl text-sm font-medium">
            8+ Tahun Pengalaman
          </span>
          <span className="px-4 py-2 border border-slate-800 rounded-2xl text-sm font-medium">
            10.000+ Perangkat Diperbaiki
          </span>
        </div>
      </div>
    </section>
  );
}
