"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className=" py-28 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  items-center">
        {/* Kiri: Info Kontak */}

        <div className="space-y-6 px-6">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-2xl">
            <Image src={"/contactIcon.svg"} width={24} height={24} alt="Logo" />
            Contact Us
          </div>

          <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-snug">
            Saat Anda Membutuhkan <br /> Perbaikan Kami Selalu Ada
          </h2>

          {/* Jam Operasional */}

          <div className="max-w-xs flex flex-col space-y-2 border-b-2 rounded-2xl border-slate-800 px-6 py-2">
            <span className="text-2xl font-semibold text-gray-900">
              Jam Operasional
            </span>

            <div className="space-y-2 mb-6">
              <p className="text-xl font-semibold text-gray-900">• Manado</p>
              <div className="grid grid-cols-2 text-lg">
                <p className="text-gray-700">Senin - Sabtu</p>
                <p className="text-gray-700 font-semibold">9 AM - 9 PM</p>
              </div>
              <div className="grid grid-cols-2 text-lg">
                <p className="text-gray-700">Minggu</p>
                <p className="text-gray-700 font-semibold">12 PM - 9 PM</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-900">• Tomohon</p>
              <div className="grid grid-cols-2 text-lg">
                <p className="text-gray-700">Senin - Sabtu</p>
                <p className="text-gray-700 font-semibold">10 AM - 10 PM</p>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="flex flex-col space-y-2 pt-4 px-6">
            <span className="text-2xl font-semibold text-gray-900">Lokasi</span>
            <div className="flex items-center gap-2 text-gray-700 text-lg font-normal">
              <MapPin size={18} /> Lokasi
              <span>(A+) Pusat Service Handphone-Laptop</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-lg font-normal">
              <MapPin size={18} />
              <span>A+ Service Handphone Tomohon</span>
            </div>
          </div>

          {/* Konsultasi */}
          <div className="flex flex-col space-y-2 pt-4 px-6 text-2xl">
            <span className="text-xl font-semibold text-gray-900">
              Konsultasi
            </span>
            <div className="flex items-center gap-2 text-gray-700 text-lg font-normal">
              <Phone size={18} />
              <span>0812345678910</span>
            </div>
          </div>
        </div>

        {/* Kanan: Map */}
        <div className="space-y-6">
          {/* Map Manado */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.2797294384811!2d124.83640747879092!3d1.486464525597828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x328775ab8a9f6eed%3A0xafd583e55739164d!2s(A%2B)%20Pusat%20Service%20Handphone-Laptop!5e0!3m2!1sid!2sid!4v1757040948900!5m2!1sid!2sid"
              width="100%"
              height="400"
              allowFullScreen
              loading="lazy"
              className="border-0 w-full h-[320px]"
            ></iframe>
          </div>

          {/* Map Tomohon */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.189796408985!2d124.83872453690515!3d1.3233064150217135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876d85ded64ac7%3A0xfd192917c73f9032!2sA%2B%20Service%20Handphone%20Tomohon!5e0!3m2!1sid!2sid!4v1758353596188!5m2!1sid!2sid"
              width="600"
              height="450"
              className="border-0 w-full h-[320px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
