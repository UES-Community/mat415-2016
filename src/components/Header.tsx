"use client";

import { useEffect, useState } from "react";
import { BookOpen, Layers, Activity, Maximize2, Menu, X, GitBranch, FlaskConical, Atom } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";

const NAV_ITEMS = [
  { label: "EDOs", href: "#edo", icon: BookOpen, description: "Ecuaciones Diferenciales Ordinarias" },
  { label: "Fourier", href: "#fourier", icon: Layers, description: "Series de Fourier & Armónicos" },
  { label: "Laplace", href: "#laplace", icon: Activity, description: "Transformada & Respuestas de Escalón" },
  { label: "Simulación 3D", href: "#3d", icon: Maximize2, description: "Campos Vectoriales & Espacio 3D" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-paper/90 backdrop-blur-md border-dove/80 shadow-xs"
          : "bg-paper/95 backdrop-blur-xs border-dove/40"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[64px] py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-ink/20 rounded-lg py-1 px-1.5 -ml-1.5 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-jet-ink flex items-center justify-center text-paper group-hover:scale-105 transition-transform duration-200 shadow-xs">
            <Atom className="w-4 h-4 text-sunbeam" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-universalsansdisplay font-bold text-lg tracking-tight text-jet-ink group-hover:text-steel transition-colors">
                MAT415
              </span>
              <span className="font-geistmono text-[10px] font-semibold bg-sand/80 border border-dove/60 text-steel px-2 py-0.5 rounded-full leading-none">
                v2.16
              </span>
            </div>
            <span className="text-[10px] text-fog font-medium tracking-tight -mt-0.5 hidden sm:block">
              Laboratorio Interactivo
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <NavigationMenu.Root className="hidden md:flex items-center">
          <NavigationMenu.List className="flex items-center gap-1 list-none m-0 p-0 bg-sand/30 border border-dove/40 p-1 rounded-xl">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavigationMenu.Item key={item.label}>
                  <NavigationMenu.Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-xs font-semibold text-steel hover:text-jet-ink hover:bg-paper rounded-lg px-3 py-1.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-ink/20 shadow-none hover:shadow-xs"
                  >
                    <Icon className="w-3.5 h-3.5 text-fog group-hover:text-jet-ink transition-colors" />
                    <span>{item.label}</span>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/UES-Community/mat415-2016"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-dove text-xs font-semibold bg-paper text-jet-ink hover:bg-sand/50 hover:border-pewter transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-ink/20 shadow-2xs"
          >
            <GitBranch className="w-3.5 h-3.5 text-fog" />
            <span>Repositorio</span>
          </a>
          <a
            href="#laboratorio"
            className="flex items-center gap-1.5 bg-jet-ink text-paper px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-charcoal hover:shadow-sm active:scale-98 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-ink/30"
          >
            <FlaskConical className="w-3.5 h-3.5 text-sunbeam" />
            <span>Explorar Lab</span>
          </a>
        </div>

        {/* Mobile Navigation Trigger Button */}
        <Dialog.Root open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden p-2 rounded-xl text-steel hover:text-jet-ink bg-sand/40 hover:bg-sand border border-dove/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-ink/20"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </Dialog.Trigger>

          {/* Mobile Drawer Content */}
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-jet-ink/20 backdrop-blur-xs md:hidden animate-in fade-in duration-200" />
            <Dialog.Content
              aria-label="Menú de navegación móvil"
              className="fixed top-16 inset-x-4 z-50 bg-paper/98 backdrop-blur-lg border border-dove rounded-2xl p-5 shadow-xl md:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 focus:outline-none"
            >
              <div className="flex items-center justify-between border-b border-dove/50 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-fog">Navegación</span>
                <span className="text-[10px] font-geistmono bg-sand px-2 py-0.5 rounded-full text-steel font-medium">MAT415</span>
              </div>

              <nav className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold text-steel hover:text-jet-ink hover:bg-sand/50 transition-all border border-transparent hover:border-dove/40"
                    >
                      <div className="w-7 h-7 rounded-lg bg-sand/60 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-jet-ink" />
                      </div>
                      <div className="flex flex-col">
                        <span>{item.label}</span>
                        <span className="text-[11px] text-fog font-normal">{item.description}</span>
                      </div>
                    </a>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-2 pt-3 border-t border-dove/50">
                <a
                  href="https://github.com/UES-Community/mat415-2016"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center py-2.5 rounded-xl border border-dove text-xs font-semibold bg-paper text-jet-ink hover:bg-sand/40 transition-colors shadow-2xs"
                >
                  <GitBranch className="w-4 h-4 text-fog" />
                  <span>Repositorio GitHub</span>
                </a>
                <a
                  href="#laboratorio"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center py-2.5 rounded-xl bg-jet-ink text-paper text-xs font-semibold hover:bg-charcoal transition-colors shadow-xs"
                >
                  <FlaskConical className="w-4 h-4 text-sunbeam" />
                  <span>Explorar Laboratorio</span>
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
