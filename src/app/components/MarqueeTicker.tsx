"use client";

interface MarqueeTickerProps {
  items?: string[];
  reverse?: boolean;
}

const defaultItems = [
  "FREE DELIVERY ON ORDERS OVER $30",
  "AVAILABLE FOR HOME DELIVERY",
  "ORDER ONLINE FOR 15% OFF",
  "FRESH INGREDIENTS DAILY",
  "WORLD CLASS STANDARDS",
  "CAFE AH-ROMA LOVES YOU",
];

export default function MarqueeTicker({
  items = defaultItems,
  reverse = false,
}: MarqueeTickerProps) {
  const scrollClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className="relative w-full overflow-hidden bg-primary py-4 text-white font-sans uppercase tracking-widest text-xs sm:text-sm font-bold border-y border-white/5 select-none">
      <div className="flex w-max">
        <div className={`flex items-center shrink-0 ${scrollClass} gap-16 px-8`}>
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-cream-dark text-base opacity-75">✦</span>
            </span>
          ))}
        </div>
        <div className={`flex items-center shrink-0 ${scrollClass} gap-16 px-8`} aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-cream-dark text-base opacity-75">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
