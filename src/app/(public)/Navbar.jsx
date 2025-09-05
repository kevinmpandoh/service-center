import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full max-w-7xl mx-auto bg-white ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex flex-col leading-tight font-bold text-xl">
          <Image src={"/logo1.png"} alt="Logo" width={100} height={100} />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="#home">Home</Link>
          <Link href="#about">About Us</Link>
          <Link href="#services">Services</Link>
          <Link href="#estimate">Estimate</Link>
          <Link href="#contact">Contact Us</Link>
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
