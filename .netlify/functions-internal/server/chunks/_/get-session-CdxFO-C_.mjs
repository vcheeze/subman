import { h as createServerRpc, i as createServerFn, j as getWebRequest, k as auth } from './ssr.mjs';
import 'react/jsx-runtime';
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

const getSession_createServerFn_handler = createServerRpc("src_server_get-session_ts--getSession_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getSession.__executeServer(opts, signal);
});
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async () => {
  const request = getWebRequest();
  return await auth.api.getSession({
    headers: request.headers
  });
});

export { getSession_createServerFn_handler };
//# sourceMappingURL=get-session-CdxFO-C_.mjs.map
