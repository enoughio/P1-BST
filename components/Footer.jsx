"use client";

import { groupPhoto } from "@/lib/data/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Linkedin, Facebook, Instagram, YoutubeIcon } from 'lucide-react';


const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/vanguard" || pathname.startsWith("/vanguard/")) {
    return null;
  }

  return (
    <footer className="border-t border-[#E7DCCF] bg-gradient-to-b from-[#F6F1E7]/60 to-[#E7D8C6]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.6fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight">Speak</h2>
              <div className="mt-2 h-1 w-20 rounded-full bg-[#D1BFA9]" />
            </div>
            <p className="text-sm text-[#5B4E44] max-w-md">
              Bharat Storytellers helps people find their voice through storytelling, practice, and community.
              Join the platform that turns ideas into confident delivery.
            </p>
            <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-[#EFE4D6] bg-white/80">
              <Image
                src={groupPhoto}
                width={420}
                height={200}
                className="h-36 w-full object-cover"
                alt="Community on stage"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A6D4D]">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#5B4E44]">
                <li><Link className="hover:text-[#1F1B16]" href="/">Home</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/about">About Us</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/programs">Programs</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/events">Events</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A6D4D]">Community</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#5B4E44]">
                <li><Link className="hover:text-[#1F1B16]" href="/membership">Become a member</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/findaclub">Find a Club</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/resources">Resources</Link></li>
                <li><Link className="hover:text-[#1F1B16]" href="/sponsorship">Sponsorship</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A6D4D]">Connect</h3>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/bharatstorytellers/" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-[#1F1B16]" />
              </Link>
              <Link href="https://www.linkedin.com/company/bharat-storytellers/posts/?feedView=all" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-[#1F1B16]" />
              </Link>
              <Link href="https://www.instagram.com/bhopalstorytellers/" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-[#1F1B16]" />
              </Link>
              <Link href="/home" aria-label="YouTube">
                <YoutubeIcon className="h-5 w-5 text-[#1F1B16]" />
              </Link>
            </div>
            <p className="text-sm text-[#5B4E44]">contact@Bharatstorytellers.com</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#E1D3C1] pt-6 text-xs text-[#7A6B5B] md:flex-row">
          <p>Copyright © Bharat Storytellers. All rights reserved.</p>
          <p>Made with ♥ in India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
