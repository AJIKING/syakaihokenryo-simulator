"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Root } from "@radix-ui/react-label";

import { cn } from "./utils";

/**
 * Radix UI Label — typed, ref‑friendly, and version suffix‑free. 🏷️
 *
 * 🚀 **Refactor points**
 * 1. **Import path cleanup** – `@radix-ui/react-label@2.1.2` → `@radix-ui/react-label`.
 * 2. **`forwardRef`** – allows refs to point at the underlying element while keeping type inference.
 * 3. **`displayName`** – nicer identification in React DevTools.
 * 4. **Type‑safe props** – uses `ElementRef` / `ComponentPropsWithoutRef` helpers.
 */

const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    data-slot="label"
    className={cn(
      "flex items-center gap-2 text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));
Label.displayName = Root.displayName;

export { Label };