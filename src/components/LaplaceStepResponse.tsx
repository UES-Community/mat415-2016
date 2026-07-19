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
  ReferenceLine,
} from "recharts";
import MathFormula from "./MathFormula";

export default function LaplaceStepResponse() {
  const [zeta, setZeta] = useState<number>(0.3); // damping ratio
  const [omega0, setOmega0] = useState<number>(3.0); // natural frequency

  const systemState = useMemo(() => {
    if (zeta < 0.98) return { name: "Subamortiguado", color: "text-[#d73a49]" };
    if (zeta > 1.02) return { name: "Sobreamortiguado", color: "text-[#858585]" };
    return { name: "Amortiguamiento Crítico", color: "text-[#28c840]" };
  }, [zeta]);

  const points = useMemo(() => {
    const data = [];
    const tMax = 8.0;
    const numPoints = 160;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * tMax;
      let y = 0;

      if (zeta < 0.999) {
        // Underdamped
        const wd = omega0 * Math.sqrt(1 - zeta * zeta);
        const expTerm = Math.exp(-zeta * omega0 * t);
        const cosTerm = Math.cos(wd * t);
        const sinTerm = Math.sin(wd * t);
        y = 1 - expTerm * (cosTerm + (zeta * omega0 / wd) * sinTerm);
      } else if (zeta > 1.001) {
        // Overdamped
        const r = Math.sqrt(zeta * zeta - 1);
        const s1 = -omega0 * (zeta - r);
        const s2 = -omega0 * (zeta + r);
        // y(t) = 1 - (s2*exp(s1*t) - s1*exp(s2*t))/(s2 - s1)
        y = 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
      } else {
        // Critically damped (zeta approx 1)
        y = 1 - Math.exp(-omega0 * t) * (1 + omega0 * t);
      }

      data.push({
        t: parseFloat(t.toFixed(2)),
        Entrada: 1.0,
        Respuesta: parseFloat(y.toFixed(4)),
      });
    }
    return data;
  }, [zeta, omega0]);

  const tfFormula = useMemo(() => {
    const zStr = zeta.toFixed(2);
    const w0Str = omega0.toFixed(2);
    const w0SqStr = (omega0 * omega0).toFixed(2);
    const twoZStr = (2 * zeta * omega0).toFixed(2);

    return `H(s) = \\frac{${w0SqStr}}{s^2 + ${twoZStr} s + ${w0SqStr}}`;
  }, [zeta, omega0]);

  return (
    <div className="w-full flex flex-col gap-6 p-6 md:p-8 bg-cream rounded-2xl shadow-subtle-2 border border-dove/40">
      {/* Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-geistmono text-pewter tracking-wider uppercase">Análisis Temporal (Transformada)</span>
          <h3 className="text-xl font-medium tracking-tight text-jet-ink">Respuesta al Escalón Unitario</h3>
        </div>
        {/* Badge of state */}
        <div className="px-3 py-1 bg-sand rounded-full text-xs font-medium border border-dove/30">
          Estado: <span className={`font-bold ${systemState.color}`}>{systemState.name}</span>
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
            <XAxis dataKey="t" stroke="#858585" fontSize={11} label={{ value: 'Tiempo (t)', position: 'insideBottomRight', offset: -5, fontSize: 10, fill: '#858585' }} />
            <YAxis stroke="#858585" fontSize={11} domain={[0, 1.4]} />
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
            <ReferenceLine y={1.0} stroke="#858585" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'Escalón Entrada = 1', position: 'top', fill: '#9d9d9d', fontSize: 9 }} />
            <Line
              type="monotone"
              dataKey="Respuesta"
              stroke="var(--color-jet-ink)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zeta slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-geistmono text-steel">
            <span>Factor de Amortiguamiento (\(\zeta\)):</span>
            <span className="font-bold text-jet-ink bg-sand px-2 py-0.5 rounded-full">{zeta.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={1.5}
            step={0.05}
            value={zeta}
            onChange={(e) => setZeta(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded-lg appearance-none cursor-pointer accent-jet-ink"
          />
        </div>

        {/* Omega slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-geistmono text-steel">
            <span>Frecuencia Natural (\(\omega_0\)):</span>
            <span className="font-bold text-jet-ink bg-sand px-2 py-0.5 rounded-full">{omega0.toFixed(2)} rad/s</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={6.0}
            step={0.1}
            value={omega0}
            onChange={(e) => setOmega0(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded-lg appearance-none cursor-pointer accent-jet-ink"
          />
        </div>
      </div>

      {/* Math Function display */}
      <div className="bg-sand/40 p-4 rounded-xl border border-dove/20 flex flex-col items-center gap-2.5">
        <div className="py-2 bg-paper/60 px-4 rounded-lg w-full text-center">
          <MathFormula math={tfFormula} block={true} className="text-sm font-semibold" />
        </div>
        <p className="text-[12px] text-steel text-center">
          Función de transferencia de segundo orden en el dominio de Laplace \(S\). Representa la dinámica de oscilaciones físicas amortiguadas.
        </p>
      </div>
    </div>
  );
}
