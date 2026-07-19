"use client";

import { useEffect, useState } from "react";
import { BookOpen, Layers, Activity, Maximize2, Menu, X, GitBranch, FlaskConical } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";

const NAV_ITEMS = [
  { label: "EDOs", href: "#edo", icon: BookOpen },
  { label: "Fourier", href: "#fourier", icon: Layers },
  { label: "Laplace", href: "#laplace", icon: Activity },
  { label: "Simulación 3D", href: "#3d", icon: Maximize2 },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-paper/80 backdrop-blur-md border-b border-dove shadow-xs"
          : "bg-paper border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 group focus:outline-none">
          <span className="font-universalsansdisplay font-medium text-lg tracking-tighter text-jet-ink">
            MAT415
          </span>
          <span className="font-geistmono text-[10px] bg-sand border border-dove/40 text-steel px-2 py-0.5 rounded-full leading-none">
            v2.16
          </span>
        </a>

        {/* Radix Desktop Navigation */}
        <NavigationMenu.Root className="hidden md:flex items-center">
          <NavigationMenu.List className="flex items-center gap-6 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <NavigationMenu.Item key={item.label}>
                <NavigationMenu.Link
                  href={item.href}
                  className="text-[14px] font-medium text-fog hover:text-jet-ink transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-ink/20 rounded-md px-2 py-1"
                >
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://github.com/UES-Community/mat415-2016"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dove text-[12px] font-medium bg-paper text-jet-ink hover:bg-cream transition-colors duration-200"
          >
            <GitBranch className="w-3.5 h-3.5" />
            Repositorio
          </a>
          <a
            href="#laboratorio"
            className="flex items-center gap-1.5 bg-jet-ink text-paper px-4 py-1.5 rounded-full text-[13px] font-medium hover:opacity-90 transition-opacity duration-200"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Explorar Lab
          </a>
        </div>

        {/* Radix Mobile Navigation Drawer */}
        <Dialog.Root open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden p-2 rounded-md text-steel hover:text-jet-ink hover:bg-sand/50 transition-colors focus:outline-none"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-jet-ink/10 backdrop-blur-xs md:hidden" />
            <Dialog.Content
              aria-label="Menú de navegación móvil"
              className="fixed top-16 left-0 right-0 z-50 bg-paper border-b border-dove px-6 py-5 flex flex-col gap-4 shadow-lg md:hidden animate-in fade-in slide-in-from-top-2 duration-200 focus:outline-none"
            >
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium text-fog hover:text-jet-ink hover:bg-sand/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-pewter shrink-0" />
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-2.5 pt-3 border-t border-dove/50">
                <a
                  href="https://github.com/UES-Community/mat415-2016"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center py-2 rounded-full border border-dove text-xs font-medium bg-paper text-jet-ink hover:bg-cream transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  Repositorio
                </a>
                <a
                  href="#laboratorio"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center py-2 rounded-full bg-jet-ink text-paper text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Explorar Lab
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
