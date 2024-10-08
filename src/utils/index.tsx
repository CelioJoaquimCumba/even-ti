export enum breakpoints {
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  '2xl' = 1536,
}
export const getBreakpoint = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width
    if (width < breakpoints.sm) return 'sm'
    if (width < breakpoints.md) return 'md'
    if (width < breakpoints.lg) return 'lg'
    if (width < breakpoints.xl) return 'xl'
    return '2xl'
  }
  return 'sm'
}
export const isBreakpointLowOrEqual = (bp: keyof typeof breakpoints) => {
  const breakpoint = getBreakpoint()
  return breakpoint <= bp
}
