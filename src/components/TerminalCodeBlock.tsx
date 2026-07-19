"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  language: string;
  code: string;
}

interface TerminalCodeBlockProps {
  tabs?: Tab[];
}

const DEFAULT_TABS: Tab[] = [
  {
    id: "ts-mathjs",
    label: "mathjs.ts",
    language: "typescript",
    code: `import { derivative, evaluate, solveODE } from 'mathjs';

// 1. Definir ecuación diferencial de 2do orden:
// y'' + 2*zeta*omega*y' + omega^2*y = F(t)
const zeta = 0.15; // Coeficiente de amortiguamiento
const omega = 2.0;  // Frecuencia natural angular

// Reducir a sistema de primer orden:
// dy/dt = v
// dv/dt = F(t) - 2*zeta*omega*v - omega^2*y
const f = (t: number, [y, v]: number[]) => {
  const force = Math.sin(t);
  const dydt = v;
  const dvdt = force - 2 * zeta * omega * v - Math.pow(omega, 2) * y;
  return [dydt, dvdt];
};

// 2. Resolver numéricamente con Runge-Kutta 4 (RK4)
const [tValues, yValues] = solveODE(f, [0, 10], [0, 0], 0.05);
console.log(\`Respuesta transitoria resuelta en \${tValues.length} pasos.\`);`
  },
  {
    id: "py-scipy",
    label: "ode_solver.py",
    language: "python",
    code: `import numpy as np
from scipy.integrate import solve_ivp

# Ecuación del oscilador amortiguado
def damped_oscillator(t, z, zeta, omega0):
    y, v = z
    dydt = v
    dvdt = -2*zeta*omega0*v - (omega0**2)*y
    return [dydt, dvdt]

# Parámetros del sistema
zeta, omega0 = 0.15, 2.0
t_span = (0.0, 10.0)
y0 = [1.0, 0.0] # Posición inicial y velocidad inicial

sol = solve_ivp(damped_oscillator, t_span, y0, 
                 args=(zeta, omega0), t_eval=np.linspace(0, 10, 200))
print("EDO de 2do orden resuelta exitosamente.")`
  },
  {
    id: "latex",
    label: "laplace.tex",
    language: "latex",
    code: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
% Transformada de Laplace de la EDO del oscilador
\\begin{equation}
  \\mathcal{L}\\{y''(t) + 2\\zeta\\omega_0 y'(t) + \\omega_0^2 y(t)\\} = \\mathcal{L}\\{f(t)\\}
\\end{equation}

\\begin{equation}
  Y(s) = \\frac{F(s) + (s + 2\\zeta\\omega_0)y(0) + y'(0)}{s^2 + 2\\zeta\\omega_0 s + \\omega_0^2}
\\end{equation}
\\end{document}`
  }
];

export default function TerminalCodeBlock({ tabs = DEFAULT_TABS }: TerminalCodeBlockProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || "");

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Simple pseudo-syntax highlighter helper for demonstration
  const highlightCode = (code: string, lang: string) => {
    if (!code) return "";
    
    // Safety escape
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (lang === "typescript" || lang === "javascript") {
      return escaped
        .replace(/(\/\/.*)/g, '<span class="text-fog italic">$1</span>')
        .replace(/(import|const|let|from|return|console|Math)/g, '<span class="text-[#d73a49]">$1</span>')
        .replace(/(['"`][^'`"]*['"`])/g, '<span class="text-[#28c840]">$1</span>')
        .replace(/(\b\d+(\.\d+)?\b)/g, '<span class="text-[#ffbd2e]">$1</span>');
    }
    
    if (lang === "python") {
      return escaped
        .replace(/(#.*)/g, '<span class="text-fog italic">$1</span>')
        .replace(/(def|import|from|return|print|args)/g, '<span class="text-[#d73a49]">$1</span>')
        .replace(/(['"`][^'`"]*['"`])/g, '<span class="text-[#28c840]">$1</span>')
        .replace(/(\b\d+(\.\d+)?\b)/g, '<span class="text-[#ffbd2e]">$1</span>');
    }

    if (lang === "latex" || lang === "tex") {
      return escaped
        .replace(/(%.*)/g, '<span class="text-fog italic">$1</span>')
        .replace(/(\\[a-zA-Z]+)/g, '<span class="text-[#d73a49]">$1</span>')
        .replace(/([{}])/g, '<span class="text-[#ffbd2e]">$1</span>');
    }

    return escaped;
  };

  return (
    <div className="w-full flex flex-col">
      {/* Code mock terminal wrapper */}
      <div className="w-full bg-[#151515] rounded-xl overflow-hidden shadow-subtle border border-neutral-800 flex flex-col font-geistmono text-[13px] leading-relaxed">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/60 bg-[#151515]">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {/* Mock File Path */}
          <span className="text-[11px] text-pewter select-none">
            mat415_lab / src / {activeTab?.label}
          </span>
          <div className="w-[38px]"></div> {/* spacer */}
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-x-auto text-[#e1e4e8] min-h-[220px] max-h-[360px] select-text">
          <pre className="whitespace-pre">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightCode(activeTab?.code || "", activeTab?.language || ""),
              }}
            />
          </pre>
        </div>
      </div>

      {/* Language Switcher Strip (sits beneath the terminal code block) */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`px-3 py-1.5 rounded-full font-geistmono text-[12px] transition-all duration-200 cursor-pointer ${
              activeTabId === tab.id
                ? "bg-jet-ink text-paper font-medium"
                : "bg-transparent text-fog hover:text-jet-ink"
            }`}
          >
            {tab.label.split(".")[1] ? tab.label.split(".")[1].toUpperCase() : tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
