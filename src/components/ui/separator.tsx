"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";

/**
 * Radix UI Separator — typed, forwardRef‑friendly, and sans version suffix.
 *
 * ✨ 変更加点
 * ──────────
 * 1. **Import Path Fix** ― `@radix-ui/react-separator@1.1.2` → `@radix-ui/react-separator`。
 * 2. **`React.forwardRef`** ― ref をそのまま渡せるように強化。
 * 3. **型引数をセーフに** ― `ElementRef` / `ComponentPropsWithoutRef` で型推論◎。
 * 4. **`displayName`** ― DevTools でコンポーネント名が判別しやすい。
 */

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
