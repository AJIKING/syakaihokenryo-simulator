"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";

import { cn } from "./utils";

/**
 * Radix UI Tabs wrapped with utility‐class defaults and proper ref forwarding.
 *
 * ‼️ NOTE
 * ─────────
 * 1. Import path now omits the version suffix ("@radix-ui/react-tabs") so that the
 *    module can be resolved by bundlers / TypeScript without extra config.
 * 2. Every sub‑component is a `forwardRef` so that refs work seamlessly in
 *    consuming code and type inference remains intact.
 * 3. Tailwind utility classes are provided as sensible defaults but can be
 *    overridden via the `className` prop.
 */

/** Root */
const Tabs = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
Tabs.displayName = Root.displayName

/** List */
const TabsList = forwardRef<
  ElementRef<typeof List>,
  ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "inline-flex h-9 w-fit items-center justify-center gap-[3px] rounded-xl bg-muted p-[3px] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = List.displayName

/** Trigger */
const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      // ─────────────────────────────────────────────
      // 共通スタイル
      `inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap
       rounded-xl border border-transparent px-3 py-1 text-sm font-medium
       transition-colors focus-visible:outline-1 focus-visible:outline-ring
       focus-visible:ring-[3px] focus-visible:ring-ring/50
       disabled:pointer-events-none disabled:opacity-50
       [&_svg]:pointer-events-none [&_svg]:shrink-0
       [&_svg:not([class*='size-'])]:size-4`,

      // ↓↓↓ ここが“選択中”を目立たせるポイント ↓↓↓
      //     data-[state=active] は Radix が自動で付けてくれる
      `data-[state=active]:bg-primary
       data-[state=active]:text-primary-foreground
       data-[state=active]:shadow-md
       data-[state=active]:ring-1
       data-[state=active]:ring-primary/50`,

      // 非アクティブ時に少し薄めに
      `data-[state=inactive]:text-muted-foreground`,
      className,
    )}
    {...props}
  />
))

TabsTrigger.displayName = Trigger.displayName

/** Content */
const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn("flex-1 outline-none", className)}
    {...props}
  />
))
TabsContent.displayName = Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent };
