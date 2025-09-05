"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className=" py-28 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  items-center">
        {/* Kiri: Info Kontak */}

        <div className="space-y-6 px-6">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-2xl">
            <Mail size={20} />
            Contact Us
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-snug">
            Saat Anda Membutuhkan <br /> Perbaikan Kami Selalu Ada
          </h2>

          {/* Jam Operasional */}

          <div className="max-w-xs flex flex-col space-y-2 border-b-2 rounded-2xl border-slate-800 px-6 py-2">
            <span className="text-xl font-semibold text-gray-900">
              Jam Operasional
            </span>
            <div className=" flex items-center justify-between text-gray-700 text-lg font-normal  pb-1">
              <span>Senin - Minggu</span>
              <span>9 AM - 9 PM</span>
            </div>
          </div>

          {/* Lokasi */}
          <div className="flex flex-col space-y-2 pt-4 px-6">
            <span className="text-xl font-semibold text-gray-900">Lokasi</span>
            <div className="flex items-center gap-2 text-gray-700 text-base font-normal">
              <MapPin size={18} /> Lokasi
              <span>(A+) Pusat Service Handphone-Laptop</span>
            </div>
          </div>

          {/* Konsultasi */}
          <div className="flex flex-col space-y-2 pt-4 px-6">
            <span className="text-xl font-semibold text-gray-900">
              Konsultasi
            </span>
            <div className="flex items-center gap-2 text-gray-700 text-base font-normal">
              <Phone size={18} />
              <span>0812345678910</span>
            </div>
          </div>
        </div>

        {/* Kanan: Map */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.2797294384811!2d124.83640747879092!3d1.486464525597828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x328775ab8a9f6eed%3A0xafd583e55739164d!2s(A%2B)%20Pusat%20Service%20Handphone-Laptop!5e0!3m2!1sid!2sid!4v1757040948900!5m2!1sid!2sid"
            width="100%"
            height="690"
            allowFullScreen=""
            loading="lazy"
            className="border-0 w-full h-[350px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
