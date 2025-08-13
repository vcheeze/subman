import { jsxs, jsx } from 'react/jsx-runtime';
import { Shield, Calendar, FileText, Mail } from 'lucide-react';
import { B as Badge } from './badge-CRlTuIex.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-B9MMwDqO.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
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

const SplitComponent = function Privacy() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto min-h-screen max-w-5xl bg-background p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10rounded-lg w-10 items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 text-balance text-center font-extrabold text-4xl tracking-tight", children: "Privacy Policy" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg ", children: "Privacy Policy and Terms of Service" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Last Updated: June 19, 2025" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8", children: [
      /* @__PURE__ */ jsxs(Card, { className: "shadow-lg", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "border-b", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 " }),
            /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl ", children: "Privacy Policy" })
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { className: "text-base", children: "At SubSafe, we value your privacy and are committed to protecting your personal information. Our privacy-first approach means we do not integrate with banks or financial platforms, and we give you full control over your data." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-8 p-8", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "1. Information We Collect" }),
            /* @__PURE__ */ jsx("p", { className: " mb-4", children: "We collect only the information necessary to provide our subscription management services:" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: " rounded-lg p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "User-Provided Information:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 ", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Account Data:" }),
                    " When you sign up, you provide an email address and optional username. This is used to create and manage your account."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Subscription Data:" }),
                    " You may manually enter subscription details or upload PDF bank/credit card statements for parsing. We use Amazon Textract to extract subscription details from PDFs, but we do not store the PDFs after processing."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: " rounded-lg p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Automatically Collected Information:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 ", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Usage Data:" }),
                    " We collect anonymized data on how you interact with SubSafe to improve the app."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Device Data:" }),
                    " Basic information like browser type, operating system, and IP address to ensure compatibility and security."
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-green-200 bg-green-50 p-4", children: [
              /* @__PURE__ */ jsx(Badge, { className: "mb-2 bg-green-100 text-green-800", variant: "secondary", children: "Privacy First" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-green-800", children: "No Bank Integrations: We do not connect to your bank or financial accounts, ensuring your financial data remains private." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "2. How We Use Your Information" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 shrink-0 rounded-full" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "Create and manage your SubSafe account" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 shrink-0 rounded-full" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "Process uploaded PDFs to extract subscription details during onboarding" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 shrink-0 rounded-full" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "Provide subscription tracking, reminders, and data insights" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 shrink-0 rounded-full" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "Send email or push notifications for payment reminders (if enabled)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 shrink-0 rounded-full" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "Improve our app through anonymized analytics" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 shrink-0 rounded-full" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "Ensure security and prevent fraud" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "3. Data Storage and Security" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-amber-200 bg-amber-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-amber-900", children: "No PDF Retention" }),
                /* @__PURE__ */ jsx("p", { className: "text-amber-800", children: "Uploaded PDFs are processed using Amazon Textract and deleted immediately after extracting subscription data." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-blue-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-blue-900", children: "Encryption" }),
                /* @__PURE__ */ jsx("p", { className: "text-blue-800", children: "All data is stored with 256-bit encryption in our secure database (Neon DB)." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-purple-200 bg-purple-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-purple-900", children: "Two-Factor Authentication" }),
                /* @__PURE__ */ jsx("p", { className: "text-purple-800", children: "Optional 2FA via email enhances account security." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "4. Data Sharing" }),
            /* @__PURE__ */ jsx("p", { className: " mb-4", children: "We do not sell, share, or transfer your personal information to third parties, except:" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-l-4 pl-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold ", children: "Service Providers" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "We use Amazon Textract for PDF parsing and Firebase for notifications. These providers are bound by strict data protection agreements." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-l-4 pl-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold ", children: "Legal Requirements" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "We may disclose data if required by law or to protect our rights and safety." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-l-4 pl-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold ", children: "Anonymized Analytics" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "We use aggregated, non-identifiable data to improve SubSafe." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "5. Your Rights" }),
            /* @__PURE__ */ jsx("p", { className: " mb-4", children: "You have full control over your data:" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-green-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-green-900", children: "Access & Edit" }),
                /* @__PURE__ */ jsx("p", { className: "text-green-800 text-sm", children: "View and update your account and subscription data anytime in the app." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-red-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-red-900", children: "Delete" }),
                /* @__PURE__ */ jsx("p", { className: "text-red-800 text-sm", children: "Request deletion of your account and all associated data. We'll delete your data within 30 days." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-blue-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-blue-900", children: "Opt-Out" }),
                /* @__PURE__ */ jsx("p", { className: "text-blue-800 text-sm", children: "Disable notifications or analytics in your account settings." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-purple-50 p-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-purple-900", children: "International Rights" }),
                /* @__PURE__ */ jsx("p", { className: "text-purple-800 text-sm", children: "EU, UK, and California users have additional rights under GDPR or CCPA." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-semibold text-lg", children: "7. Cookies" }),
              /* @__PURE__ */ jsx("p", { className: " text-sm", children: "We use minimal cookies for essential functions. You can manage cookie preferences in your browser settings." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-semibold text-lg", children: "8. Data Retention" }),
              /* @__PURE__ */ jsx("p", { className: " text-sm", children: "Account data is retained while your account is active. Inactive accounts are deleted after 12 months." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "shadow-lg", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: " border-b", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 " }),
            /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl ", children: "Terms of Service" })
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { className: "text-base", children: "Welcome to SubSafe, a privacy-first Progressive Web App for managing your subscriptions. By using our app, you agree to these terms." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-8 p-8", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "1. Using SubSafe" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Eligibility" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "You must be at least 13 years old to use SubSafe. If under 18, you need parental consent." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Account Security" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "You need an account to use SubSafe. Keep your login details secure and don't share them." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "User Responsibilities" }),
                /* @__PURE__ */ jsxs("div", { className: " rounded-lg p-4", children: [
                  /* @__PURE__ */ jsx("p", { className: " mb-2", children: "You agree to:" }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm ", children: [
                    /* @__PURE__ */ jsx("p", { children: "\u2022 Provide accurate subscription details" }),
                    /* @__PURE__ */ jsx("p", { children: "\u2022 Review parsed data from uploaded PDFs" }),
                    /* @__PURE__ */ jsx("p", { children: "\u2022 Use SubSafe for personal, non-commercial purposes only" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold", children: "Prohibited Actions" }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-red-200 bg-red-50 p-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "mb-2 text-red-800", children: "You must not:" }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-red-700 text-sm", children: [
                    /* @__PURE__ */ jsx("p", { children: "\u2022 Attempt to hack, reverse-engineer, or misuse SubSafe" }),
                    /* @__PURE__ */ jsx("p", { children: "\u2022 Upload harmful files or violate any laws" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "2. Freemium Model" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-green-200 bg-green-50 p-6", children: [
                /* @__PURE__ */ jsx(Badge, { className: "mb-3 bg-green-100 text-green-800", children: "Free Tier" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-green-800 text-sm", children: [
                  /* @__PURE__ */ jsx("p", { children: "\u2022 Unlimited subscription tracking" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2022 Payment reminders" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2022 3 PDF parses/month" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2022 Basic insights" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-blue-50 p-6", children: [
                /* @__PURE__ */ jsx(Badge, { className: "mb-3 bg-blue-100 text-blue-800", children: "Premium Tier" }),
                /* @__PURE__ */ jsx("p", { className: "mb-2 font-semibold text-blue-900", children: "$3.99/month or $39.99/year" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-blue-800 text-sm", children: [
                  /* @__PURE__ */ jsx("p", { children: "\u2022 Unlimited PDF parsing" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2022 Advanced insights" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2022 Multi-device sync" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2022 CSV/PDF export" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-amber-800 text-sm", children: [
              /* @__PURE__ */ jsx("strong", { children: "Note:" }),
              " No refunds for premium subscriptions, but you can cancel anytime to prevent future charges."
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "3. Your Content" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-blue-300 border-l-4 pl-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold ", children: "Ownership" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "You own all subscription data you enter or approve from PDF parsing." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-blue-300 border-l-4 pl-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold ", children: "License" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "You grant SubSafe a limited license to process and store your data to provide our services." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-blue-300 border-l-4 pl-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold ", children: "Accuracy" }),
                /* @__PURE__ */ jsx("p", { className: "", children: "You're responsible for ensuring the accuracy of your subscription data." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-semibold text-lg", children: "6. Termination" }),
              /* @__PURE__ */ jsx("p", { className: " mb-2 text-sm", children: "You can delete your account anytime. We may suspend accounts for violating these terms." }),
              /* @__PURE__ */ jsx("p", { className: " text-sm", children: "Termination deletes your data within 30 days." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-semibold text-lg", children: "7. Disclaimers" }),
              /* @__PURE__ */ jsx("p", { className: " mb-2 text-sm", children: `SubSafe is provided "as is." We don't guarantee 100% accuracy of PDF parsing.` }),
              /* @__PURE__ */ jsx("p", { className: " text-sm", children: "We're not responsible for financial decisions based on SubSafe's data." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "bg-linear-to-r from-blue-50 to-slate-50 shadow-lg", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsx(Mail, { className: "mx-auto mb-4 h-8 w-8" }),
        /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold text-xl", children: "Questions or Concerns?" }),
        /* @__PURE__ */ jsx("p", { className: " mb-4", children: "We're here to help with any questions about our Privacy Policy or Terms of Service." }),
        /* @__PURE__ */ jsxs("a", { className: "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors hover:bg-blue-700", href: "mailto:support@subsafe.app", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
          "support@subsafe.app"
        ] })
      ] }) })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=terms-AZuKBjzh.mjs.map
