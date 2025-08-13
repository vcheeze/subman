import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { Shield, EyeClosed, Droplet } from 'lucide-react';
import { motion } from 'motion/react';
import { B as Button } from './button-CZzuhyyv.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription } from './card-B9MMwDqO.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import './ssr.mjs';
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

const SplitComponent = function Home() {
  const subs = [{
    name: "Netflix",
    cost: "$15.99/month",
    logo: "/images/netflix.png"
  }, {
    name: "Spotify",
    cost: "$16.99/month",
    logo: "/images/spotify.png"
  }, {
    name: "ChatGPT",
    cost: "$20/month",
    logo: "/images/openai.png"
  }, {
    name: "Amazon Prime",
    cost: "$14.99/month",
    logo: "/images/prime.png"
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "px-2 pb-2 font-mono lg:px-4 lg:pb-4", children: [
      /* @__PURE__ */ jsxs("nav", { className: "container mx-auto flex max-w-7xl items-center justify-center gap-2 py-4 lg:py-6", children: [
        /* @__PURE__ */ jsx("img", { alt: "logo", className: "h-6", src: "/logo_light.svg" }),
        /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl", children: "Subman" })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { animate: {
        opacity: 1,
        transition: {
          type: "spring"
        }
      }, className: "container mx-auto flex h-[75vh] max-w-7xl flex-col items-center justify-center rounded-2xl bg-muted p-4 text-center lg:p-8", initial: {
        opacity: 0
      }, children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-8 font-semibold font-serif text-4xl lg:text-8xl", children: "Simplicity and Clarity for Your Subscriptions" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-muted-foreground leading-8 lg:text-lg", children: "You don't need another budgeting app. You need to know what's worth your budget." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Gain clarity now" }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground text-xs", children: "Yes, it's free to start." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto max-w-7xl p-10 lg:p-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-16 font-semibold font-serif text-3xl lg:text-6xl", children: "You're Probably Paying for Things You Don't Use \u2014 or Don't Even Want" }),
      /* @__PURE__ */ jsx("div", { className: "mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", children: subs.map((sub) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx("img", { alt: sub.name, className: "h-8", src: sub.logo }),
        /* @__PURE__ */ jsx(CardTitle, { className: "mt-2", children: sub.name }),
        /* @__PURE__ */ jsx(CardDescription, { children: sub.cost })
      ] }) }, sub.name)) }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2 leading-7", children: [
        "We've all said,",
        " ",
        /* @__PURE__ */ jsx("span", { className: "italic", children: "\u201CEh, it's just $15.99.\u201D" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold leading-7", children: "Until \u201Cjust\u201D becomes $159.99/month for things that don't bring us joy or utility." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto max-w-7xl p-10 lg:p-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-16 font-semibold font-serif text-3xl lg:text-6xl", children: "Subman Helps You Cut Through the Noise" }),
      /* @__PURE__ */ jsx("p", { className: "mb-2 leading-7", children: "It's not about spending less." }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold leading-7", children: "It's about spending with intention." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto max-w-7xl p-10 lg:p-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-16 font-semibold font-serif text-3xl lg:text-6xl", children: "Built for those who care where their money \u2014 and data \u2014 goes." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-none border border-dashed p-4 md:p-6", children: [
          /* @__PURE__ */ jsx(Shield, { className: "size-8" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: "No bank connections" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-none border border-dashed p-4 md:p-6", children: [
          /* @__PURE__ */ jsx(EyeClosed, { className: "size-8" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: "No trackers" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-none border border-dashed p-4 md:p-6", children: [
          /* @__PURE__ */ jsx(Droplet, { className: "size-8" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: "Just you, your subs, and clarity" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "p-2 lg:p-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex max-w-7xl flex-col items-center justify-center rounded-2xl bg-muted p-4 text-center lg:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-10 font-semibold font-serif text-3xl lg:mb-16 lg:text-6xl", children: "Reflect Before You Renew." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Gain clarity now" }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-muted-foreground text-xs", children: [
        "No spam, no noise \u2014 just",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "value" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-10 mb-4 font-serif text-xl lg:mt-16 lg:mb-8 lg:text-2xl", children: "Not another expense tracker. Just a better relationship with what you pay for." })
    ] }) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=index-UXRj92vo.mjs.map
