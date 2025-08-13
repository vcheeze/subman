import { jsx } from 'react/jsx-runtime';
import { Outlet } from '@tanstack/react-router';

const SplitComponent = function Authed() {
  return /* @__PURE__ */ jsx("div", { className: "font-mono", children: /* @__PURE__ */ jsx(Outlet, {}) });
};

export { SplitComponent as component };
//# sourceMappingURL=_authed-D53ihHcW.mjs.map
