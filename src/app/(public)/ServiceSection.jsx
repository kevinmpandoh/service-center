"use client";

import {
  Wrench,
  Laptop,
  Brush,
  ClipboardList,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Perbaikan Handphone",
    desc: "Proses perbaikan dilakukan dengan cepat dan tepat tanpa mengurangi kualitas layanan.",
    icon: <Wrench className="w-6 h-6 text-black" />,
    image:
      "https://storage.googleapis.com/a1aa/image/bb57d787-7ef5-4d0f-356b-54e872715ed2.jpg",
  },
  {
    title: "Perbaikan Laptop",
    desc: "Proses perbaikan dilakukan dengan cepat dan tepat tanpa mengurangi kualitas layanan.",
    icon: <Laptop className="w-6 h-6 text-black" />,
    image:
      "https://storage.googleapis.com/a1aa/image/8c7e80d9-1b45-47da-b413-5d4a6029175c.jpg",
  },
  {
    title: "Pembersihan Perangkat",
    desc: "Layanan pembersihan perangkat dari debu, kotoran, dan thermal paste agar performa kembali maksimal.",
    icon: <Brush className="w-6 h-6 text-black" />,
    image:
      "https://storage.googleapis.com/a1aa/image/67533f7a-3c00-4a56-12ea-e5b3c0d3557b.jpg",
  },
  {
    title: "Estimasi Perbaikan Perangkat",
    desc: "Estimasi harga diberikan di awal sehingga pelanggan tahu biaya sebelum perbaikan dilakukan.",
    icon: <ClipboardList className="w-6 h-6 text-black" />,
    image:
      "https://storage.googleapis.com/a1aa/image/3708e65c-0ef9-47f1-d0a9-501a083ceba8.jpg",
  },
  {
    title: "Garansi Perbaikan",
    desc: "Garansi layanan diberikan untuk setiap perbaikan sebagai jaminan atas kualitas perbaikan kami.",
    icon: <ShieldCheck className="w-6 h-6 text-black" />,
    image:
      "https://storage.googleapis.com/a1aa/image/42dcab3a-0645-45ec-09e6-74e0c35dfeaf.jpg",
  },
  {
    title: "Beli & Pasang Sparepart",
    desc: "Menggunakan komponen original atau berkualitas tinggi untuk memastikan performa optimal.",
    icon: <Cpu className="w-6 h-6 text-black" />,
    image:
      "https://storage.googleapis.com/a1aa/image/c1ccd8a0-5224-4337-855e-fe316e830b24.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 text-black mb-2">
          <Image src={"/repair-tools.svg"} width={24} height={24} alt="Logo" />
          <h3 className="text-2xl">Services</h3>
        </div>
        <h2 className="font-semibold text-lg sm:text-2xl md:text-3xl">
          Layanan Yang Kami Tawarkan
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-[#0B1727] rounded-xl overflow-hidden p-4 flex flex-col items-center text-center"
          >
            {/* Image */}
            <img
              src={service.image}
              alt={service.title}
              className="rounded-lg w-full h-56 object-cover mb-6"
              height="120"
            />

            {/* Icon Badge */}
            <div className="relative -mt-12 mb-4">
              <div className="bg-white border-2 border-black rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                {service.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-white mb-2 text-sm sm:text-2xl">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-white text-xl sm:text-sm max-w-[260px]">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
