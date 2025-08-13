import { jsx } from 'react/jsx-runtime';
import { D as DefaultCatchBoundary } from './ssr.mjs';
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

const SplitErrorComponent = (props) => {
  return /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props });
};

export { SplitErrorComponent as errorComponent };
//# sourceMappingURL=_auth-cCfWF6_l.mjs.map
