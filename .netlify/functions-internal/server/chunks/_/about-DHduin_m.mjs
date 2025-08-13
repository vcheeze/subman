import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { Shield, ArrowRight, Check, Upload, FileText, FileSearch, PlusCircle, Bell, PieChart, Smartphone, Lock, Eye, Trash2, ShieldCheck, Search, Plus, TrendingUp, Mail } from 'lucide-react';
import { useState } from 'react';
import { B as Badge } from './badge-CRlTuIex.mjs';
import { B as Button } from './button-CZzuhyyv.mjs';
import { C as Card, d as CardContent } from './card-B9MMwDqO.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import './ssr.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
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

const features = [{
  icon: FileSearch,
  title: "Smart PDF Parsing",
  description: "Upload bank or credit card statements. Our AI detects subscriptions automatically for your review.",
  color: "text-blue-600 bg-blue-100"
}, {
  icon: PlusCircle,
  title: "Manual Control",
  description: "Add, edit, and organize subscriptions exactly how you want. Full control over your data.",
  color: "text-emerald-600 bg-emerald-100"
}, {
  icon: Bell,
  title: "Smart Reminders",
  description: "Get notified before payments are due. Web push notifications and optional email alerts.",
  color: "text-orange-600 bg-orange-100"
}, {
  icon: PieChart,
  title: "Beautiful Insights",
  description: "Visualize spending patterns with interactive charts. See top subscriptions and category breakdowns.",
  color: "text-purple-600 bg-purple-100"
}, {
  icon: Shield,
  title: "Privacy by Design",
  description: "256-bit encryption, no PDF retention, optional 2FA. Your financial data stays secure and private.",
  color: "text-red-600 bg-red-100"
}, {
  icon: Smartphone,
  title: "Progressive Web App",
  description: "Works offline, installs like a native app. Access your subscriptions anywhere, anytime.",
  color: "text-indigo-600 bg-indigo-100"
}];
const privacyFeatures = [{
  icon: Shield,
  title: "No Bank Connections",
  description: "We never connect to your bank accounts or financial institutions. You upload PDFs manually when you choose to."
}, {
  icon: Lock,
  title: "256-Bit Encryption",
  description: "All your data is encrypted with industry-standard 256-bit encryption, both in transit and at rest."
}, {
  icon: Eye,
  title: "You Control Access",
  description: "Optional two-factor authentication and granular privacy controls. You decide what data to share and when."
}, {
  icon: Trash2,
  title: "PDFs Not Retained",
  description: "Uploaded PDFs are processed and immediately deleted. We only keep the subscription data you approve."
}];
const steps = [{
  icon: Upload,
  step: "01",
  title: "Upload Your PDF",
  description: "Drop your bank or credit card statement PDF. We process it securely and delete it immediately.",
  color: "text-blue-600 bg-blue-100"
}, {
  icon: Search,
  step: "02",
  title: "Review Detections",
  description: "Our AI finds potential subscriptions in your statement. You review and approve what to add.",
  color: "text-emerald-600 bg-emerald-100"
}, {
  icon: Plus,
  step: "03",
  title: "Manage Manually",
  description: "Add new subscriptions, edit details, set categories. You have complete control over your data.",
  color: "text-orange-600 bg-orange-100"
}, {
  icon: TrendingUp,
  step: "04",
  title: "Track & Optimize",
  description: "Get insights into your spending patterns, receive reminders, and optimize your subscriptions.",
  color: "text-purple-600 bg-purple-100"
}];
const SplitComponent = function Home() {
  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden py-20 lg:py-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "-z-10 absolute inset-0", children: [
          /* @__PURE__ */ jsx("div", { className: "-translate-x-1/2 absolute top-0 left-1/2 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-32 right-0 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2 lg:gap-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
            /* @__PURE__ */ jsxs(Badge, { className: "bg-primary/20 font-medium text-primary text-sm", children: [
              /* @__PURE__ */ jsx(Shield, { className: "mr-2 h-4 w-4" }),
              "Privacy-First Design"
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "mb-6 font-bold font-serif text-5xl text-foreground leading-tight lg:text-7xl", children: [
              "Take Control of Your",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Subscriptions" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-8 text-muted-foreground leading-7 sm:text-lg", children: "Manual tracking without the bank connections. Upload your PDF statements, review detected subscriptions, and manage everything on your terms." }),
            /* @__PURE__ */ jsxs("div", { className: "mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start", children: [
              /* @__PURE__ */ jsxs(Button, { className: "px-8 py-6 text-lg", size: "lg", children: [
                "Start with PDF Upload",
                /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
              ] }),
              /* @__PURE__ */ jsx(Button, { className: "px-8 py-6 text-lg", size: "lg", variant: "outline", children: "See How It Works" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-6 text-muted-foreground text-sm lg:justify-start", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Check, { className: "mr-2 h-4 w-4 text-emerald-600" }),
                "No bank connections"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Check, { className: "mr-2 h-4 w-4 text-emerald-600" }),
                "256-bit encryption"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Check, { className: "mr-2 h-4 w-4 text-emerald-600" }),
                "PDFs not stored"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center lg:justify-end", children: /* @__PURE__ */ jsx(Card, { className: `w-full max-w-md p-8 transition-all duration-300 ${isDragOver ? "scale-105 border-primary/50 bg-primary/10" : "border-2 border-muted-foreground/30 border-dashed hover:border-primary/40 hover:bg-primary/5"}`, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsx(Upload, { className: "h-8 w-8 text-primary/60" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold text-lg", children: "Upload Your Statement" }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-muted-foreground text-sm", children: "Drop your bank or credit card PDF here, or click to browse" }),
            /* @__PURE__ */ jsxs(Button, { className: "mb-4 w-full border-primary/20 hover:border-primary/50", variant: "outline", children: [
              /* @__PURE__ */ jsx(FileText, { className: "mr-2 h-4 w-4" }),
              "Choose PDF File"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "Supports: Bank statements, credit card statements" })
          ] }) }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-20 lg:py-32", id: "features", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-6 font-bold font-serif text-4xl text-foreground lg:text-6xl", children: [
            "Everything You Need to",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Stay Organized" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-muted-foreground", children: "Subman combines the convenience of automation with the security of manual control. No bank connections, no compromises." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: features.map((feature, index) => /* @__PURE__ */ jsx(Card, { className: "group hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsx("div", { className: `mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`, children: /* @__PURE__ */ jsx(feature.icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("h3", { className: "mb-3 font-semibold text-xl transition-colors group-hover:text-primary", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: feature.description })
        ] }) }, index)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-emerald-50/50 py-20 lg:py-32 dark:bg-[#0E1512]", id: "privacy", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2 lg:gap-16", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 text-sm", children: [
            /* @__PURE__ */ jsx(Shield, { className: "mr-2 h-4 w-4" }),
            "Privacy-First Design"
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "mb-6 font-bold font-serif text-4xl text-foreground lg:text-6xl", children: [
            "Your Data Stays",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: "Yours" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground leading-7", children: "Built from the ground up with privacy in mind. No hidden data collection, no selling to third parties, no unnecessary permissions." }),
          /* @__PURE__ */ jsx("div", { className: "mb-8 space-y-6", children: privacyFeatures.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100", children: /* @__PURE__ */ jsx(feature.icon, { className: "h-5 w-5 text-emerald-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-1 font-semibold", children: feature.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feature.description })
            ] })
          ] }, index)) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "border-emerald-200 hover:bg-emerald-50", size: "lg", variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/privacy", children: "Read Our Privacy Policy" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Card, { className: "border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-blue-50 p-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-10 w-10 text-white" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold text-xl", children: "Privacy Promise" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-muted-foreground text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Data Collection" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-emerald-600", children: "Minimal" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Third-party Sharing" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-emerald-600", children: "Never" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "PDF Retention" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-emerald-600", children: "0 Days" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Your Control" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-emerald-600", children: "Complete" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "-top-3 -left-3 absolute h-8 w-8 animate-pulse rounded-full bg-emerald-200 opacity-50" }),
          /* @__PURE__ */ jsx("div", { className: "-bottom-2 -right-2 absolute h-6 w-6 animate-pulse rounded-full bg-blue-200 opacity-50" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 lg:py-32", id: "how-it-works", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-6 font-bold font-serif text-4xl text-foreground lg:text-6xl", children: [
            "How Subman ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Works" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-muted-foreground", children: "Simple, secure, and completely under your control. Get started in minutes, not hours." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-4", children: steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Card, { className: "group hover:-translate-y-1 h-full border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: `inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-4`, children: /* @__PURE__ */ jsx(step.icon, { className: "h-8 w-8" }) }),
              /* @__PURE__ */ jsx("div", { className: "-top-9 -left-2 absolute flex h-8 w-8 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground text-sm", children: step.step })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 font-semibold text-lg transition-colors group-hover:text-primary", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: step.description })
          ] }) }),
          index < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "-right-8 absolute top-1/2 hidden h-px w-8 bg-gradient-to-r from-border to-transparent lg:block" })
        ] }, index)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-slate-900 py-16 text-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold font-serif text-2xl", children: "Subman" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-md text-slate-400 leading-relaxed", children: "Privacy-first subscription management for the modern user. Take control of your subscriptions without compromising your financial privacy." }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
            /* @__PURE__ */ jsx(Button, { className: "text-slate-400 hover:bg-slate-800 hover:text-white", size: "icon", variant: "ghost", children: /* @__PURE__ */ jsx("svg", { fill: "none", height: "1227", viewBox: "0 0 1200 1227", width: "1200", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z", fill: "currentColor" }) }) }),
            /* @__PURE__ */ jsx(Button, { className: "text-slate-400 hover:bg-slate-800 hover:text-white", size: "icon", variant: "ghost", children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold", children: "Product" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-slate-400", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Features" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Security" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Pricing" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Roadmap" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold", children: "Support" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-slate-400", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Help Center" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Terms of Service" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "transition-colors hover:text-white", href: "#", children: "Contact" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between border-slate-800 border-t pt-8 md:flex-row", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-slate-400 text-sm md:mb-0", children: "\xA9 2025 Subman. All rights reserved." }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-slate-400 text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Shield, { className: "mr-2 h-4 w-4" }),
            "Privacy-first design"
          ] }),
          /* @__PURE__ */ jsx("span", { children: "256-bit encryption" }),
          /* @__PURE__ */ jsx("span", { children: "No data selling" })
        ] })
      ] })
    ] }) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=about-DHduin_m.mjs.map
