"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { Content, Group, Icon, Item, ItemIndicator, ItemText, Label, Portal, Root, ScrollDownButton, ScrollUpButton, Separator, Trigger, Value, Viewport } from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "./utils";

/**
 * Radix UI Select — forward‑ref ready, type‑safe, and version suffix‑free. 🎉
 *
 * 変更点まとめ
 * ──────────
 * 1. **Import パスを統一** — `@radix-ui/react-select@2.1.6` → `@radix-ui/react-select` / `lucide-react@*` → `lucide-react`。
 * 2. **`forwardRef` 化** — DOM 要素を返すサブコンポーネントはすべて `forwardRef` で包み、型安全に。
 * 3. **表示名 (`displayName`) 追加** — DevTools で判別しやすい。
 * 4. **クラス名マージは共通の `cn()`** — Tailwind クラスをデフォルトで付与しつつ自由に上書き。
 */

/* -------------------------------------------------------------------------------------------------
 * Root helpers (no ref required)
 * -----------------------------------------------------------------------------------------------*/

type SelectProps = ComponentPropsWithoutRef<typeof Root>;
const Select = (props: SelectProps) => (
  <Root data-slot="select" {...props} />
);
Select.displayName = "Select";

const SelectGroup = (
  props: ComponentPropsWithoutRef<typeof Group>,
) => <Group data-slot="select-group" {...props} />;
SelectGroup.displayName = "SelectGroup";

const SelectValue = (
  props: ComponentPropsWithoutRef<typeof Value>,
) => <Value data-slot="select-value" {...props} />;
SelectValue.displayName = "SelectValue";

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerProps = ComponentPropsWithoutRef<typeof Trigger> & {
  /**
   * Size token that aligns with shadcn/ui input sizes.
   * @default "default"
   */
  size?: "sm" | "default";
};

const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  TriggerProps
>(({ className, size = "default", children, ...props }, ref) => (
  <Trigger
    ref={ref}
    data-slot="select-trigger"
    data-size={size}
    className={cn(
      "flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-input-background px-3 py-2 text-sm transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 dark:hover:bg-input/50 data-[size=default]:h-9 data-[size=sm]:h-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
      className,
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDownIcon className="size-4 opacity-50" />
    </Icon>
  </Trigger>
));
SelectTrigger.displayName = Trigger.displayName;

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      data-slot="select-content"
      position={position}
      className={cn(
        "relative z-50 min-w-[8rem] max-h-[--radix-select-content-available-height] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
        )}
      >
        {children}
      </Viewport>
      <SelectScrollDownButton />
    </Content>
  </Portal>
));
SelectContent.displayName = Content.displayName;

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/

const SelectLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    ref={ref}
    data-slot="select-label"
    className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
    {...props}
  />
));
SelectLabel.displayName = Label.displayName;

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <CheckIcon className="size-4" />
      </ItemIndicator>
    </span>
    <ItemText>{children}</ItemText>
  </Item>
));
SelectItem.displayName = Item.displayName;

/* -------------------------------------------------------------------------------------------------
 * Separator
 * -----------------------------------------------------------------------------------------------*/

const SelectSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = Separator.displayName;

/* -------------------------------------------------------------------------------------------------
 * Scroll buttons
 * -----------------------------------------------------------------------------------------------*/

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof ScrollUpButton>,
  ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn("flex items-center justify-center py-1 cursor-default", className)}
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof ScrollDownButton>,
  ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn("flex items-center justify-center py-1 cursor-default", className)}
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
