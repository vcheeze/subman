import { jsx, jsxs } from 'react/jsx-runtime';
import { Star } from 'lucide-react';
import { C as Card, a as CardHeader, c as CardDescription, b as CardTitle, d as CardContent } from './card-B9MMwDqO.mjs';
import './ssr.mjs';
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

const StarRating = ({ rating = 0 }) => {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fillPercentage = Math.max(0, Math.min(1, clampedRating - (i - 1)));
    if (fillPercentage === 0) {
      stars.push(
        /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 text-background", fill: "none" }, i)
      );
    } else if (fillPercentage === 1) {
      stars.push(
        /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 text-[#FFE629]", fill: "currentColor" }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsxs("div", { className: "relative h-6 w-6", children: [
          /* @__PURE__ */ jsx(Star, { className: "absolute h-6 w-6 text-gray-300", fill: "none" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute overflow-hidden",
              style: { width: `${fillPercentage * 100}%` },
              children: /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 text-[#FFE629]", fill: "currentColor" })
            }
          )
        ] }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
    stars,
    /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm", children: clampedRating.toFixed(1) })
  ] });
};
const SplitComponent = function RouteComponent() {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardDescription, { children: "You seem satisfied ;)" }),
      /* @__PURE__ */ jsx(CardTitle, { children: "Your Average Rating" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(StarRating, { rating: 4.7 }) })
  ] }) });
};

export { SplitComponent as component };
//# sourceMappingURL=demo-BpZOwIam.mjs.map
