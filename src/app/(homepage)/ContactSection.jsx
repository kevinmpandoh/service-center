"use client";

import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT: Contact Info */}
        <div className="space-y-8 px-2 sm:px-6">
          {/* Section Header */}
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-2xl">
            <Image src={"/contactIcon.svg"} width={28} height={28} alt="Logo" />
            Contact Us
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 leading-snug">
            Saat Anda Membutuhkan <br /> Perbaikan Kami Selalu Ada
          </h2>

          {/* JAM OPERASIONAL */}
          <div className="max-w-sm border-b-2 border-slate-700 pb-6">
            <span className="text-xl sm:text-2xl font-semibold text-gray-900 block mb-4">
              Jam Operasional
            </span>

            {/* Manado */}
            <div className="mb-4">
              <p className="text-lg sm:text-xl font-semibold text-gray-900">
                • Manado
              </p>
              <div className="grid grid-cols-2 text-base sm:text-lg mt-1">
                <p className="text-gray-700">Senin - Sabtu</p>
                <p className="text-gray-800 font-semibold">09.00 – 21.00</p>
                <p className="text-gray-700">Minggu</p>
                <p className="text-gray-800 font-semibold">12.00 – 21.00</p>
              </div>
            </div>

            {/* Tomohon */}
            <div>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">
                • Tomohon
              </p>
              <div className="grid grid-cols-2 text-base sm:text-lg mt-1">
                <p className="text-gray-700">Senin - Sabtu</p>
                <p className="text-gray-800 font-semibold">10.00 – 22.00</p>
              </div>
            </div>
          </div>

          {/* LOKASI */}
          <div>
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">
              Lokasi
            </span>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-2 text-gray-800 text-base sm:text-lg">
                <MapPin size={20} className="text-red-500" />
                <span>A+ Service Handphone-Laptop Manado</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800 text-base sm:text-lg">
                <MapPin size={20} className="text-red-500" />
                <span>A+ Service Handphone Tomohon</span>
              </div>
            </div>
          </div>

          {/* KONSULTASI */}
          <div>
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">
              Konsultasi
            </span>
            <div className="flex items-center gap-2 mt-2 text-gray-800 text-lg">
              <Phone size={20} className="text-green-600" />
              <span>0811-4377-700</span>
            </div>
          </div>
        </div>

        {/* RIGHT: MAP */}
        <div className="space-y-10">
          {/* MAP MANADO */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.2797294384811!2d124.83640747879092!3d1.486464525597828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x328775ab8a9f6eed%3A0xafd583e55739164d!2s(A%2B)%20Pusat%20Service%20Handphone-Laptop!5e0!3m2!1sid!2sid!4v1757040948900!5m2!1sid!2sid"
              allowFullScreen
              loading="lazy"
              className="w-full h-[280px] sm:h-[320px] md:h-[360px] border-0"
            ></iframe>
          </div>

          {/* MAP TOMOHON */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.189796408985!2d124.83872453690515!3d1.3233064150217135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876d85ded64ac7%3A0xfd192917c73f9032!2sA%2B%20Service%20Handphone%20Tomohon!5e0!3m2!1sid!2sid!4v1758353596188!5m2!1sid!2sid"
              allowFullScreen
              loading="lazy"
              className="w-full h-[280px] sm:h-[320px] md:h-[360px] border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
