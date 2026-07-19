"use client";

import { useState, useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnitCard from "@/components/UnitCard";
import MathFormula from "@/components/MathFormula";
import TerminalCodeBlock from "@/components/TerminalCodeBlock";
import FourierPlot from "@/components/FourierPlot";
import LaplaceStepResponse from "@/components/LaplaceStepResponse";
import VectorField3D from "@/components/VectorField3D";
import { Info, Sparkles, Cpu, Award } from "lucide-react";

// --- Sub-component for Unit 1: Logistic Growth EDO Simulator ---
function LogisticGrowthSimulator() {
  const [r, setR] = useState<number>(0.6); // growth rate
  const [K, setK] = useState<number>(50.0); // capacity
  const [y0, setY0] = useState<number>(5.0); // initial value

  const data = useMemo(() => {
    const points = [];
    const tMax = 15;
    const steps = 60;
    const dt = tMax / steps;
    
    let t = 0;
    let y = y0;

    for (let i = 0; i <= steps; i++) {
      points.push({
        t: parseFloat(t.toFixed(2)),
        Poblacion: parseFloat(y.toFixed(3)),
      });

      // Euler method: dy = r * y * (1 - y/K) * dt
      const dy = r * y * (1 - y / K) * dt;
      y = Math.max(0, y + dy);
      t += dt;
    }

    return points;
  }, [r, K, y0]);

  return (
    <div className="p-5 md:p-6 bg-paper flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dove/40 pb-3">
        <h4 className="text-sm font-semibold text-jet-ink">Modelo Poblacional Logístico</h4>
        <div className="text-xs text-fog font-geistmono">dy/dt = r * y * (1 - y/K)</div>
      </div>

      <div className="h-[200px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="t" stroke="#858585" fontSize={10} />
            <YAxis stroke="#858585" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-cream)",
                borderColor: "var(--color-dove)",
                fontSize: "11px",
                fontFamily: "var(--font-geistmono)",
                color: "var(--color-jet-ink)",
              }}
            />
            <Line type="monotone" dataKey="Poblacion" stroke="var(--color-jet-ink)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-geistmono text-steel flex justify-between">
            <span>Tasa de crecimiento (r):</span>
            <span className="font-bold text-jet-ink">{r.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min={0.1}
            max={1.5}
            step={0.05}
            value={r}
            onChange={(e) => setR(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded appearance-none cursor-pointer accent-jet-ink"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-geistmono text-steel flex justify-between">
            <span>Capacidad de carga (K):</span>
            <span className="font-bold text-jet-ink">{K.toFixed(0)}</span>
          </label>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={K}
            onChange={(e) => setK(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded appearance-none cursor-pointer accent-jet-ink"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-geistmono text-steel flex justify-between">
            <span>Población Inicial (y₀):</span>
            <span className="font-bold text-jet-ink">{y0.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            step={0.5}
            value={y0}
            onChange={(e) => setY0(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded appearance-none cursor-pointer accent-jet-ink"
          />
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      {/* Sticky Header */}
      <Header />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 pb-24">
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col items-center text-center pt-20 pb-16 md:py-28 max-w-4xl mx-auto gap-6">
          {/* Beta tag pill */}
          <div className="inline-flex items-center gap-1.5 bg-sand border border-dove/40 px-3 py-1 rounded-full animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="text-[12px] font-medium font-geistmono text-jet-ink">
              Beta · MAT415 Interactive Lab
            </span>
          </div>

          {/* Mass Display Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-universalsansdisplay tracking-[-0.035em] text-jet-ink leading-[1.0] max-w-3xl">
            Simulación. Análisis. Matemática IV.
          </h1>

          <p className="text-base sm:text-lg text-fog max-w-2xl font-light leading-relaxed mt-2">
            Laboratorio digital para ecuaciones diferenciales, análisis de frecuencia y simulaciones caóticas 3D. Diseñado con rigor técnico para estudiantes de ingeniería.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <a
              href="#laboratorio"
              className="w-full sm:w-auto bg-jet-ink text-paper px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity text-center"
            >
              Iniciar Simulaciones
            </a>
            <a
              href="https://github.com/UES-Community/mat415-2016"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-transparent border border-dove/60 hover:border-jet-ink text-jet-ink px-6 py-3 rounded-full text-sm font-medium transition-colors text-center"
            >
              Documentación Código
            </a>
          </div>

          {/* Feature Stat Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mt-16 border-t border-b border-dove/30 py-8 select-none">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-light text-jet-ink">4 Unidades</span>
              <span className="text-[11px] font-geistmono text-pewter uppercase tracking-wider mt-1">Contenido completo</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-light text-jet-ink">&lt;2ms latency</span>
              <span className="text-[11px] font-geistmono text-pewter uppercase tracking-wider mt-1">Tiempo de cálculo</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-light text-jet-ink">WebGL 3D</span>
              <span className="text-[11px] font-geistmono text-pewter uppercase tracking-wider mt-1">Campos vectoriales</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-light text-jet-ink">100% Estático</span>
              <span className="text-[11px] font-geistmono text-pewter uppercase tracking-wider mt-1">Cero servidor</span>
            </div>
          </div>
        </section>

        {/* --- DECORATIVE ORB & CODE TERMINAL SECTION --- */}
        <section className="relative w-full py-8 mb-20 max-w-4xl mx-auto">
          {/* Peach/Coral Radial Gradient Orb bleeding behind code block */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-r from-[#ff8868] to-[#ffa888] rounded-full blur-[72px] opacity-15 pointer-events-none -z-10" />
          
          <div className="w-full">
            <TerminalCodeBlock />
          </div>
        </section>

        {/* --- DETAILED LAB UNITS SECTION --- */}
        <section id="laboratorio" className="scroll-mt-20 flex flex-col gap-14">
          <div className="border-b border-dove/40 pb-4 max-w-xl">
            <span className="text-[11px] font-geistmono text-pewter tracking-wider uppercase">Módulos de Aprendizaje</span>
            <h2 className="text-3xl font-medium tracking-tight text-jet-ink mt-1">Laboratorio Matemático Interactivo</h2>
          </div>

          <div className="flex flex-col gap-10">
            {/* Unit 1: EDOs */}
            <UnitCard
              id="edo"
              unitNumber="Unidad 01"
              title="Ecuaciones Diferenciales Ordinarias"
              description="Estudio de sistemas físicos modelados por EDOs de primer y segundo orden. Implementación numérica de modelos poblacionales logísticos y osciladores mediante integración directa en tiempo real."
              tag="Cálculo Diferencial"
            >
              <LogisticGrowthSimulator />
            </UnitCard>

            {/* Unit 2: Fourier */}
            <UnitCard
              id="fourier"
              unitNumber="Unidad 02"
              title="Series de Fourier y Dominio de Frecuencia"
              description="Aproximación de funciones periódicas discontinuas (ondas cuadradas, triangulares y dientes de sierra) mediante la suma infinita de funciones armónicas ortogonales seno y coseno."
              tag="Análisis Armónico"
            >
              <FourierPlot />
            </UnitCard>

            {/* Unit 3: Laplace */}
            <UnitCard
              id="laplace"
              unitNumber="Unidad 03"
              title="Transformada de Laplace y Sistemas Lineales"
              description="Análisis dinámico de sistemas lineales invariantes en el tiempo (LTI). Evaluación y modelado de la respuesta temporal a estímulos escalón para sistemas oscilatorios y amortiguados."
              tag="Dominio de Laplace"
            >
              <LaplaceStepResponse />
            </UnitCard>

            {/* Unit 4: 3D Simulations */}
            <UnitCard
              id="3d"
              unitNumber="Unidad 04"
              title="Métodos Numéricos y Simulación Tridimensional"
              description="Resolución por métodos adaptativos de sistemas acoplados tridimensionales y no lineales. Exploración interactiva del espacio de fases y atractores extraños caóticos en WebGL."
              tag="Sistemas Caóticos"
            >
              <VectorField3D />
            </UnitCard>
          </div>
        </section>

        {/* --- NEWS / UPDATES INDEX SECTION (4-COLUMN GRID, xAI AESTHETIC) --- */}
        <section className="mt-28 flex flex-col gap-10">
          <div className="border-b border-dove/40 pb-4">
            <span className="text-[11px] font-geistmono text-pewter tracking-wider uppercase">Índice Académico</span>
            <h2 className="text-2xl font-medium tracking-tight text-jet-ink mt-1">Notas y Recursos del Curso</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* News Card 1 */}
            <div className="flex flex-col gap-3 group">
              <div className="w-full aspect-[4/3] bg-cream rounded-lg overflow-hidden border border-dove/30 relative flex items-center justify-center">
                <Cpu className="w-8 h-8 text-fog group-hover:text-jet-ink transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-geistmono text-[11px] text-fog">19 de Julio, 2026</span>
                <a href="#edo" className="text-[15px] font-medium text-jet-ink hover:underline">
                  Resolución de EDOs usando Métodos de Runge-Kutta
                </a>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="flex flex-col gap-3 group">
              <div className="w-full aspect-[4/3] bg-cream rounded-lg overflow-hidden border border-dove/30 relative flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-fog group-hover:text-jet-ink transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-geistmono text-[11px] text-fog">10 de Julio, 2026</span>
                <a href="#fourier" className="text-[15px] font-medium text-jet-ink hover:underline">
                  El Fenómeno de Gibbs en Series Trigonométricas
                </a>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="flex flex-col gap-3 group">
              <div className="w-full aspect-[4/3] bg-cream rounded-lg overflow-hidden border border-dove/30 relative flex items-center justify-center">
                <Info className="w-8 h-8 text-fog group-hover:text-jet-ink transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-geistmono text-[11px] text-fog">05 de Julio, 2026</span>
                <a href="#laplace" className="text-[15px] font-medium text-jet-ink hover:underline">
                  Respuesta en Frecuencia y Polos en el Plano Complejo
                </a>
              </div>
            </div>

            {/* News Card 4 */}
            <div className="flex flex-col gap-3 group">
              <div className="w-full aspect-[4/3] bg-cream rounded-lg overflow-hidden border border-dove/30 relative flex items-center justify-center">
                <Award className="w-8 h-8 text-fog group-hover:text-jet-ink transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-geistmono text-[11px] text-fog">28 de Junio, 2026</span>
                <a href="#3d" className="text-[15px] font-medium text-jet-ink hover:underline">
                  Atractores de Lorenz en Sistemas Dinámicos Caóticos
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
