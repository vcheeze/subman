import { jsxs, jsx } from 'react/jsx-runtime';
import { Sun, Moon } from 'lucide-react';
import { b as useTheme } from './ssr.mjs';
import { B as Button } from './button-CZzuhyyv.mjs';
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from './dropdown-menu-CPTnNY2r.mjs';
import { L as Label } from './label-B4bV099y.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-4nHVEEIF.mjs';
import { S as Separator } from './separator-cxxmOkB0.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
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
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-dropdown-menu';
import '@radix-ui/react-label';
import '@radix-ui/react-select';
import '@radix-ui/react-separator';

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
      /* @__PURE__ */ jsx(Sun, { className: "dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      theme,
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("light"), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("dark"), children: "Dark" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("system"), children: "System" })
    ] })
  ] });
}
const SplitComponent = function Settings() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4 lg:p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-medium text-3xl lg:text-4xl", children: "Settings" }),
    /* @__PURE__ */ jsx(Separator, { className: "my-4 lg:my-8" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Theme" }),
        /* @__PURE__ */ jsx(ModeToggle, {})
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Currency" }),
        /* @__PURE__ */ jsxs(Select, { children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-60", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select currency" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "AED", children: "AED" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "AUD", children: "AUD" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "CAD", children: "CAD" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "GBP", children: "GBP" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "JPY", children: "JPY" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "TWD", children: "TWD" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "USD", children: "USD" })
          ] })
        ] })
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=settings-DHhV2N5W.mjs.map
