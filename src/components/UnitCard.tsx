import React from "react";

interface UnitCardProps {
  id?: string;
  unitNumber: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  tag?: string;
}

export default function UnitCard({
  id,
  unitNumber,
  title,
  description,
  children,
  tag,
}: UnitCardProps) {
  return (
    <div
      id={id}
      className="w-full bg-cream rounded-2xl p-6 md:p-8 flex flex-col gap-6 scroll-mt-24 border border-dove/20"
    >
      {/* Card Info Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-geistmono text-[11px] text-pewter tracking-wider uppercase">
            {unitNumber}
          </span>
          {tag && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium font-geistmono bg-sand text-jet-ink border border-dove/40">
              {tag}
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-medium tracking-tight text-jet-ink">
          {title}
        </h3>
        
        <p className="text-[14px] text-steel leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      {/* Media or Simulation panel - flush or custom embedded depending on props */}
      <div className="w-full rounded-xl overflow-hidden bg-paper shadow-subtle border border-dove/25">
        {children}
      </div>
    </div>
  );
}
