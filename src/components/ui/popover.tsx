"use client";

import type { ComponentProps } from "react";
import { Anchor, Content, Portal, Root, Trigger } from "@radix-ui/react-popover";

import { cn } from "./utils";

function Popover({
  ...props
}: ComponentProps<typeof Root>) {
  return <Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: ComponentProps<typeof Trigger>) {
  return <Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </Portal>
  );
}

function PopoverAnchor({
  ...props
}: ComponentProps<typeof Anchor>) {
  return <Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
