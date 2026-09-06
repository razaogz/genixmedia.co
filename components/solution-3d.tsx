'use client';

const VARIANT_STYLES = {
  globe: {
    ring: 'rounded-full border border-purple-300/70 [box-shadow:0_0_22px_rgba(168,85,247,0.45),inset_0_0_18px_rgba(168,85,247,0.35)]',
    core: 'rounded-full bg-purple-400/20',
  },
  shield: {
    ring: 'rounded-[45%_45%_50%_50%] border border-purple-300/70 [box-shadow:0_0_22px_rgba(168,85,247,0.45),inset_0_0_18px_rgba(168,85,247,0.3)]',
    core: 'rounded-[45%_45%_50%_50%] bg-purple-400/20',
  },
  growth: {
    ring: 'rounded-full border border-fuchsia-300/70 [box-shadow:0_0_22px_rgba(217,70,239,0.45),inset_0_0_18px_rgba(217,70,239,0.3)]',
    core: 'rounded-full bg-fuchsia-400/20',
  },
  chip: {
    ring: 'rounded-lg border border-violet-300/70 [box-shadow:0_0_22px_rgba(139,92,246,0.45),inset_0_0_18px_rgba(139,92,246,0.3)]',
    core: 'rounded-md bg-violet-400/20',
  },
} as const;

export function SolutionVisual({ variant }: { variant: string }) {
  const styles = VARIANT_STYLES[variant as keyof typeof VARIANT_STYLES] ?? VARIANT_STYLES.globe;

  return (
    <div className="pointer-events-none absolute -right-1 -top-1 h-24 w-24 opacity-90 sm:h-28 sm:w-28">
      <div className={`absolute inset-3 rotate-12 ${styles.ring} animate-[spin_14s_linear_infinite]`} />
      <div className={`absolute inset-6 ${styles.core} animate-pulse`} />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-45 bg-gradient-to-b from-transparent via-purple-300/50 to-transparent" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
    </div>
  );
}
