import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-2xl overflow-hidden shadow-xl border border-[var(--primary)]/20">
      {/* Hero section left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-20 px-8">
        <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div>
                <p className="font-semibold text-sm md:text-base text-[var(--primary)] tracking-wider">OUR BESTSELLERS</p>
            </div>
            <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-[var(--text)] animate-fade-in">
              Latest <span className="text-[var(--primary)]">Arrivals</span>
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-3">
                <p className="font-bold text-sm md:text-base text-[var(--accent)] tracking-wider">SHOP NOW</p>
                <div className="w-12 h-1 bg-[var(--accent)] rounded-full"></div>
            </div>
        </div>
      </div>
      {/* Hero right section  */}
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <img src={assets.hero_img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Hero Image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
