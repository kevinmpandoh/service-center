"use client";

import ServicesSection from "./ServiceSection";
import EstimateSection from "./EstimateSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import GallerySection from "./GallerySection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutSection />

      <ServicesSection />
      <EstimateSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
