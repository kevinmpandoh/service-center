import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center bg-gray-900 text-white"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg" // ganti dengan gambar hero aslinya
          alt="Service Center"
          fill
          className="object-cover object-center opacity-50"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative container mx-auto flex flex-col items-center justify-center text-center py-32 px-6">
        <p className="text-xl mb-2">Partner Andalan Anda</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">
          Layanan Perbaikan <br /> Handphone & Laptop
        </h1>
        <p className="text-gray-200 mb-6 max-w-2xl text-base">
          Percayakan perbaikan Handphone dan Laptop Anda kepada teknisi
          profesional kami. Dapatkan estimasi biaya dan waktu perbaikan secara
          instan!
        </p>
        <Button
          size="lg"
          className={"bg-white text-slate-900 hover:bg-gray-200"}
        >
          <Link href={"#estimate"} className="flex items-center gap-2">
            Cek Estimasi <ArrowRight />
          </Link>
        </Button>
      </div>

      {/* Brand Strip */}
      <div className="relative w-full bg-slate-900 text-white py-6">
        {/* Mobile version - Swiper */}
        <div className="md:hidden px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000} // semakin besar = semakin pelan
          >
            {[
              { name: "oppo", src: "/brands/oppo.png" },
              { name: "samsung", src: "/brands/samsung.png" },
              { name: "apple", src: "/brands/apple.png" },
              { name: "vivo", src: "/brands/vivo.png" },
              { name: "asus", src: "/brands/asus.png" },
              { name: "xiaomi", src: "/brands/xiaomi.png" },
              { name: "realme", src: "/brands/realme.png" },
              { name: "infinix", src: "/brands/infinix.png" },
              { name: "poco", src: "/brands/poco.png" },
              { name: "lenovo", src: "/brands/lenovo.png" },
            ].map((brand) => (
              <SwiperSlide key={brand.name}>
                <div className="h-12 w-full relative flex justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={70}
                    height={40}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop version - Grid */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-8">
          {[
            { name: "oppo", src: "/brands/oppo.png" },
            { name: "samsung", src: "/brands/samsung.png" },
            { name: "apple", src: "/brands/apple.png" },
            { name: "vivo", src: "/brands/vivo.png" },
            { name: "asus", src: "/brands/asus.png" },
            { name: "xiaomi", src: "/brands/xiaomi.png" },
            { name: "realme", src: "/brands/realme.png" },
            { name: "infinix", src: "/brands/infinix.png" },
            { name: "poco", src: "/brands/poco.png" },
            { name: "lenovo", src: "/brands/lenovo.png" },
          ].map((brand) => (
            <div key={brand.name} className="h-14 w-24 relative">
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
