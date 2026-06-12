import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { X, M as MessageCircle, T as TriangleAlert, S as Send } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-D7gFX-8u.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const EMERGENCY = ["mareo", "mareos", "sudor", "sudores", "desmayo", "desmayos", "mal", "vision borrosa", "visión borrosa", "nauseas", "náuseas"];
const GREETINGS = ["hola", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "hi", "hey"];
function norm(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function botReply(text) {
  const t = norm(text);
  if (EMERGENCY.some((k) => t.includes(norm(k)))) {
    return {
      text: "⚠️ ALERTA: Los síntomas que describes pueden ser graves. Acude de INMEDIATO a tu posta médica más cercana o llama al 106 (SAMU). No esperes.",
      alert: true
    };
  }
  if (GREETINGS.some((k) => t.includes(norm(k)))) {
    return {
      text: "¡Hola! Soy el Asistente Virtual de GlucoTech PE. Puedo orientarte sobre controles de glucosa, triaje y síntomas. ¿En qué te ayudo?"
    };
  }
  if (t.includes("ayuno") || t.includes("ayunas") || t.includes("requisito")) {
    return {
      text: "Para una medición confiable en ayunas: no comas ni bebas (excepto agua) durante 8 horas antes. Lleva tu carnet y medicación habitual."
    };
  }
  if (t.includes("medir") || t.includes("glucosa") || t.includes("glucómetro")) {
    return {
      text: "Lava tus manos, coloca una tira nueva en el glucómetro, pincha el lateral del dedo y aplica la gota. Registra el valor en tu ficha de Triaje."
    };
  }
  if (t.includes("posta") || t.includes("contacto") || t.includes("contactar")) {
    return {
      text: "Puedes acudir a la posta más cercana o registrar tus datos en la pestaña 'Triaje' del sistema para que un profesional te contacte."
    };
  }
  if (t.includes("triaje") || t.includes("formulario") || t.includes("registrar")) {
    return {
      text: "Ve a tu Ficha de Paciente y completa la pestaña 'Triaje'. Allí tu posta podrá revisar tus valores y priorizar tu atención."
    };
  }
  if (t.includes("riesgo") || t.includes("nivel")) {
    return {
      text: "El sistema clasifica tu riesgo en Normal, Medio o Alto según tu glucemia, estado de medición y síntomas reportados. Tu médico revisa cada ficha."
    };
  }
  return {
    text: "Puedo ayudarte con mediciones de glucosa, triaje, síntomas y contacto con tu posta. Usa los botones rápidos o escribe tu consulta."
  };
}
const QUICK = [
  { label: "¿Requisitos para medirme?", text: "¿Cuáles son los requisitos para medirme la glucosa?" },
  { label: "Contactar posta", text: "¿Cómo contacto a mi posta?" },
  { label: "¿Cómo mido mi glucosa?", text: "¿Cómo mido mi glucosa?" }
];
const BRAND = "#085041";
const BRAND_CTA = "#1d9e75";
function ChatbotWidget() {
  const [open, setOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([
    {
      id: 1,
      from: "bot",
      text: "Hola, soy el Asistente Virtual de GlucoTech PE. Puedo orientarte sobre glucosa, triaje y síntomas. Si tienes mareo, sudor o desmayo, acude a tu posta de inmediato."
    }
  ]);
  const [input, setInput] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  const nextId = reactExports.useRef(2);
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);
  function send(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg = { id: nextId.current++, from: "user", text: trimmed };
    const reply = botReply(trimmed);
    const botMsg = { id: nextId.current++, from: "bot", ...reply };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": open ? "Cerrar chat de asistencia" : "Abrir chat de asistencia",
        onClick: () => setOpen((v) => !v),
        className: "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105",
        style: { backgroundColor: BRAND_CTA, color: "white" },
        children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-label": "Asistente Virtual GlucoTech PE",
        className: "fixed bottom-24 right-5 z-50 flex w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl",
        style: { height: "min(560px, 75vh)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-3 text-white",
              style: { backgroundColor: BRAND },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold leading-tight", children: "GlucoTech PE · Asistente" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] opacity-90", children: "Orientación sobre glucosa y triaje" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Cerrar",
                    onClick: () => setOpen(false),
                    className: "rounded p-1 hover:bg-white/10",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "flex-1 space-y-2 overflow-y-auto bg-[#f4faf8] p-3", children: messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex ${m.from === "user" ? "justify-end" : "justify-start"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm ${m.from === "user" ? "rounded-br-sm text-white" : m.alert ? "rounded-bl-sm border border-[#f7c1c1] bg-[#fcebeb] text-[#791f1f]" : "rounded-bl-sm border border-[#ecf0f1] bg-white text-[#2c3e50]"}`,
                  style: m.from === "user" ? { backgroundColor: BRAND_CTA } : void 0,
                  children: [
                    m.alert && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-1 text-xs font-semibold uppercase", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
                      " Emergencia"
                    ] }),
                    m.text
                  ]
                }
              )
            },
            m.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 border-t bg-white px-3 py-2", children: QUICK.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => send(q.text),
              className: "rounded-full border border-[#ecf0f1] px-2.5 py-1 text-[11px] text-[#2c3e50] transition hover:border-[#0f6e56] hover:text-[#0f6e56]",
              children: q.label
            },
            q.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                send(input);
              },
              className: "flex items-center gap-2 border-t bg-white p-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    placeholder: "Escribe tu mensaje...",
                    "aria-label": "Mensaje",
                    className: "flex-1 rounded-full border border-[#ecf0f1] px-3 py-2 text-sm outline-none focus:border-[#1d9e75]"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    "aria-label": "Enviar",
                    className: "flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90",
                    style: { backgroundColor: BRAND_CTA },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GlucoTech PE" },
      { name: "description", content: "Plataforma de monitoreo de diabetes para pacientes y centros de salud." },
      { name: "author", content: "GlucoTech PE" },
      { property: "og:title", content: "GlucoTech PE" },
      { property: "og:description", content: "Control y triaje de diabetes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$1.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChatbotWidget, {})
  ] });
}
const APP_NAME = "GlucoTech PE";
const $$splitComponentImporter = () => import("./index-D1gB76ST.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: `${APP_NAME} — Monitoreo de Diabetes`
    }, {
      name: "description",
      content: "Plataforma de telemonitoreo de diabetes para pacientes y centros de salud en Perú."
    }, {
      property: "og:title",
      content: APP_NAME
    }, {
      property: "og:description",
      content: "Control y triaje de diabetes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  APP_NAME as A,
  router as r
};
