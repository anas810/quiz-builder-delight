type BrandWordmarkProps = {
  className?: string;
};

export function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  return (
    <div
      aria-label="Onchain Heroes — Maze of Gains"
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-display uppercase leading-none ${className}`}
    >
      <span className="text-cyan">Onchain Heroes</span>
      <span aria-hidden="true" className="text-foreground/60">
        —
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="text-foreground">Maze</span>
        <span className="font-body text-[0.45em] font-bold lowercase text-gold">of</span>
        <span className="text-volt">Gains</span>
      </span>
    </div>
  );
}