import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full max-w-7xl mx-auto ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex flex-col leading-tight font-bold text-xl">
          <Image src={"/logo1.png"} alt="Logo" width={100} height={100} />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="#home" className="hover:font-semibold">
            Home
          </Link>
          <Link href="#about" className="hover:font-semibold">
            About Us
          </Link>
          <Link href="#services" className="hover:font-semibold">
            Services
          </Link>
          <Link href="#estimate" className="hover:font-semibold">
            Estimate
          </Link>
          <Link href="#galleries" className="hover:font-semibold">
            Gallery
          </Link>
          <Link href="#contact" className="hover:font-semibold">
            Contact Us
          </Link>
        </nav>

        {/* Login button */}
        <Button asChild className="ml-6" size={"lg"}>
          <Link href="/login">
            Login <ArrowRight />{" "}
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
