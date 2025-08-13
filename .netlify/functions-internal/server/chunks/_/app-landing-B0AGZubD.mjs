import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { X, CheckIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { B as Badge } from './badge-CRlTuIex.mjs';
import { B as Button } from './button-CZzuhyyv.mjs';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from './card-B9MMwDqO.mjs';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { c as cn } from './ssr.mjs';
import { I as Input } from './input-CYOJz4OI.mjs';
import { L as Label } from './label-B4bV099y.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-4nHVEEIF.mjs';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { T as Textarea } from './textarea-CYvycvKt.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@tanstack/react-query';
import '@tanstack/react-router';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
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
import '@radix-ui/react-label';
import '@radix-ui/react-select';

function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      className: cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      ),
      "data-slot": "checkbox",
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          className: "flex items-center justify-center text-current transition-none",
          "data-slot": "checkbox-indicator",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      className: cn("flex flex-col gap-2", className),
      "data-slot": "tabs",
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      className: cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground",
        className
      ),
      "data-slot": "tabs-list",
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      className: cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "tabs-trigger",
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      className: cn("flex-1 outline-none", className),
      "data-slot": "tabs-content",
      ...props
    }
  );
}
const SplitComponent = function RouteComponent() {
  const [inputValue, setInputValue] = useState("");
  const [savedValues, setSavedValues] = useState([]);
  const [expandedItem, setExpandedItem] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const addValue = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !savedValues.includes(trimmedValue)) {
      setSavedValues([...savedValues, trimmedValue]);
      setInputValue("");
    }
  };
  const removeValue = (valueToRemove) => {
    setSavedValues(savedValues.filter((value) => value !== valueToRemove));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center p-6 lg:p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-4 font-serif text-2xl lg:text-3xl", children: "Know the True Value of Your Subscriptions" }),
    /* @__PURE__ */ jsxs("h1", { className: "mb-8 font-semibold font-serif text-3xl lg:text-6xl", children: [
      "Subman (",
      /* @__PURE__ */ jsxs("span", { className: "whitespace-nowrap", children: [
        /* @__PURE__ */ jsx("span", { className: "relative bg-bottom bg-contain bg-no-repeat pb-1 lg:pb-2", style: {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="63.10148" height="10.7553" viewBox="0 0 63.10148 10.7553"><path d="M4.7254,6.24385c.74953-1.16342,2.22421-1.09201,3.45417-1.15422,2.14741-.10861,4.31001-.0021,6.44273,.26458,4.19719,.52484,8.31108,1.63863,12.40424,2.67172,7.63368,1.92671,15.46314,3.64085,23.33831,2.18418,4.45051-.82321,8.45652-2.80963,12.00813-5.57625,1.06608-.83045,.87173-2.66381,0-3.53553-1.05239-1.05239-2.46666-.83262-3.53553,0-13.63069,10.61797-31.22921,.23514-46.05376-.92905C8.42712-.17285,3.06299-.40077,.40804,3.72026c-1.74782,2.71298,2.57851,5.22265,4.31735,2.5236h0Z" fill="%2301010C"/></svg>')`,
          backgroundSize: "100% auto"
        }, children: "Sub" }),
        "scription",
        " "
      ] }),
      /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "relative bg-bottom bg-contain bg-no-repeat pb-1 lg:pb-2", style: {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="63.10148" height="10.7553" viewBox="0 0 63.10148 10.7553"><path d="M4.7254,6.24385c.74953-1.16342,2.22421-1.09201,3.45417-1.15422,2.14741-.10861,4.31001-.0021,6.44273,.26458,4.19719,.52484,8.31108,1.63863,12.40424,2.67172,7.63368,1.92671,15.46314,3.64085,23.33831,2.18418,4.45051-.82321,8.45652-2.80963,12.00813-5.57625,1.06608-.83045,.87173-2.66381,0-3.53553-1.05239-1.05239-2.46666-.83262-3.53553,0-13.63069,10.61797-31.22921,.23514-46.05376-.92905C8.42712-.17285,3.06299-.40077,.40804,3.72026c-1.74782,2.71298,2.57851,5.22265,4.31735,2.5236h0Z" fill="%2301010C"/></svg>')`,
        backgroundSize: "100% auto"
      }, children: "Man" }) }),
      "ager) is here."
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-8 text-muted-foreground", children: "Private, simple, complete control. Enter your subscriptions to start. Add more details later." }),
    /* @__PURE__ */ jsx(Card, { className: "w-full max-w-md", children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center gap-2", children: [
        /* @__PURE__ */ jsx(Input, { onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, placeholder: "Type, and press Enter", value: inputValue }),
        /* @__PURE__ */ jsx(Button, { type: "submit", variant: "outline", children: "Add" })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: savedValues.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: /* @__PURE__ */ jsx(AnimatePresence, { children: savedValues.map((value) => /* @__PURE__ */ jsx(Badge, { asChild: true, className: "flex items-center gap-1 pr-1 transition-colors hover:bg-accent", variant: "outline", children: /* @__PURE__ */ jsxs(motion.div, { animate: {
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }, exit: {
          scale: 0,
          opacity: 0,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 30
          }
        }, initial: {
          scale: 0,
          opacity: 0
        }, layout: true, children: [
          /* @__PURE__ */ jsx("span", { children: value }),
          /* @__PURE__ */ jsx("button", { "aria-label": `Remove ${value}`, className: "ml-1 rounded-full p-0.5 transition-colors hover:bg-accent-foreground/25", onClick: () => removeValue(value), type: "button", children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
        ] }) }, value)) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4", children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setShowDetails(true), variant: "ghost", children: "Add More Details" }),
          /* @__PURE__ */ jsx(Button, { children: "Let's Go!" })
        ] }),
        showDetails && /* @__PURE__ */ jsxs(Tabs, { className: "mt-4", defaultValue: savedValues[0], children: [
          /* @__PURE__ */ jsx(TabsList, { className: "grid w-full grid-cols-1 overflow-x-auto", style: {
            gridTemplateColumns: `repeat(${savedValues.length}, 1fr)`
          }, children: savedValues.map((value) => /* @__PURE__ */ jsx(TabsTrigger, { value, children: value }, value)) }),
          savedValues.map((value) => /* @__PURE__ */ jsx(TabsContent, { value, children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxs(CardTitle, { children: [
                "Subscription Details for ",
                value
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Enter additional details for this subscription." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `amount-${value}`, children: "Amount" }),
                /* @__PURE__ */ jsx(Input, { id: `amount-${value}`, placeholder: "Enter amount (e.g., 9.99)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `currency-${value}`, children: "Currency" }),
                /* @__PURE__ */ jsxs(Select, { defaultValue: "USD", children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: `currency-${value}`, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select currency" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "USD", children: "USD" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "EUR", children: "EUR" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "GBP", children: "GBP" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "JPY", children: "JPY" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `billingCycle-${value}`, children: "Billing Cycle" }),
                /* @__PURE__ */ jsxs(Select, { defaultValue: "monthly", children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: `billingCycle-${value}`, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select billing cycle" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "weekly", children: "Weekly" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "monthly", children: "Monthly" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "quarterly", children: "Quarterly" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "yearly", children: "Yearly" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `startDate-${value}`, children: "Start Date" }),
                /* @__PURE__ */ jsx(Input, { id: `startDate-${value}`, type: "date" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `category-${value}`, children: "Category" }),
                /* @__PURE__ */ jsxs(Select, { children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: `category-${value}`, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select category" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "Entertainment" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "Productivity" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "Utilities" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `notes-${value}`, children: "Notes" }),
                /* @__PURE__ */ jsx(Textarea, { id: `notes-${value}`, placeholder: "Any additional notes" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(Checkbox, { defaultChecked: true, id: `isActive-${value}` }),
                /* @__PURE__ */ jsx(Label, { htmlFor: `isActive-${value}`, children: "Active Subscription" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-end", children: [
                /* @__PURE__ */ jsx(Button, { onClick: () => setShowDetails(false), variant: "outline", children: "Cancel" }),
                /* @__PURE__ */ jsx(Button, { className: "ml-2", children: "Save Details" })
              ] })
            ] })
          ] }) }, value))
        ] })
      ] }) })
    ] }) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=app-landing-B0AGZubD.mjs.map
