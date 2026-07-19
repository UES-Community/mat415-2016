import React from "react";
import katex from "katex";

interface MathFormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

export default function MathFormula({
  math,
  block = false,
  className = "",
}: MathFormulaProps) {
  try {
    const html = katex.renderToString(math, {
      displayMode: block,
      throwOnError: false,
    });

    return (
      <span
        className={`inline-block select-all max-w-full overflow-x-auto overflow-y-hidden ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.error("KaTeX rendering error:", error);
    return (
      <code className={`font-mono text-amber text-xs ${className}`}>
        {math}
      </code>
    );
  }
}
