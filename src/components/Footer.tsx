export default function Footer() {
  return (
    <footer className="w-full bg-paper border-t border-dove mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left info */}
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-universalsansdisplay font-medium text-sm tracking-tight text-jet-ink">
              MAT415 — Matemática IV
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sprout animate-pulse" />
          </div>
          <p className="text-[12px] text-fog max-w-sm">
            Laboratorio de simulación interactiva diseñado para el programa académico del Ciclo II.
          </p>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-6 text-[12px] font-medium text-fog">
          <a href="#" className="hover:text-jet-ink transition-colors">Inicio</a>
          <a href="https://github.com/UES-Community/mat415-2016" target="_blank" rel="noopener noreferrer" className="hover:text-jet-ink transition-colors">GitHub</a>
          <a href="#laboratorio" className="hover:text-jet-ink transition-colors">Simuladores</a>
        </div>

        {/* Right copyright */}
        <div className="text-right text-[11px] font-geistmono text-pewter">
          <span>&copy; {new Date().getFullYear()} UES-Community. Licencia MIT.</span>
        </div>
      </div>
    </footer>
  );
}
