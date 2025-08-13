import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Link, Await } from '@tanstack/react-router';
import { Plus, Ellipsis } from 'lucide-react';
import { motion } from 'motion/react';
import { B as Button } from './button-CZzuhyyv.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-B9MMwDqO.mjs';
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from './dropdown-menu-CPTnNY2r.mjs';
import { d as Route$4, c as cn } from './ssr.mjs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-dropdown-menu';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'react';
import '@radix-ui/react-scroll-area';
import 'clsx';
import 'tailwind-merge';
import '@polar-sh/better-auth';
import '@polar-sh/sdk';
import 'better-auth';
import 'better-auth/adapters/drizzle';
import 'better-auth/react-start';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'drizzle-orm/pg-core';
import 'node:async_hooks';
import 'redaxios';
import 'drizzle-orm';
import 'zod';
import '@polar-sh/tanstack-start';
import '@tanstack/react-router/ssr/server';

function some(x) {
  if (x === void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}
function get(dict, k) {
  if (k in dict) {
    return some(dict[k]);
  }
}
function reduceU(a, x, f) {
  var r = x;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i]);
  }
  return r;
}
function _groupBy(xs, groupFn) {
  return reduceU(xs, {}, function(acc, element) {
    var key = groupFn(element);
    var value = get(acc, key);
    if (value !== void 0) {
      value.push(element);
    } else {
      acc[key] = [element];
    }
    return acc;
  });
}
function groupBy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _groupBy(data, args[0]);
    };
  }
  return _groupBy(arguments[0], arguments[1]);
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-accent", className),
      "data-slot": "skeleton",
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      className: cn(
        "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-muted px-3 py-1.5 text-muted-foreground text-xs data-[state=closed]:animate-out",
        className
      ),
      "data-slot": "tooltip-content",
      sideOffset,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-muted fill-muted" })
      ]
    }
  ) });
}
const SplitComponent = function App() {
  const {
    user,
    subscriptions
  } = Route$4.useLoaderData();
  function getRatingCountColor(rating) {
    switch (rating) {
      case 5:
        return "bg-orange-8";
      case 4:
        return "bg-orange-7";
      case 3:
        return "bg-orange-6";
      case 2:
        return "bg-orange-5";
      default:
        return "bg-orange-4";
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "container mx-auto flex items-center justify-end gap-2 p-4 lg:p-8", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxs(Link, { className: "flex gap-2", to: "/subs/add", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        "Add Subscription"
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", children: /* @__PURE__ */ jsx(Ellipsis, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Profile" }),
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/settings", children: "Settings" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Await, { fallback: /* @__PURE__ */ jsx(Skeleton, { className: "container mx-auto h-64 bg-muted p-4 lg:p-8" }), promise: subscriptions, children: (data) => {
      if (data.length === 0) {
        return /* @__PURE__ */ jsx("div", { className: "container mx-auto p-4 font-mono lg:p-8", children: "You've got no subs!" });
      }
      const totalAmount = data.reduce((prev, curr) => prev + Number.parseFloat(curr.amount), 0);
      const maxAmount = Math.max(...data.map((s) => Number.parseFloat(s.amount)));
      const totalRating = data.reduce((prev, curr) => prev + curr.rating, 0);
      const averageRating = totalRating / data.length;
      const subsByRating = groupBy(data, (item) => item.rating);
      const averageCostPerPoint = totalAmount / totalRating;
      const minCostPerPoint = Math.min(...data.filter((sub) => Number.parseFloat(sub.amount) > 0).map((sub) => Number.parseFloat(sub.amount) / sub.rating));
      const averageCopWidth = averageCostPerPoint / Math.max(averageCostPerPoint, minCostPerPoint) * 100;
      const minCopWidth = minCostPerPoint / Math.max(averageCostPerPoint, minCostPerPoint) * 100;
      return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4 font-mono lg:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 grid gap-2 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Card, { className: "rounded-sm border-muted shadow-none transition-shadow hover:shadow", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-3xl lg:text-4xl", children: [
              "$",
              totalAmount.toFixed(2)
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "per month" })
          ] }) }),
          /* @__PURE__ */ jsx(Card, { className: "rounded-sm border-muted shadow-none transition-shadow hover:shadow", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl lg:text-4xl", children: data.length }),
            /* @__PURE__ */ jsx(CardDescription, { children: "subscriptions" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative grid lg:grid-cols-2", children: [
          /* @__PURE__ */ jsx("div", { className: "-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-t border-b" }),
          /* @__PURE__ */ jsx("div", { className: "-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l" }),
          /* @__PURE__ */ jsxs("div", { className: "border-muted border-b-1 p-6 transition-shadow hover:shadow lg:border-r-1", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground", children: "/ Average Value" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
              [...new Array(5)].map((_, index) => {
                let fillPercent = 0;
                if (index + 1 <= averageRating) {
                  fillPercent = index <= Math.floor(averageRating) ? 100 : (averageRating - Math.floor(averageRating)) * 100;
                }
                return /* @__PURE__ */ jsx("div", { className: cn("h-3 flex-1 rounded", fillPercent > 0 ? getRatingCountColor(index + 1) : "bg-muted") }, `average_value_${index}`);
              }),
              /* @__PURE__ */ jsxs("div", { className: "ml-2 text-muted-foreground text-xs", children: [
                averageRating.toFixed(2),
                " points"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 transition-shadow hover:shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground", children: "/ Cost per point" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-xs", children: [
                  "$",
                  averageCostPerPoint.toFixed(2)
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-3 rounded bg-orange-8 ", style: {
                  width: `${averageCopWidth}%`
                } })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "h-3 rounded bg-orange-4", style: {
                  width: `${minCopWidth}%`
                } }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-xs", children: [
                  "$",
                  minCostPerPoint.toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground text-xs", children: "Average vs. Lowest" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative grid lg:grid-cols-2", children: [
          /* @__PURE__ */ jsx("div", { className: "-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b" }),
          /* @__PURE__ */ jsx("div", { className: "-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r border-l" }),
          /* @__PURE__ */ jsxs("div", { className: "border-muted border-b p-6 transition-shadow hover:shadow lg:border-r", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground", children: "/ Subs by Rating" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [...new Array(5)].map((_, index) => {
              var _a;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex max-w-16 flex-auto flex-col items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-xs", children: index + 1 }),
                    (_a = subsByRating[index + 1]) == null ? void 0 : _a.map((sub) => /* @__PURE__ */ jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: `h-3 w-full rounded ${getRatingCountColor(index + 1)}` }) }),
                      /* @__PURE__ */ jsxs(TooltipContent, { children: [
                        /* @__PURE__ */ jsx("p", { className: "mb-2 border-b-1 pb-1 text-foreground", children: sub.name }),
                        /* @__PURE__ */ jsxs("p", { children: [
                          "$",
                          sub.amount
                        ] }),
                        /* @__PURE__ */ jsxs("p", { children: [
                          sub.rating,
                          " stars"
                        ] })
                      ] })
                    ] }, sub.id))
                  ]
                },
                `rating_${index}_count`
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 transition-shadow hover:shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground", children: "/ Subs by Price" }),
            /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: data.map((sub) => {
              const percentage = Number.parseFloat(sub.amount) / maxAmount * 100;
              return /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { align: "right", className: "whitespace-nowrap p-1 text-muted-foreground text-xs", children: sub.name }),
                /* @__PURE__ */ jsx("td", { className: "w-full p-1", children: /* @__PURE__ */ jsx(motion.div, { animate: {
                  width: `${percentage}%`
                }, className: "h-3 rounded bg-orange-8", initial: {
                  width: 0
                }, transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring"
                } }) }),
                /* @__PURE__ */ jsxs("td", { align: "right", className: "whitespace-nowrap p-1 text-muted-foreground text-xs", children: [
                  "$",
                  sub.amount
                ] })
              ] }, sub.id);
            }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "-left-4 -right-4 -z-10 absolute top-0 bottom-0 border-muted border-b-1" }),
          /* @__PURE__ */ jsx("div", { className: "-top-4 -bottom-4 -z-10 absolute right-0 left-0 border-muted border-r-1 border-l-1" }),
          /* @__PURE__ */ jsx("div", { className: "mb-2 font-medium text-lg text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground", children: "/ Your Subs" }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: data.sort((a, b) => b.rating - a.rating).map((sub) => /* @__PURE__ */ jsxs(Card, { className: "rounded-sm border-muted shadow-none transition-shadow hover:shadow", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "font-medium", children: sub.name }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                "$",
                sub.amount,
                " per month"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...new Array(5)].map((_, index) => /* @__PURE__ */ jsx("div", { className: cn("h-3 flex-auto rounded", index + 1 > sub.rating ? "bg-muted" : getRatingCountColor(index + 1)) }, `${sub.name}_rating_${index}`)) }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-right text-muted-foreground text-xs", children: [
                sub.rating,
                " points"
              ] })
            ] })
          ] }, sub.id)) })
        ] })
      ] });
    } })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=app-BinIcplx.mjs.map
