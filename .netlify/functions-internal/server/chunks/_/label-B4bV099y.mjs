import { jsx } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import { c as cn } from './ssr.mjs';

function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      className: cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
      ),
      "data-slot": "label",
      ...props
    }
  );
}

export { Label as L };
//# sourceMappingURL=label-B4bV099y.mjs.map
