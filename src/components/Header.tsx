"use client";

import { useEffect, useState } from "react";
import { Menu, X, BookOpen, Layers, Activity, Maximize2 } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "EDOs", href: "#edo", icon: BookOpen },
    { label: "Fourier", href: "#fourier", icon: Layers },
    { label: "Laplace", href: "#laplace", icon: Activity },
    { label: "Simulación 3D", href: "#3d", icon: Maximize2 },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-dove shadow-xl"
          : "bg-paper border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-universalsansdisplay font-medium text-lg tracking-tighter text-jet-ink">
            MAT415
          </span>
          <span className="font-geistmono text-[10px] bg-sand border border-dove/40 text-steel px-1.5 py-0.5 rounded-full">
            v2.16
          </span>
        </a>

        {/* Center Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] font-medium text-fog hover:text-jet-ink transition-colors duration-200 focus:underline focus:outline-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/UES-Community/mat415-2016"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full border border-dove text-[12px] font-medium bg-paper text-jet-ink hover:bg-cream transition-colors duration-200"
          >
            Repositorio
          </a>
          <a
            href="#laboratorio"
            className="bg-jet-ink text-paper px-4 py-1.5 rounded-full text-[13px] font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Explorar Lab
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-steel hover:text-jet-ink focus:outline-none"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-dove bg-paper px-6 py-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 py-1.5 text-sm font-medium text-fog hover:text-jet-ink transition-colors"
                >
                  <Icon className="w-4 h-4 text-pewter" />
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-dove/40">
            <a
              href="https://github.com/UES-Community/mat415-2016"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 rounded-full border border-dove text-xs font-medium bg-paper text-jet-ink hover:bg-cream transition-colors"
            >
              Repositorio
            </a>
            <a
              href="#laboratorio"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 rounded-full bg-jet-ink text-paper text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Explorar Lab
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
