"use client";

import React from "react";
import {
  Root as RadixCollapsible,
  Trigger as RadixCollapsibleTrigger,
  Content as RadixCollapsibleContent,
} from "@radix-ui/react-collapsible";


type CollapsibleElement = React.ElementRef<typeof RadixCollapsible>;
type CollapsibleProps = React.ComponentPropsWithoutRef<typeof RadixCollapsible>;

export const Collapsible = React.forwardRef<CollapsibleElement, CollapsibleProps>(
  ({ ...props }, ref) => (
    <RadixCollapsible ref={ref} data-slot="collapsible" {...props} />
  ),
);
Collapsible.displayName = "Collapsible";

/* ------------------------------------------------------------------ */

type TriggerElement = React.ElementRef<typeof RadixCollapsibleTrigger>;
type TriggerProps = React.ComponentPropsWithoutRef<typeof RadixCollapsibleTrigger>;

export const CollapsibleTrigger = React.forwardRef<TriggerElement, TriggerProps>(
  ({ ...props }, ref) => (
    <RadixCollapsibleTrigger
      ref={ref}
      data-slot="collapsible-trigger"
      {...props}
    />
  ),
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

/* ------------------------------------------------------------------ */

type ContentElement = React.ElementRef<typeof RadixCollapsibleContent>;
type ContentProps = React.ComponentPropsWithoutRef<typeof RadixCollapsibleContent>;

export const CollapsibleContent = React.forwardRef<ContentElement, ContentProps>(
  ({ ...props }, ref) => (
    <RadixCollapsibleContent
      ref={ref}
      data-slot="collapsible-content"
      {...props}
    />
  ),
);
CollapsibleContent.displayName = "CollapsibleContent";