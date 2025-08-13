import { jsx, jsxs } from 'react/jsx-runtime';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useRouteContext, Link } from '@tanstack/react-router';
import { useForm, FormProvider, Controller, useFormContext, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { B as Button } from './button-CZzuhyyv.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-B9MMwDqO.mjs';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { L as Label } from './label-B4bV099y.mjs';
import { c as cn, g as addSubscription } from './ssr.mjs';
import { I as Input } from './input-CYOJz4OI.mjs';
import { T as Textarea } from './textarea-CYvycvKt.mjs';
import 'class-variance-authority';
import '@radix-ui/react-label';
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
import '@polar-sh/tanstack-start';
import '@tanstack/react-router/ssr/server';

const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("grid gap-2", className),
      "data-slot": "form-item",
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      className: cn("data-[error=true]:text-destructive", className),
      "data-error": !!error,
      "data-slot": "form-label",
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      "aria-describedby": error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`,
      "aria-invalid": !!error,
      "data-slot": "form-control",
      id: formItemId,
      ...props
    }
  );
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn("text-muted-foreground text-sm", className),
      "data-slot": "form-description",
      id: formDescriptionId,
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  var _a;
  const { error, formMessageId } = useFormField();
  const body = error ? String((_a = error == null ? void 0 : error.message) != null ? _a : "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn("text-destructive text-sm", className),
      "data-slot": "form-message",
      id: formMessageId,
      ...props,
      children: body
    }
  );
}
const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().min(1, "Amount is required"),
  rating: z.coerce.number().min(1).max(5),
  notes: z.string().optional()
});
const SplitComponent = function RouteComponent() {
  const navigate = useNavigate({
    from: "/subs/add"
  });
  const userId = useRouteContext({
    from: "/_authed/subs/add",
    select: (context) => {
      var _a2;
      var _a;
      return (_a2 = (_a = context.user) == null ? void 0 : _a.id) != null ? _a2 : "";
    }
  });
  const form = useForm({
    resolver: zodResolver(subscriptionSchema)
  });
  const onSubmit = async (values) => {
    try {
      await addSubscription({
        data: {
          ...values,
          userId
        }
      });
      navigate({
        to: "/app"
      });
    } catch {
      toast.error("Something went wrong", {
        description: `${values.name} couldn't be added. Please try again.`
      });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-4 lg:p-8", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: "Add a Sub" }),
      /* @__PURE__ */ jsx(CardDescription, { className: "mb-6", children: "Track how much you pay for - and how much it means to you." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: form.handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "name", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "What's it called?" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "e.g., Netflix, Spotify...", ...field }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "amount", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "How much per month?" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "0.00", step: "0.01", type: "number", ...field }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "rating", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "How much do you value it?" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { max: "5", min: "1", placeholder: "1-5", step: "1", type: "number", ...field }) }),
        /* @__PURE__ */ jsxs(FormDescription, { className: "text-xs", children: [
          "Forget price. Think about how you feel.",
          /* @__PURE__ */ jsx("br", {}),
          `1 = "I wouldn't keep it even if it were free"`,
          /* @__PURE__ */ jsx("br", {}),
          `5 = "I'd hate to live without it"`
        ] }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "notes", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Anything else? (Optional)" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { className: "resize-none", placeholder: "Why you keep it, or what you use it for...", ...field }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 max-sm:flex-col", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "max-sm:w-full", variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/app", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Button, { className: "max-sm:w-full", type: "submit", children: "Add it to my list" })
      ] })
    ] }) }) })
  ] }) });
};

export { SplitComponent as component };
//# sourceMappingURL=subs.add-DfFRdKkw.mjs.map
