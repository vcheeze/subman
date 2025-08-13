import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { AlertCircle, Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { A as Alert, a as AlertTitle, b as AlertDescription, c as authClient } from './auth-client-DlTRlfRh.mjs';
import { B as Button } from './button-CZzuhyyv.mjs';
import { I as Input } from './input-CYOJz4OI.mjs';
import { L as Label } from './label-B4bV099y.mjs';
import { S as Separator } from './separator-cxxmOkB0.mjs';
import { f as Route$2 } from './ssr.mjs';
import 'class-variance-authority';
import '@polar-sh/better-auth';
import 'better-auth/react';
import '@radix-ui/react-slot';
import '@radix-ui/react-label';
import '@radix-ui/react-separator';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import '@radix-ui/react-scroll-area';
import 'clsx';
import 'tailwind-merge';
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

const SplitComponent = function RouteComponent() {
  const {
    redirect
  } = Route$2.useSearch();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(formData.entries());
    try {
      const {
        data,
        error
      } = await authClient.signIn.email({
        ...jsonData,
        callbackURL: redirect
      });
      if ((error == null ? void 0 : error.status) === 401) {
        setFormError((error == null ? void 0 : error.message) || "Something weng wrong while signing you in. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/app"
    });
    console.log("data :>> ", data);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-screen max-w-sm flex-col items-center justify-center p-4 lg:max-w-md lg:p-8", children: [
    /* @__PURE__ */ jsx("img", { alt: "Subman logo", className: "mb-2 size-16", src: "/logo_light.svg" }),
    /* @__PURE__ */ jsx("h1", { className: "mb-2 font-serif text-2xl lg:text-3xl", children: "Welcome to Subman" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-6 text-muted-foreground text-sm", children: [
      "Don't have an account?\xA0",
      /* @__PURE__ */ jsx(Link, { className: "underline", search: {
        redirect
      }, to: "/signup", viewTransition: true, children: "Sign up" })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "w-full space-y-4", onSubmit: handleLogin, children: [
      formError && /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ jsx(AlertCircle, {}),
        /* @__PURE__ */ jsx(AlertTitle, { children: "We couldn't sign you in." }),
        /* @__PURE__ */ jsx(AlertDescription, { children: formError })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Input, { id: "password", name: "password", type: showPassword ? "text" : "password" }),
          /* @__PURE__ */ jsx(Button, { onClick: () => setShowPassword((show) => !show), size: "icon", variant: "outline", children: showPassword ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeClosed, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "mt-2 w-full", children: "Sign In" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-4 flex w-full items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(Separator, { className: "flex-1" }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Or" }),
      /* @__PURE__ */ jsx(Separator, { className: "flex-1" })
    ] }),
    /* @__PURE__ */ jsxs(Button, { className: "flex items-center gap-2", onClick: handleGoogleLogin, size: "lg", variant: "outline", children: [
      /* @__PURE__ */ jsx("img", { alt: "Google G", className: "size-6", src: "/images/g.webp" }),
      "Sign in with Google"
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=signin-B2pJ6qpI.mjs.map
