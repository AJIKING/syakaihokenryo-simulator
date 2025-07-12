/* eslint-disable react/jsx-props-no-spreading */
"use client";

import { forwardRef, type ReactNode, type ReactElement } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  type LegendProps,
  type TooltipContentProps as RechartsTooltipContentProps,
} from "recharts";

import { cn } from "./utils";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// ============================================================
// Tooltip content component & props
// ============================================================

export interface ChartTooltipContentProps<
  TValue extends ValueType = ValueType,
  TName extends NameType = NameType,
> extends Pick<
    RechartsTooltipContentProps<TValue, TName>,
    "active" | "payload" | "label" | "labelFormatter"
  > {
  /** ------- Customization props ------- */
  /** Tailwind 用追加クラス */
  className?: string;
  /** インジケータの形状 */
  indicator?: "dot" | "line";
  /** ラベルを隠すか */
  hideLabel?: boolean;
  /** インジケータ自体を隠すか */
  hideIndicator?: boolean;
  /** ラベル用追加クラス */
  labelClassName?: string;
  /** 値フォーマッタ */
  formatter?: (
    value: TValue,
    name: TName,
    item: NonNullable<RechartsTooltipContentProps<TValue, TName>["payload"]>[number],
    payload: NonNullable<RechartsTooltipContentProps<TValue, TName>["payload"]>,
  ) => ReactNode;
  /** インジケータの色を強制 */
  color?: string;
  /** `dataKey` の代わりに表示する名前のキー */
  nameKey?: string;
}

function ChartTooltipContent<
  TValue extends ValueType = ValueType,
  TName extends NameType = NameType,
>({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
}: ChartTooltipContentProps<TValue, TName>) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const displayColor = color ?? (item as any).color ?? "#000";

  return (
    <div
      className={cn(
        "rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-100",
        className,
      )}
    >
      <div className={cn("flex items-center gap-2", labelClassName)}>
        {!hideIndicator &&
          (indicator === "dot" ? (
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: displayColor }}
            />
          ) : (
            <span
              className="inline-block h-2 w-3"
              style={{ backgroundColor: displayColor }}
            />
          ))}
        {!hideLabel && (labelFormatter ? (labelFormatter as any)(label, item) : (label as ReactNode))}
      </div>
      <div className="mt-1 font-semibold">
        {formatter
          ? formatter(
              item.value as TValue,
              (nameKey ?? (item.name as unknown as TName)) as TName,
              item as NonNullable<RechartsTooltipContentProps<TValue, TName>["payload"]>[number],
              payload as NonNullable<RechartsTooltipContentProps<TValue, TName>["payload"]>,
            )
          : (item.value as ReactNode)}
      </div>
    </div>
  );
}

// ============================================================
// Chart container component (demo usage)
// ============================================================

export interface ChartContainerProps {
  children: ReactElement;
  /** Legend を表示するか (または LegendProps を渡す) */
  legend?: boolean | Omit<LegendProps, "payload">;
  /** デフォルトツールチップを表示するか */
  tooltip?: boolean;
  /** アスペクト比 (横/縦) */
  aspect?: number;
  /** 追加クラス */
  className?: string;
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      children,
      legend = false,
      tooltip = true,
      aspect = 2,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...rest}>
        <ResponsiveContainer width="100%" aspect={aspect}>
          {children}
        </ResponsiveContainer>
        {tooltip && (
          <Tooltip
            content={(props) => {
              const { formatter: _rechartsFormatter, ...rest } = props;
              return <ChartTooltipContent {...rest} />;
            }}
            wrapperStyle={{ outline: "none" }}
          />
        )}
        {legend && <Legend {...(legend === true ? {} : legend)} />}
      </div>
    );
  },
);

ChartContainer.displayName = "ChartContainer";
