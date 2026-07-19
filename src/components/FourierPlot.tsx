"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import MathFormula from "./MathFormula";
import { Slider } from "./ui/slider"; // Let's write a simple custom slider or standard HTML range input to avoid shadcn setup complexities

type WaveType = "square" | "triangle" | "sawtooth";

export default function FourierPlot() {
  const [waveType, setWaveType] = useState<WaveType>("square");
  const [harmonics, setHarmonics] = useState<number>(5);

  const points = useMemo(() => {
    const numPoints = 120;
    const data = [];
    const L = Math.PI; // Half period

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * (2 * Math.PI) - Math.PI; // t from -pi to pi
      
      let target = 0;
      let approx = 0;

      if (waveType === "square") {
        target = t >= 0 ? 1 : -1;
        // Fourier series: f(t) = (4/pi) * sum_{n=1,3,5,...}^{N} sin(n*t)/n
        let sum = 0;
        for (let k = 1; k <= harmonics; k++) {
          const n = 2 * k - 1; // Odd harmonics
          sum += Math.sin(n * t) / n;
        }
        approx = (4 / Math.PI) * sum;
      } else if (waveType === "triangle") {
        // Target: amplitude 1 triangle wave
        target = t >= 0 ? 1 - (2 * t) / Math.PI : -1 - (2 * t) / Math.PI;
        // In the range [-pi, pi], triangle wave f(t) = pi/2 - (4/pi)*sum_{n=1,3,5,...} cos(n*t)/n^2 (if shifted)
        // Let's use the standard sine series triangle wave:
        // f(t) = (8 / pi^2) * sum_{k=1}^{N} (-1)^(k-1) * sin((2k-1)*t) / (2k-1)^2
        let sum = 0;
        for (let k = 1; k <= harmonics; k++) {
          const n = 2 * k - 1;
          const sign = Math.pow(-1, k - 1);
          sum += (sign * Math.sin(n * t)) / (n * n);
        }
        approx = (8 / (Math.PI * Math.PI)) * sum;
      } else if (waveType === "sawtooth") {
        // Target: sawtooth wave f(t) = t/pi
        target = t / Math.PI;
        // Fourier series: f(t) = (2/pi) * sum_{n=1}^{N} (-1)^{n+1} * sin(n*t)/n
        let sum = 0;
        for (let n = 1; n <= harmonics; n++) {
          const sign = Math.pow(-1, n + 1);
          sum += (sign * Math.sin(n * t)) / n;
        }
        approx = (2 / Math.PI) * sum;
      }

      data.push({
        t: parseFloat(t.toFixed(2)),
        Target: parseFloat(target.toFixed(3)),
        Aproximacion: parseFloat(approx.toFixed(3)),
      });
    }
    return data;
  }, [waveType, harmonics]);

  const formulas = {
    square: {
      series: "f(t) \\approx \\frac{4}{\\pi} \\sum_{k=1}^{N} \\frac{\\sin((2k-1)t)}{2k-1}",
      desc: "Serie senoidal con armónicos impares. Notar el fenómeno de Gibbs cerca de las discontinuidades."
    },
    triangle: {
      series: "f(t) \\approx \\frac{8}{\\pi^2} \\sum_{k=1}^{N} (-1)^{k-1} \\frac{\\sin((2k-1)t)}{(2k-1)^2}",
      desc: "Los coeficientes decrecen como 1/n², lo que resulta en una convergencia mucho más rápida."
    },
    sawtooth: {
      series: "f(t) \\approx \\frac{2}{\\pi} \\sum_{n=1}^{N} (-1)^{n+1} \\frac{\\sin(nt)}{n}",
      desc: "Serie senoidal con todos los armónicos enteros. Aproxima una rampa periódica."
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6 md:p-8 bg-cream rounded-2xl shadow-subtle-2 border border-dove/40">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-geistmono text-pewter tracking-wider uppercase">Simulador de Señal</span>
          <h3 className="text-xl font-medium tracking-tight text-jet-ink">Series de Fourier</h3>
        </div>
        {/* Toggle Wave Type */}
        <div className="flex items-center gap-1 bg-sand p-1 rounded-full w-fit">
          {(["square", "triangle", "sawtooth"] as WaveType[]).map((type) => (
            <button
              key={type}
              onClick={() => setWaveType(type)}
              className={`px-3 py-1 text-[12px] font-medium rounded-full cursor-pointer transition-all duration-200 capitalize ${
                waveType === type
                  ? "bg-jet-ink text-paper"
                  : "bg-transparent text-fog hover:text-jet-ink"
              }`}
            >
              {type === "square" ? "Cuadrada" : type === "triangle" ? "Triangular" : "Diente Sierra"}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[240px] w-full bg-paper rounded-xl p-3 border border-dove/30 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
            <XAxis dataKey="t" stroke="#858585" fontSize={11} />
            <YAxis stroke="#858585" fontSize={11} domain={[-1.3, 1.3]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-cream)",
                borderColor: "var(--color-dove)",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "var(--font-geistmono)",
                color: "var(--color-jet-ink)",
              }}
            />
            <Line
              type="monotone"
              dataKey="Target"
              stroke="var(--color-fog)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="Aproximacion"
              stroke="var(--color-jet-ink)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Slider Harmonics */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs font-geistmono text-steel">
          <span>Número de Armónicos (N):</span>
          <span className="font-bold text-jet-ink bg-sand px-2 py-0.5 rounded-full">{harmonics}</span>
        </div>
        <input
          type="range"
          min={1}
          max={40}
          value={harmonics}
          onChange={(e) => setHarmonics(parseInt(e.target.value))}
          className="w-full h-1 bg-dove rounded-lg appearance-none cursor-pointer accent-jet-ink"
        />
      </div>

      {/* Math representation */}
      <div className="bg-sand/40 p-4 rounded-xl border border-dove/20 flex flex-col gap-2.5">
        <div className="text-center py-2 bg-paper/60 rounded-lg">
          <MathFormula math={formulas[waveType].series} block={true} className="text-sm font-semibold" />
        </div>
        <p className="text-[12px] text-steel leading-relaxed">
          {formulas[waveType].desc}
        </p>
      </div>
    </div>
  );
}
