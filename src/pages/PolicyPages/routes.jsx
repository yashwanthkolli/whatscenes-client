import { POLICY_CONTENT } from "./"
import { createLazyRoute } from "@/app/lazyRoute"

export const policyRoutes = [
  {
    path: "/policy/terms",
    lazy: createLazyRoute(() => import("./PolicyPage"), {
      props: { currentPage: "terms", ...POLICY_CONTENT.terms },
    }),
  },
  {
    path: "/policy/privacy",
    lazy: createLazyRoute(() => import("./PolicyPage"), {
      props: { currentPage: "privacy", ...POLICY_CONTENT.privacy },
    }),
  },
  {
    path: "/policy/safety",
    lazy: createLazyRoute(() => import("./PolicyPage"), {
      props: { currentPage: "safety", ...POLICY_CONTENT.safety },
    }),
  },
  {
    path: "/policy/refunds",
    lazy: createLazyRoute(() => import("./PolicyPage"), {
      props: { currentPage: "refunds", ...POLICY_CONTENT.refunds },
    }),
  },
  {
    path: "/policy/faq",
    lazy: createLazyRoute(() => import("./PolicyPage"), {
      props: { currentPage: "faq", ...POLICY_CONTENT.faq },
    }),
  },
  {
    path: "/policy/contact",
    lazy: createLazyRoute(() => import("./PolicyPage"), {
      props: { currentPage: "contact", ...POLICY_CONTENT.contact },
    }),
  },
]
