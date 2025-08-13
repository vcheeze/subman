import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Shield, Eye, FileText, Lock, Trash2, Mail } from 'lucide-react';
import { B as Button } from './button-CZzuhyyv.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-B9MMwDqO.mjs';
import { S as Separator } from './separator-cxxmOkB0.mjs';
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
import '@radix-ui/react-separator';

const SplitComponent = function Privacy() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex h-16 max-w-7xl items-center justify-between px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "flex items-center space-x-2", size: "sm", variant: "ghost", children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Back" })
      ] }) }),
      /* @__PURE__ */ jsx(Separator, { className: "h-6", orientation: "vertical" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600", children: /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground text-xl tracking-tight", children: "Subman" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto max-w-4xl px-4 py-12 font-serif text-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 text-sm", children: [
          /* @__PURE__ */ jsx(Shield, { className: "mr-2 h-4 w-4" }),
          "Privacy-First Design"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mb-6 font-bold text-4xl text-foreground lg:text-5xl", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl font-serif text-muted-foreground text-xl", children: "Your privacy is our priority. This policy explains how we collect, use, and protect your data." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground text-sm", children: "Last updated: January 2025" })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "mb-12 border-emerald-200/50 bg-emerald-50/50", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2 text-emerald-800", children: [
          /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("span", { children: "Privacy at a Glance" })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-emerald-800", children: "No Bank Connections" }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-700 text-sm", children: "We never connect to your financial accounts" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-emerald-800", children: "PDFs Not Stored" }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-700 text-sm", children: "Uploaded files are processed and immediately deleted" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-emerald-800", children: "No Data Selling" }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-700 text-sm", children: "Your data is never sold to third parties" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-emerald-800", children: "Full Control" }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-700 text-sm", children: "You can export or delete your data anytime" })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { children: "Information We Collect" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Account Information" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "When you create an account, we collect your email address and encrypted password. We may also collect optional profile information like your name and timezone for personalization." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Subscription Data" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We store the subscription information you manually enter or approve from PDF parsing, including service names, amounts, billing frequencies, and categories. This data is encrypted at rest." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Usage Analytics" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We collect minimal, anonymized usage data to improve our service, such as feature usage patterns and error logs. This data cannot be linked back to individual users." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5 text-purple-600" }),
            /* @__PURE__ */ jsx("span", { children: "How We Use Your Information" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Provide and maintain the Subman service" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Send payment reminders and notifications you've enabled" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Generate insights and analytics for your subscription spending" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Improve our service through anonymized usage analytics" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Respond to support requests and communicate important updates" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5 text-red-600" }),
            /* @__PURE__ */ jsx("span", { children: "PDF Processing & Deletion" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "When you upload a PDF statement for subscription detection:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "The file is encrypted during upload and processing" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "We extract potential subscription information using Amazon Textract" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "The original PDF is permanently deleted within 24 hours of processing" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Only subscription data you approve is saved to your account" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { children: "Data Security" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We implement industry-standard security measures to protect your data:" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "256-bit AES encryption" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "TLS 1.3 for data in transit" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "Optional two-factor authentication" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "Regular security audits" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "Secure cloud infrastructure" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "Access logging and monitoring" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5 text-emerald-600" }),
            /* @__PURE__ */ jsx("span", { children: "Your Rights & Control" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "You have complete control over your data. You can:" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Access all your stored data" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Export your data in JSON format" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Correct or update your information" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Delete your account and all data" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Opt out of non-essential communications" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Request data portability" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-orange-600" }),
            /* @__PURE__ */ jsx("span", { children: "Contact & Updates" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Questions or Concerns?" }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-muted-foreground text-sm leading-relaxed", children: "If you have any questions about this privacy policy or how we handle your data, please contact us at privacy@subman.app." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Policy Updates" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We may update this privacy policy from time to time. We'll notify you of any significant changes via email or through the app. Your continued use of Subman after changes take effect constitutes acceptance of the updated policy." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 border-border border-t pt-8 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-serif text-muted-foreground", children: "Ready to take control of your subscriptions with complete privacy?" }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-blue-600 px-8 text-white hover:bg-blue-700", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Get Started with Subman" }) })
      ] })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=privacy-nmaIFXch.mjs.map
