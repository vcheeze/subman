import { eq } from 'drizzle-orm';
import { h as createServerRpc, i as createServerFn, l as db, s as subscription } from './ssr.mjs';
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
import 'zod';
import '@polar-sh/tanstack-start';
import '@tanstack/react-router/ssr/server';

const fetchSubscriptions_createServerFn_handler = createServerRpc("src_queries_subscriptions_ts--fetchSubscriptions_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchSubscriptions.__executeServer(opts, signal);
});
const addSubscription_createServerFn_handler = createServerRpc("src_queries_subscriptions_ts--addSubscription_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return addSubscription.__executeServer(opts, signal);
});
const fetchSubscriptions = createServerFn({
  method: "GET"
}).validator((d) => d).handler(fetchSubscriptions_createServerFn_handler, async ({
  data: userId
}) => {
  console.info("Fetching subscriptions...");
  const subscriptions = await db.query.subscription.findMany({
    where: eq(subscription.userId, userId)
  });
  return subscriptions;
});
const addSubscription = createServerFn({
  method: "POST"
}).validator((d) => d).handler(addSubscription_createServerFn_handler, async ({
  data
}) => {
  console.info("Adding subscription...");
  const sub = await db.insert(subscription).values(data);
  return sub;
});

export { addSubscription_createServerFn_handler, fetchSubscriptions_createServerFn_handler };
//# sourceMappingURL=subscriptions-CRBGyG3w.mjs.map
