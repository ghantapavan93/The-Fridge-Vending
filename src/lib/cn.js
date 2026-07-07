// Minimal classnames joiner (shadcn-style `cn`, without the tailwind-merge dep —
// our usage is additive, so a truthy join is enough).
export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
}
