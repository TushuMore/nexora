// components/DotBackground.tsx
"use client"

import { cn } from "@/lib/utils"

export default function DotBackground() {
  return (
    <>
      {/* Dotted Grid Layer */}
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_0.2px,transparent_1px)]"
        )}
      />
      {/* Radial Mask for Fade Effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </>
  )
}
