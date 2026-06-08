import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as APP_NAME } from "./router-BgOfPIX5.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, b as Legend, P as PieChart, c as Pie, d as Cell, B as BarChart, e as Bar } from "../_libs/recharts.mjs";
import { F as Funnel, a as Search, X, C as ChevronLeft, b as ChevronRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function PatientIllustration() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 120 120", className: "h-full w-full", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "pat-bg", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#E1F5EE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#9FE1CB" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "pat-shirt", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#1D9E75" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0F6E56" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "60", r: "56", fill: "url(#pat-bg)", className: "animate-pulse", style: { animationDuration: "3s" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "origin-center animate-[float_3s_ease-in-out_infinite]", style: { transformOrigin: "60px 60px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "98", rx: "28", ry: "6", fill: "#085041", opacity: "0.12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "38", r: "18", fill: "#F4D0B0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M42 38 C42 28 50 22 60 22 C70 22 78 28 78 38", fill: "#2C1810" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "38", y: "54", width: "44", height: "36", rx: "10", fill: "url(#pat-shirt)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "48", y: "68", width: "24", height: "4", rx: "2", fill: "#E1F5EE", opacity: "0.6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "76", r: "6", fill: "#E1F5EE", opacity: "0.4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "58", width: "12", height: "28", rx: "6", fill: "url(#pat-shirt)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "78", y: "58", width: "12", height: "28", rx: "6", fill: "url(#pat-shirt)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "46", y: "88", width: "12", height: "22", rx: "6", fill: "#2C3E50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "62", y: "88", width: "12", height: "22", rx: "6", fill: "#2C3E50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "72", y: "62", width: "18", height: "24", rx: "4", fill: "#fff", stroke: "#0F6E56", strokeWidth: "2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "76", y1: "70", x2: "86", y2: "70", stroke: "#1D9E75", strokeWidth: "2", strokeLinecap: "round" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "76", y1: "76", x2: "84", y2: "76", stroke: "#5DCAA5", strokeWidth: "2", strokeLinecap: "round" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "81", cy: "82", r: "3", fill: "#A32D2D", className: "animate-pulse" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }` })
  ] });
}
function DoctorIllustration() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 120 120", className: "h-full w-full", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "doc-bg", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#E1F5EE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#C0DD97" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "doc-coat", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#fff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#E8F6F0" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "60", r: "56", fill: "url(#doc-bg)", className: "animate-pulse", style: { animationDuration: "3.5s" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "origin-center animate-[float_3.5s_ease-in-out_infinite]", style: { transformOrigin: "60px 60px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "98", rx: "28", ry: "6", fill: "#085041", opacity: "0.12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "36", r: "17", fill: "#E8C4A8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M43 36 C43 26 50 20 60 20 C70 20 77 26 77 36", fill: "#4A3728" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "36", y: "52", width: "48", height: "40", rx: "8", fill: "url(#doc-coat)", stroke: "#0F6E56", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M52 52 L60 64 L68 52", fill: "none", stroke: "#085041", strokeWidth: "2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "54", y: "64", width: "12", height: "20", rx: "2", fill: "#085041" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "72", r: "4", fill: "#1D9E75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "28", y: "56", width: "10", height: "26", rx: "5", fill: "url(#doc-coat)", stroke: "#0F6E56", strokeWidth: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "82", y: "56", width: "10", height: "26", rx: "5", fill: "url(#doc-coat)", stroke: "#0F6E56", strokeWidth: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "33", cy: "84", r: "5", fill: "#1D9E75", className: "animate-pulse", style: { animationDuration: "2s" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "46", y: "90", width: "13", height: "20", rx: "6", fill: "#2C3E50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "61", y: "90", width: "13", height: "20", rx: "6", fill: "#2C3E50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "78", y: "48", width: "16", height: "20", rx: "3", fill: "#085041", opacity: "0.9" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "86", cy: "54", r: "4", fill: "#5DCAA5", className: "animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M82 62 L90 62", stroke: "#9FE1CB", strokeWidth: "1.5", strokeLinecap: "round" })
    ] })
  ] });
}
const HISTORY_PAGE_SIZE = 5;
const DOCTOR_PAGE_SIZE = 8;
const POSTAS = ["Surquillo", "Mirones", "San Isidro", "Breña", "La Victoria", "Barranco"];
const SYMPTOM_LIST = ["Mucha sed", "Orinar seguido", "Mucha hambre", "Pérdida de peso", "Visión borrosa", "Cansancio extremo", "Mareos/sudoración fría", "Heridas que tardan en sanar", "Adormecimiento en pies"];
const SEVERE_SYMPTOMS = /* @__PURE__ */ new Set(["Visión borrosa", "Mareos/sudoración fría", "Pérdida de peso", "Heridas que tardan en sanar"]);
function classify(r) {
  const g = Number(r.glucosa);
  const hasSevere = r.sintomas.some((s) => SEVERE_SYMPTOMS.has(s));
  const manySymptoms = r.sintomas.length >= 4;
  const extremeGlucose = g > 180 || g > 0 && g < 70;
  if (extremeGlucose || hasSevere || manySymptoms) return "alto";
  const limitGlucose = r.estadoGlucosa === "Ayunas" ? g > 130 : g > 180;
  if (limitGlucose || r.sintomas.length >= 2) return "medio";
  return "normal";
}
const LS_USERS = "glucotech_users_v2";
const LS_RECORDS = "glucotech_records_v2";
const LS_SESSION = "glucotech_session_v2";
const DAY = 864e5;
const seedUsers = [{
  dni: "11111111",
  password: "doctor",
  nombres: "Dr. Gregory House",
  fechaNac: "1959-06-11",
  edad: "66",
  telefono: "987654321",
  direccion: "Av. Diagnóstico 221B",
  posta: "San Isidro",
  role: "medico"
}, {
  dni: "72345612",
  password: "demo2026",
  nombres: "María Elena Vargas",
  fechaNac: "1968-04-15",
  edad: "57",
  telefono: "999111222",
  direccion: "Jr. Salud 45, Surquillo",
  posta: "Surquillo",
  role: "paciente"
}, {
  dni: "45678901",
  password: "paciente1",
  nombres: "Carlos Mendieta",
  fechaNac: "1975-09-22",
  edad: "50",
  telefono: "988776655",
  direccion: "Av. Los Olivos 120",
  posta: "Mirones",
  role: "paciente"
}, {
  dni: "33445566",
  password: "paciente2",
  nombres: "Rosa Huamán",
  fechaNac: "1982-01-08",
  edad: "43",
  telefono: "977665544",
  direccion: "Calle Breña 88",
  posta: "Breña",
  role: "paciente"
}];
const seedRecords = [{
  id: "r01",
  createdAt: Date.now() - 2 * DAY,
  dni: "72345612",
  nombres: "María Elena Vargas",
  edad: "57",
  posta: "Surquillo",
  pa: "118/76",
  fc: "74",
  peso: "67",
  talla: "1.58",
  imc: "26.8",
  glucosa: "108",
  estadoGlucosa: "Ayunas",
  sintomas: []
}, {
  id: "r02",
  createdAt: Date.now() - 5 * DAY,
  dni: "72345612",
  nombres: "María Elena Vargas",
  edad: "57",
  posta: "Surquillo",
  pa: "122/80",
  fc: "78",
  peso: "67",
  talla: "1.58",
  imc: "26.8",
  glucosa: "142",
  estadoGlucosa: "Post-prandial",
  sintomas: ["Mucha sed"]
}, {
  id: "r03",
  createdAt: Date.now() - 8 * DAY,
  dni: "72345612",
  nombres: "María Elena Vargas",
  edad: "57",
  posta: "Surquillo",
  pa: "125/82",
  fc: "80",
  peso: "68",
  talla: "1.58",
  imc: "27.2",
  glucosa: "135",
  estadoGlucosa: "Post-prandial",
  sintomas: ["Mucha sed", "Cansancio extremo"]
}, {
  id: "r04",
  createdAt: Date.now() - 12 * DAY,
  dni: "72345612",
  nombres: "María Elena Vargas",
  edad: "57",
  posta: "Surquillo",
  pa: "120/78",
  fc: "76",
  peso: "68",
  talla: "1.58",
  imc: "27.2",
  glucosa: "98",
  estadoGlucosa: "Ayunas",
  sintomas: []
}, {
  id: "r05",
  createdAt: Date.now() - 18 * DAY,
  dni: "72345612",
  nombres: "María Elena Vargas",
  edad: "57",
  posta: "Surquillo",
  pa: "128/84",
  fc: "82",
  peso: "68",
  talla: "1.58",
  imc: "27.2",
  glucosa: "168",
  estadoGlucosa: "Post-prandial",
  sintomas: ["Visión borrosa"]
}, {
  id: "r06",
  createdAt: Date.now() - 25 * DAY,
  dni: "72345612",
  nombres: "María Elena Vargas",
  edad: "57",
  posta: "Surquillo",
  pa: "115/75",
  fc: "72",
  peso: "67",
  talla: "1.58",
  imc: "26.8",
  glucosa: "112",
  estadoGlucosa: "Ayunas",
  sintomas: []
}, {
  id: "r07",
  createdAt: Date.now() - 3 * DAY,
  dni: "45678901",
  nombres: "Carlos Mendieta",
  edad: "50",
  posta: "Mirones",
  pa: "130/85",
  fc: "84",
  peso: "82",
  talla: "1.72",
  imc: "27.7",
  glucosa: "195",
  estadoGlucosa: "Post-prandial",
  sintomas: ["Mucha sed", "Orinar seguido", "Visión borrosa", "Cansancio extremo"]
}, {
  id: "r08",
  createdAt: Date.now() - 10 * DAY,
  dni: "45678901",
  nombres: "Carlos Mendieta",
  edad: "50",
  posta: "Mirones",
  pa: "126/82",
  fc: "80",
  peso: "81",
  talla: "1.72",
  imc: "27.4",
  glucosa: "118",
  estadoGlucosa: "Ayunas",
  sintomas: []
}, {
  id: "r09",
  createdAt: Date.now() - 20 * DAY,
  dni: "45678901",
  nombres: "Carlos Mendieta",
  edad: "50",
  posta: "Mirones",
  pa: "124/80",
  fc: "78",
  peso: "81",
  talla: "1.72",
  imc: "27.4",
  glucosa: "128",
  estadoGlucosa: "Post-prandial",
  sintomas: ["Mucha hambre"]
}, {
  id: "r10",
  createdAt: Date.now() - 1 * DAY,
  dni: "33445566",
  nombres: "Rosa Huamán",
  edad: "43",
  posta: "Breña",
  pa: "118/74",
  fc: "70",
  peso: "62",
  talla: "1.55",
  imc: "25.8",
  glucosa: "102",
  estadoGlucosa: "Ayunas",
  sintomas: []
}, {
  id: "r11",
  createdAt: Date.now() - 7 * DAY,
  dni: "33445566",
  nombres: "Rosa Huamán",
  edad: "43",
  posta: "Breña",
  pa: "120/76",
  fc: "72",
  peso: "62",
  talla: "1.55",
  imc: "25.8",
  glucosa: "138",
  estadoGlucosa: "Post-prandial",
  sintomas: ["Mucha sed"]
}, {
  id: "r12",
  createdAt: Date.now() - 15 * DAY,
  dni: "33445566",
  nombres: "Rosa Huamán",
  edad: "43",
  posta: "Breña",
  pa: "116/72",
  fc: "68",
  peso: "61",
  talla: "1.55",
  imc: "25.4",
  glucosa: "95",
  estadoGlucosa: "Ayunas",
  sintomas: []
}];
function loadJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, v) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
  }
}
function Index() {
  const [users, setUsers] = reactExports.useState(() => {
    const u = loadJSON(LS_USERS, []);
    return u.length ? u : seedUsers;
  });
  const [records, setRecords] = reactExports.useState(() => {
    const r = loadJSON(LS_RECORDS, []);
    return r.length ? r : seedRecords;
  });
  const [screen, setScreen] = reactExports.useState(() => {
    const s = loadJSON(LS_SESSION, null);
    return s ?? {
      name: "landing"
    };
  });
  reactExports.useEffect(() => saveJSON(LS_USERS, users), [users]);
  reactExports.useEffect(() => saveJSON(LS_RECORDS, records), [records]);
  reactExports.useEffect(() => saveJSON(LS_SESSION, screen), [screen]);
  const currentUser = screen.name === "app" ? users.find((u) => u.dni === screen.userDni) ?? null : null;
  const logout = () => setScreen({
    name: "landing"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen text-foreground", style: {
    fontFamily: "Inter, system-ui, sans-serif",
    background: "radial-gradient(1200px 600px at 10% -10%, oklch(0.93 0.02 230 / 0.6), transparent), radial-gradient(900px 500px at 100% 0%, oklch(0.94 0.015 200 / 0.5), transparent), var(--background)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { user: currentUser, onLogout: logout, onHome: () => setScreen({
      name: "landing"
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6", children: [
      screen.name === "landing" && /* @__PURE__ */ jsxRuntimeExports.jsx(Landing, { onPick: (role) => setScreen({
        name: "auth",
        role,
        mode: "login"
      }) }),
      screen.name === "auth" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScreen, { role: screen.role, mode: screen.mode, users, onSwitch: (mode) => setScreen({
        name: "auth",
        role: screen.role,
        mode
      }), onBack: () => setScreen({
        name: "landing"
      }), onLogin: (dni) => setScreen({
        name: "app",
        userDni: dni
      }), onRegister: (u) => {
        setUsers((p) => [...p, u]);
        setScreen({
          name: "app",
          userDni: u.dni
        });
      }, onResetPassword: (dni, pw) => setUsers((p) => p.map((x) => x.dni === dni ? {
        ...x,
        password: pw
      } : x)) }),
      screen.name === "app" && currentUser?.role === "paciente" && /* @__PURE__ */ jsxRuntimeExports.jsx(PatientApp, { user: currentUser, records: records.filter((r) => r.dni === currentUser.dni), onSave: (r) => setRecords((prev) => [r, ...prev]) }),
      screen.name === "app" && currentUser?.role === "medico" && /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorApp, { user: currentUser, records }),
      screen.name === "app" && !currentUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 text-center", children: [
        "Sesión inválida. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: logout, className: "text-primary underline", children: "Volver" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mx-auto max-w-7xl px-6 pb-8 pt-4 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      APP_NAME,
      " · Plataforma de monitoreo de diabetes"
    ] })
  ] });
}
function Header({
  user,
  onLogout,
  onHome
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-20 border-b border-border/60 bg-card/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onHome, className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-lg", style: {
        background: "var(--gradient-hero)"
      }, children: "GT" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold tracking-tight", children: APP_NAME }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: "Monitoreo de Diabetes" })
      ] })
    ] }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden text-right sm:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold leading-tight", children: [
          "Bienvenido, ",
          user.nombres.split(" ")[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: user.role === "medico" ? "Vista Médico" : "Vista Paciente" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white shadow-md", style: {
        background: "var(--gradient-card)"
      }, children: user.nombres.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onLogout, className: "rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted", children: "Cerrar sesión" })
    ] })
  ] }) });
}
function Landing({
  onPick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-10 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
        " Salud digital"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl", children: [
        "Controla tu diabetes,",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent", style: {
          backgroundImage: "var(--gradient-hero)"
        }, children: "conecta con tu posta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 max-w-xl text-base text-muted-foreground sm:text-lg", children: [
        APP_NAME,
        " une a pacientes y médicos en tiempo real: registra tu triaje y síntomas, recibe seguimiento profesional y prevén complicaciones."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { title: "Soy Paciente", desc: "Registra tu glucemia y síntomas. Tu médico te seguirá.", illustration: /* @__PURE__ */ jsxRuntimeExports.jsx(PatientIllustration, {}), onClick: () => onPick("paciente"), gradient: "var(--gradient-hero)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { title: "Soy Médico", desc: "Visualiza pacientes priorizados y analiza tendencias.", illustration: /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorIllustration, {}), onClick: () => onPick("medico"), gradient: "var(--gradient-card)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl opacity-30 blur-3xl", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl border border-border bg-card p-6 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Tendencia glucémica" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-[oklch(0.4_0.15_155)]", children: "En rango" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: [{
          d: "L",
          g: 110
        }, {
          d: "M",
          g: 125
        }, {
          d: "X",
          g: 118
        }, {
          d: "J",
          g: 140
        }, {
          d: "V",
          g: 105
        }, {
          d: "S",
          g: 120
        }, {
          d: "D",
          g: 115
        }], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.02 230)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "d", stroke: "oklch(0.5 0.04 250)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.5 0.04 250)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "g", stroke: "var(--primary)", strokeWidth: 3, dot: {
            r: 4,
            fill: "var(--primary)"
          } })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-3 text-center", children: [{
          l: "Promedio",
          v: "119"
        }, {
          l: "Mínimo",
          v: "105"
        }, {
          l: "Máximo",
          v: "140"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-primary", children: s.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: s.l })
        ] }, s.l)) })
      ] })
    ] })
  ] }) });
}
function RoleCard({
  title,
  desc,
  illustration,
  onClick,
  gradient
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1", style: {
      background: gradient
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-brand-100)] bg-[var(--color-brand-050)] shadow-md", children: illustration }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all", children: "Continuar →" })
  ] });
}
function AuthScreen({
  role,
  mode,
  users,
  onSwitch,
  onBack,
  onLogin,
  onRegister,
  onResetPassword
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onBack, className: "mb-4 text-sm text-muted-foreground hover:text-foreground", children: "← Volver al inicio" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1.5", style: {
        background: role === "medico" ? "var(--gradient-card)" : "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs font-semibold uppercase tracking-widest text-primary", children: role === "medico" ? "Acceso médico" : "Acceso paciente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold tracking-tight", children: [
          mode === "login" && "Inicia sesión",
          mode === "register" && "Crea tu cuenta",
          mode === "forgot" && "Recupera tu contraseña"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          mode === "login" && "Ingresa con tu DNI y contraseña.",
          mode === "register" && "Completa todos los campos para registrarte.",
          mode === "forgot" && "Ingresa tu DNI para restablecer."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, { role, users, onLogin }),
          mode === "register" && /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, { role, users, onRegister }),
          mode === "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsx(ForgotForm, { users, onResetPassword, onDone: () => onSwitch("login") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-sm", children: [
          mode !== "login" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSwitch("login"), className: "text-primary hover:underline", children: "Iniciar sesión" }),
          mode !== "register" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSwitch("register"), className: "text-primary hover:underline", children: "Crear cuenta" }),
          mode !== "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSwitch("forgot"), className: "text-muted-foreground hover:text-foreground", children: "¿Olvidaste tu contraseña?" })
        ] })
      ] })
    ] })
  ] });
}
const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium", children: label }),
    children
  ] });
}
function btnPrimary(extra = "") {
  return `w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 ${extra}`;
}
function LoginForm({
  role,
  users,
  onLogin
}) {
  const [dni, setDni] = reactExports.useState("");
  const [pw, setPw] = reactExports.useState("");
  const [err, setErr] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    const u = users.find((x) => x.dni === dni.trim() && x.password === pw && x.role === role);
    if (!u) return setErr("DNI o contraseña incorrectos para este rol.");
    onLogin(u.dni);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "DNI", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: dni, onChange: (e) => setDni(e.target.value), placeholder: "00000000", required: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contraseña", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", className: inputCls, value: pw, onChange: (e) => setPw(e.target.value), required: true }) }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: btnPrimary(), style: {
      background: "var(--gradient-hero)"
    }, children: "Entrar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[11px] text-muted-foreground", children: [
      "Cuenta demo: ",
      role === "medico" ? "DNI 11111111 / doctor" : "DNI 72345612 / demo2026"
    ] })
  ] });
}
function RegisterForm({
  role,
  users,
  onRegister
}) {
  const [u, setU] = reactExports.useState({
    dni: "",
    password: "",
    nombres: "",
    fechaNac: "",
    edad: "",
    telefono: "",
    direccion: "",
    posta: POSTAS[0],
    role
  });
  const [pw2, setPw2] = reactExports.useState("");
  const [err, setErr] = reactExports.useState(null);
  const set = (k, v) => setU((p) => ({
    ...p,
    [k]: v
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: (e) => {
    e.preventDefault();
    if (Object.values(u).some((v) => v === "")) return setErr("Completa todos los campos.");
    if (u.password !== pw2) return setErr("Las contraseñas no coinciden.");
    if (users.some((x) => x.dni === u.dni)) return setErr("Ya existe una cuenta con ese DNI.");
    onRegister(u);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombres y Apellidos", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: u.nombres, onChange: (e) => set("nombres", e.target.value), required: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "DNI", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: u.dni, onChange: (e) => set("dni", e.target.value), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: u.telefono, onChange: (e) => set("telefono", e.target.value), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fecha de Nacimiento", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: inputCls, value: u.fechaNac, onChange: (e) => set("fechaNac", e.target.value), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Edad", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: inputCls, value: u.edad, onChange: (e) => set("edad", e.target.value), required: true }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Dirección", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: u.direccion, onChange: (e) => set("direccion", e.target.value), required: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Posta de Salud", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: u.posta, onChange: (e) => set("posta", e.target.value), children: POSTAS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: p }, p)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contraseña", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", className: inputCls, value: u.password, onChange: (e) => set("password", e.target.value), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirmar contraseña", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", className: inputCls, value: pw2, onChange: (e) => setPw2(e.target.value), required: true }) })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: btnPrimary(), style: {
      background: "var(--gradient-hero)"
    }, children: "Crear cuenta" })
  ] });
}
function ForgotForm({
  users,
  onResetPassword,
  onDone
}) {
  const [dni, setDni] = reactExports.useState("");
  const [pw, setPw] = reactExports.useState("");
  const [pw2, setPw2] = reactExports.useState("");
  const [err, setErr] = reactExports.useState(null);
  const [ok, setOk] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: (e) => {
    e.preventDefault();
    if (!users.find((x) => x.dni === dni.trim())) return setErr("No existe un usuario con ese DNI.");
    if (!pw || pw !== pw2) return setErr("Las contraseñas no coinciden.");
    onResetPassword(dni.trim(), pw);
    setOk(true);
    setTimeout(onDone, 1200);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "DNI", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: dni, onChange: (e) => setDni(e.target.value), required: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nueva contraseña", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", className: inputCls, value: pw, onChange: (e) => setPw(e.target.value), required: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirmar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", className: inputCls, value: pw2, onChange: (e) => setPw2(e.target.value), required: true }) }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive", children: err }),
    ok && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-success/15 px-3 py-2 text-xs text-[oklch(0.35_0.15_155)]", children: "Contraseña actualizada. Redirigiendo…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: btnPrimary(), style: {
      background: "var(--gradient-hero)"
    }, children: "Restablecer" })
  ] });
}
const PATIENT_TABS = ["Triaje", "Síntomas"];
function PatientApp({
  user,
  records,
  onSave
}) {
  const [tab, setTab] = reactExports.useState(0);
  const [pa, setPa] = reactExports.useState("");
  const [fc, setFc] = reactExports.useState("");
  const [peso, setPeso] = reactExports.useState("");
  const [talla, setTalla] = reactExports.useState("");
  const [glucosa, setGlucosa] = reactExports.useState("");
  const [estadoGlucosa, setEstadoGlucosa] = reactExports.useState("Ayunas");
  const [sintomas, setSintomas] = reactExports.useState([]);
  const [toast, setToast] = reactExports.useState(null);
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  const [histPage, setHistPage] = reactExports.useState(1);
  const [histRisk, setHistRisk] = reactExports.useState("");
  const [histFrom, setHistFrom] = reactExports.useState("");
  const [histTo, setHistTo] = reactExports.useState("");
  const imc = reactExports.useMemo(() => {
    const p = Number(peso), t = Number(talla);
    if (p > 0 && t > 0) return (p / (t * t)).toFixed(1);
    return "";
  }, [peso, talla]);
  const sortedRecords = reactExports.useMemo(() => [...records].sort((a, b) => b.createdAt - a.createdAt), [records]);
  const last = sortedRecords[0];
  const pendingRec = reactExports.useMemo(() => {
    if (!glucosa) return null;
    return {
      id: "pending",
      createdAt: Date.now(),
      dni: user.dni,
      nombres: user.nombres,
      edad: user.edad,
      posta: user.posta,
      pa,
      fc,
      peso,
      talla,
      imc,
      glucosa,
      estadoGlucosa,
      sintomas
    };
  }, [user, pa, fc, peso, talla, imc, glucosa, estadoGlucosa, sintomas]);
  const filteredHistory = reactExports.useMemo(() => {
    return sortedRecords.filter((r) => {
      if (histRisk && classify(r) !== histRisk) return false;
      if (histFrom) {
        const from = new Date(histFrom).setHours(0, 0, 0, 0);
        if (r.createdAt < from) return false;
      }
      if (histTo) {
        const to = new Date(histTo).setHours(23, 59, 59, 999);
        if (r.createdAt > to) return false;
      }
      return true;
    });
  }, [sortedRecords, histRisk, histFrom, histTo]);
  const histTotalPages = Math.max(1, Math.ceil(filteredHistory.length / HISTORY_PAGE_SIZE));
  const histPageSafe = Math.min(histPage, histTotalPages);
  const pagedHistory = filteredHistory.slice((histPageSafe - 1) * HISTORY_PAGE_SIZE, histPageSafe * HISTORY_PAGE_SIZE);
  reactExports.useEffect(() => {
    setHistPage(1);
  }, [histRisk, histFrom, histTo]);
  const requestSave = () => {
    if (!glucosa) {
      setTab(0);
      return notify("Registra la glucemia capilar.");
    }
    setConfirmOpen(true);
  };
  const confirmSave = () => {
    if (!pendingRec) return;
    onSave({
      ...pendingRec,
      id: crypto.randomUUID()
    });
    setPa("");
    setFc("");
    setPeso("");
    setTalla("");
    setGlucosa("");
    setSintomas([]);
    setEstadoGlucosa("Ayunas");
    setTab(0);
    setConfirmOpen(false);
    notify("✓ Ficha enviada al centro de salud.");
  };
  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 2500);
  };
  const toggleSintoma = (s) => setSintomas((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const clearHistFilters = () => {
    setHistRisk("");
    setHistFrom("");
    setHistTo("");
  };
  const hasHistFilters = histRisk || histFrom || histTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-2xl text-white shadow-xl", style: {
      background: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-6 p-6 sm:grid-cols-2 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-white/80", children: "Hola" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 text-3xl font-bold leading-tight", children: [
          "Bienvenido, ",
          user.nombres.split(" ")[0],
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/85", children: "Registra tu triaje y síntomas para que tu equipo médico te dé seguimiento." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Última glucosa", value: last ? `${last.glucosa}` : "—", sub: last ? last.estadoGlucosa : "mg/dL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Fichas", value: String(records.length), sub: "totales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Riesgo", value: last ? classify(last) : "—", sub: "último" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-1.5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: PATIENT_TABS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(i), className: `flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${tab === i ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted"}`, style: tab === i ? {
      background: "var(--gradient-hero)"
    } : void 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-xs opacity-80", children: i + 1 }),
      t
    ] }, t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm", children: [
      tab === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: "Triaje" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tus signos vitales del día." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Presión Arterial", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: pa, onChange: (e) => setPa(e.target.value), placeholder: "120/80" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Frecuencia Cardíaca (lpm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: inputCls, value: fc, onChange: (e) => setFc(e.target.value), placeholder: "78" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Peso (kg)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", className: inputCls, value: peso, onChange: (e) => setPeso(e.target.value), placeholder: "70" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Talla (m)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", className: inputCls, value: talla, onChange: (e) => setTalla(e.target.value), placeholder: "1.65" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "IMC", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { readOnly: true, className: inputCls + " bg-muted/40", value: imc, placeholder: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Glucemia (mg/dL)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-2xl font-bold tracking-tight outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20", value: glucosa, onChange: (e) => setGlucosa(e.target.value), placeholder: "110" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-sm font-medium", children: "Estado al momento de la medición" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["Ayunas", "Post-prandial"].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${estadoGlucosa === opt ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", className: "accent-primary", checked: estadoGlucosa === opt, onChange: () => setEstadoGlucosa(opt) }),
            opt
          ] }, opt)) })
        ] })
      ] }),
      tab === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: "Síntomas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Marca los que has tenido las últimas 2 semanas." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3", children: SYMPTOM_LIST.map((s) => {
          const checked = sintomas.includes(s);
          const severe = SEVERE_SYMPTOMS.has(s);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${checked ? severe ? "border-destructive bg-destructive/10" : "border-primary bg-primary/10" : "border-border hover:border-primary/40"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4 accent-primary", checked, onChange: () => toggleSintoma(s) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s }),
            severe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] font-semibold text-destructive", children: "!" })
          ] }, s);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between border-t border-border pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTab((i) => Math.max(0, i - 1)), disabled: tab === 0, className: "rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-40", children: "← Anterior" }),
        tab < PATIENT_TABS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTab((i) => i + 1), className: "rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90", style: {
          background: "var(--gradient-hero)"
        }, children: "Siguiente →" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: requestSave, className: "rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90", style: {
          background: "var(--gradient-hero)"
        }, children: "✓ Enviar ficha" })
      ] })
    ] }),
    records.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: "Mi historial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          filteredHistory.length,
          " registro",
          filteredHistory.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBar, { risk: histRisk, onRiskChange: (v) => setHistRisk(v), from: histFrom, to: histTo, onFromChange: setHistFrom, onToChange: setHistTo, onClear: clearHistFilters, hasFilters: !!hasHistFilters }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "Fecha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Glucosa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Estado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Síntomas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Riesgo" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          pagedHistory.map((r) => {
            const level = classify(r);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-border ${rowRiskClass(level)}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: new Date(r.createdAt).toLocaleString("es-PE", {
                dateStyle: "short",
                timeStyle: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-semibold", children: [
                r.glucosa,
                " mg/dL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: r.estadoGlucosa }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: r.sintomas.length || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { level }) })
            ] }, r.id);
          }),
          pagedHistory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-8 text-center text-muted-foreground", children: "No hay registros con estos filtros." }) })
        ] })
      ] }) }),
      filteredHistory.length > HISTORY_PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationBar, { page: histPageSafe, totalPages: histTotalPages, onPage: setHistPage })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-md rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Confirmar envío de triaje" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Revisa que los datos sean correctos antes de enviar tu ficha al centro de salud." })
      ] }),
      pendingRec && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-xl border border-border bg-[var(--color-brand-050)] p-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryItem, { label: "Glucemia", value: `${pendingRec.glucosa} mg/dL`, highlight: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryItem, { label: "Estado", value: pendingRec.estadoGlucosa }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryItem, { label: "Presión", value: pendingRec.pa || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryItem, { label: "FC", value: pendingRec.fc ? `${pendingRec.fc} lpm` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryItem, { label: "Peso", value: pendingRec.peso ? `${pendingRec.peso} kg` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryItem, { label: "IMC", value: pendingRec.imc || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Síntomas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5", children: pendingRec.sintomas.length ? pendingRec.sintomas.join(", ") : "Ninguno" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Riesgo estimado:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { level: classify(pendingRec) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Revisar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: confirmSave, style: {
          background: "var(--color-brand-400)"
        }, children: "Confirmar y enviar" })
      ] })
    ] }) }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-xl", children: toast })
  ] });
}
function MiniStat({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-white/15 p-3 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-white/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold capitalize", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/70", children: sub })
  ] });
}
function rowRiskClass(level) {
  if (level === "alto") return "bg-[var(--color-risk-alto-bg)]";
  if (level === "medio") return "bg-[var(--color-risk-medio-bg)]";
  return "";
}
function SummaryItem({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-medium ${highlight ? "text-lg font-bold text-[var(--color-brand-800)]" : ""}`, children: value })
  ] });
}
function FilterBar({
  risk,
  onRiskChange,
  from,
  to,
  onFromChange,
  onToChange,
  onClear,
  hasFilters,
  search,
  onSearchChange,
  posta,
  onPostaChange,
  postas
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[var(--color-brand-100)] bg-[var(--color-brand-050)] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-800)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
      "Filtros"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      onSearchChange !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative block sm:col-span-2 lg:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Buscar paciente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute bottom-2.5 left-3 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: `${inputCls} pl-9`, value: search ?? "", onChange: (e) => onSearchChange(e.target.value), placeholder: "Nombre o DNI" })
      ] }),
      postas && onPostaChange && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Posta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: inputCls, value: posta ?? "", onChange: (e) => onPostaChange(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Todas" }),
          postas.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Riesgo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: inputCls, value: risk, onChange: (e) => onRiskChange(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Todos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "alto", children: "Alto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medio", children: "Medio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "normal", children: "Normal" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Desde" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: inputCls, value: from, onChange: (e) => onFromChange(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Hasta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: inputCls, value: to, onChange: (e) => onToChange(e.target.value) })
      ] })
    ] }),
    hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onClear, className: "mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-brand-600)] hover:underline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
      " Limpiar filtros"
    ] })
  ] });
}
function PaginationBar({
  page,
  totalPages,
  onPage
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      "Página ",
      page,
      " de ",
      totalPages
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: page <= 1, onClick: () => onPage(page - 1), className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-sm transition hover:bg-muted disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
      Array.from({
        length: totalPages
      }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onPage(p), className: `inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${p === page ? "text-white shadow-sm" : "border border-border bg-background hover:bg-muted"}`, style: p === page ? {
        background: "var(--color-brand-400)"
      } : void 0, children: p }, p)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: page >= totalPages, onClick: () => onPage(page + 1), className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-sm transition hover:bg-muted disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function DoctorApp({
  user,
  records
}) {
  const [docRisk, setDocRisk] = reactExports.useState("");
  const [docFrom, setDocFrom] = reactExports.useState("");
  const [docTo, setDocTo] = reactExports.useState("");
  const [docSearch, setDocSearch] = reactExports.useState("");
  const [docPosta, setDocPosta] = reactExports.useState("");
  const [docPage, setDocPage] = reactExports.useState(1);
  const sorted = reactExports.useMemo(() => {
    const order = {
      alto: 0,
      medio: 1,
      normal: 2
    };
    return [...records].sort((a, b) => {
      const d = order[classify(a)] - order[classify(b)];
      if (d !== 0) return d;
      return b.createdAt - a.createdAt;
    });
  }, [records]);
  const filtered = reactExports.useMemo(() => {
    const q = docSearch.trim().toLowerCase();
    return sorted.filter((r) => {
      if (docRisk && classify(r) !== docRisk) return false;
      if (docPosta && r.posta !== docPosta) return false;
      if (q && !r.nombres.toLowerCase().includes(q) && !r.dni.includes(q)) return false;
      if (docFrom) {
        const from = new Date(docFrom).setHours(0, 0, 0, 0);
        if (r.createdAt < from) return false;
      }
      if (docTo) {
        const to = new Date(docTo).setHours(23, 59, 59, 999);
        if (r.createdAt > to) return false;
      }
      return true;
    });
  }, [sorted, docRisk, docPosta, docSearch, docFrom, docTo]);
  const docTotalPages = Math.max(1, Math.ceil(filtered.length / DOCTOR_PAGE_SIZE));
  const docPageSafe = Math.min(docPage, docTotalPages);
  const paged = filtered.slice((docPageSafe - 1) * DOCTOR_PAGE_SIZE, docPageSafe * DOCTOR_PAGE_SIZE);
  reactExports.useEffect(() => {
    setDocPage(1);
  }, [docRisk, docPosta, docSearch, docFrom, docTo]);
  const alto = sorted.filter((r) => classify(r) === "alto").length;
  const medio = sorted.filter((r) => classify(r) === "medio").length;
  const normal = sorted.filter((r) => classify(r) === "normal").length;
  const uniquePatients = new Set(records.map((r) => r.dni)).size;
  const hasDocFilters = !!(docRisk || docPosta || docSearch || docFrom || docTo);
  const trend = reactExports.useMemo(() => {
    return [...records].sort((a, b) => a.createdAt - b.createdAt).slice(-10).map((r) => ({
      d: new Date(r.createdAt).toLocaleDateString("es-PE", {
        month: "2-digit",
        day: "2-digit"
      }),
      glucosa: Number(r.glucosa) || 0
    }));
  }, [records]);
  const porPosta = reactExports.useMemo(() => {
    const m = {};
    for (const r of records) m[r.posta] = (m[r.posta] || 0) + 1;
    return Object.entries(m).map(([posta, n]) => ({
      posta,
      n
    }));
  }, [records]);
  const pie = [{
    name: "Alto",
    value: alto,
    color: "var(--color-risk-alto-strong)"
  }, {
    name: "Medio",
    value: medio,
    color: "var(--color-risk-medio-strong)"
  }, {
    name: "Normal",
    value: normal,
    color: "var(--color-risk-normal-strong)"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-2xl p-6 text-white shadow-xl sm:p-8", style: {
      background: "var(--gradient-card)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-white/80", children: "Centro médico" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 text-3xl font-bold", children: [
        "Bienvenido, ",
        user.nombres
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/85", children: "Panel de monitoreo y priorización de pacientes." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Pacientes activos", value: String(uniquePatients) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Fichas totales", value: String(records.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "En alerta", value: String(alto), accent: "alert" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Normales", value: String(normal), accent: "ok" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: "Tendencia de glucemia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Últimas mediciones reportadas" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trend, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gl", x1: "0", y1: "0", x2: "1", y2: "0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.62 0.18 220)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.68 0.22 320)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.02 230)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "d", stroke: "oklch(0.5 0.04 250)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.5 0.04 250)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "glucosa", stroke: "url(#gl)", strokeWidth: 3, dot: {
            r: 5,
            fill: "oklch(0.62 0.18 220)"
          } })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold tracking-tight", children: "Distribución de riesgo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: pie, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 85, paddingAngle: 4, children: pie.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: p.color }, p.name)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2 text-center", children: pie.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold", style: {
            color: p.color
          }, children: p.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: p.name })
        ] }, p.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold tracking-tight", children: "Fichas por posta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: porPosta, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.02 230)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "posta", stroke: "oklch(0.5 0.04 250)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(0.5 0.04 250)", fontSize: 12, allowDecimals: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "n", radius: [8, 8, 0, 0], fill: "oklch(0.62 0.18 220)" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight", children: "Tabla de Triaje priorizada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Ordenada por nivel de riesgo · ",
          filtered.length,
          " ficha",
          filtered.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBar, { risk: docRisk, onRiskChange: (v) => setDocRisk(v), from: docFrom, to: docTo, onFromChange: setDocFrom, onToChange: setDocTo, onClear: () => {
        setDocRisk("");
        setDocPosta("");
        setDocSearch("");
        setDocFrom("");
        setDocTo("");
      }, hasFilters: hasDocFilters, search: docSearch, onSearchChange: setDocSearch, posta: docPosta, onPostaChange: setDocPosta, postas: POSTAS }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Paciente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Fecha y hora" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Posta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Glucosa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Síntomas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Riesgo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-right font-medium", children: "Acción" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          paged.map((r) => {
            const level = classify(r);
            const isAlert = level === "alto";
            const alertSym = r.sintomas.filter((s) => SEVERE_SYMPTOMS.has(s));
            const fecha = new Date(r.createdAt);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-border ${rowRiskClass(level)}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: r.nombres }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  "DNI ",
                  r.dni,
                  " · ",
                  r.edad,
                  "a"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm tabular-nums", children: fecha.toLocaleDateString("es-PE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground tabular-nums", children: [
                  fecha.toLocaleTimeString("es-PE", {
                    hour: "2-digit",
                    minute: "2-digit"
                  }),
                  " h"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: r.posta }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: r.glucosa }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "mg/dL · ",
                  r.estadoGlucosa
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: r.sintomas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Ninguno" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                (alertSym.length ? alertSym : r.sintomas).slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2 py-0.5 text-[11px] ${SEVERE_SYMPTOMS.has(s) ? "bg-[var(--color-risk-alto-bg)] text-[var(--color-risk-alto-text)]" : "bg-muted text-muted-foreground"}`, children: s }, s)),
                r.sintomas.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                  "+",
                  r.sintomas.length - 3
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { level }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-right", children: isAlert ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90", style: {
                background: "var(--color-risk-alto-strong)"
              }, children: "Contactar" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) })
            ] }, r.id);
          }),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-6 py-10 text-center text-muted-foreground", children: hasDocFilters ? "Sin resultados con estos filtros." : "Sin fichas aún." }) })
        ] })
      ] }) }),
      filtered.length > DOCTOR_PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationBar, { page: docPageSafe, totalPages: docTotalPages, onPage: setDocPage }) })
    ] })
  ] });
}
function Stat({
  label,
  value,
  accent
}) {
  const color = accent === "alert" ? "text-destructive" : accent === "ok" ? "text-[oklch(0.5_0.16_155)]" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-3xl font-bold tracking-tight ${color}`, children: value })
  ] });
}
function RiskBadge({
  level
}) {
  if (level === "alto") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", style: {
      background: "var(--color-risk-alto-bg)",
      borderColor: "var(--color-risk-alto-border)",
      color: "var(--color-risk-alto-text)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
        background: "var(--color-risk-alto-strong)"
      } }),
      "Alto"
    ] });
  }
  if (level === "medio") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", style: {
      background: "var(--color-risk-medio-bg)",
      borderColor: "var(--color-risk-medio-border)",
      color: "var(--color-risk-medio-text)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
        background: "var(--color-risk-medio-strong)"
      } }),
      "Medio"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", style: {
    background: "var(--color-risk-normal-bg)",
    borderColor: "var(--color-risk-normal-border)",
    color: "var(--color-risk-normal-text)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
      background: "var(--color-risk-normal-strong)"
    } }),
    "Normal"
  ] });
}
export {
  Index as component
};
