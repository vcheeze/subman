import { jsxs, jsx } from 'react/jsx-runtime';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet } from '@tanstack/react-router';
import { u as usersQueryOptions } from './ssr.mjs';
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

const SplitComponent = function UsersComponent() {
  const usersQuery = useSuspenseQuery(usersQueryOptions());
  return /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2", children: [
    /* @__PURE__ */ jsx("ul", { className: "list-disc pl-4", children: [...usersQuery.data, {
      id: "i-do-not-exist",
      name: "Non-existent User",
      email: ""
    }].map((user) => {
      return /* @__PURE__ */ jsx("li", { className: "whitespace-nowrap", children: /* @__PURE__ */ jsx(Link, { to: "/users/$userId", params: {
        userId: String(user.id)
      }, className: "block py-1 text-blue-800 hover:text-blue-600", activeProps: {
        className: "text-black font-bold"
      }, children: /* @__PURE__ */ jsx("div", { children: user.name }) }) }, user.id);
    }) }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=users.route-IwoH50Ib.mjs.map
