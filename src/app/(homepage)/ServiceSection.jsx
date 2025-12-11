"use client";

import Image from "next/image";

const services = [
  {
    title: "Perbaikan Handphone",
    desc: "Proses perbaikan handphone yang dilakukan dengan cepat dan tepat tanpa mengurangi kualitas layanan.",
    icon: (
      <Image
        src={"/repair-phone.svg"}
        width={90}
        height={90}
        alt="Logo"
        className="w-10 h-10 text-black"
      />
    ),
    image: "/service1.png",
  },
  {
    title: "Perbaikan Laptop",
    desc: "Proses perbaikan laptop yang dilakukan dengan cepat dan tepat tanpa mengurangi kualitas layanan.",
    icon: (
      <Image
        src={"/repair-pc.svg"}
        width={90}
        height={90}
        alt="Logo"
        className="w-12 h-12 text-black"
      />
    ),
    image: "/service2.png",
  },
  {
    title: "Pembersihan Perangkat",
    desc: "Layanan pembersihan perangkat dari debu, kotoran, dan penggantian thermal paste agar performa kembali maksimal.",
    icon: (
      <Image
        src={"/clean-service.svg"}
        width={90}
        height={90}
        alt="Logo"
        className="w-12 h-12 text-black"
      />
    ),
    image: "/service3.png",
  },
  {
    title: "Estimasi Perbaikan Perangkat",
    desc: "Estimasi biaya dan estimasi waktu perbaikan diberikan di awal sehingga pelanggan tahu biaya dan waktu yang dibutuhkan sebelum perbaikan dilakukan.",
    icon: (
      <Image
        src={"/estimate.png"}
        width={90}
        height={90}
        alt="Logo"
        className="w-14 h-14 text-black"
      />
    ),
    image: "/service4.png",
  },
  {
    title: "Garansi Perbaikan",
    desc: "Garansi layanan diberikan untuk setiap perbaikan sebagai jaminan atas kualitas perbaikan kami.",
    icon: (
      <Image
        src={"/warranty.svg"}
        width={90}
        height={90}
        alt="Logo"
        className="w-12 h-12 text-black"
      />
    ),
    image: "/service5.png",
  },
  {
    title: "Beli & Pasang Sparepart",
    desc: "Menggunakan komponen original atau berkualitas tinggi untuk memastikan performa optimal.",
    icon: (
      <Image
        src={"/service.svg"}
        width={90}
        height={90}
        alt="Logo"
        className="w-12 h-12 text-black"
      />
    ),
    image: "/service6.png",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="md:max-w-7xl max-w-6xl  mx-auto px-4 py-12"
    >
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
            <h3 className="font-semibold text-white mb-2 text-lg sm:text-2xl">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-white text-sm sm:text-base leading-relaxed max-w-[260px]">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
