import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend, PieChart, Pie, Cell,
} from "recharts";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PatientIllustration, DoctorIllustration } from "@/components/glucotech/RoleIllustrations";
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react";

const APP_NAME = "GlucoTech PE";
const HISTORY_PAGE_SIZE = 5;
const DOCTOR_PAGE_SIZE = 8;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP_NAME} — Monitoreo de Diabetes` },
      { name: "description", content: "Plataforma de telemonitoreo de diabetes para pacientes y centros de salud en Perú." },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: "Control y triaje de diabetes." },
    ],
  }),
  component: Index,
});

const POSTAS = ["Surquillo", "Mirones", "San Isidro", "Breña", "La Victoria", "Barranco"];

const SYMPTOM_LIST = [
  "Mucha sed (Polidipsia)",
  "Orinar seguido, especialmente de noche (Poliuria)",
  "Mucha hambre (Polifagia)",
  "Pérdida de peso sin causa aparente",
  "Visión borrosa",
  "Cansancio extremo o debilidad",
  "Mareos o sudoración fría (posible baja de azúcar)",
  "Heridas que tardan en sanar",
  "Adormecimiento o hincadas en los pies",
];

const SEVERE_SYMPTOMS = new Set([
  "Visión borrosa",
  "Mareos o sudoración fría (posible baja de azúcar)",
  "Pérdida de peso sin causa aparente",
  "Heridas que tardan en sanar",
]);

type User = {
  dni: string;
  password: string;
  nombres: string;
  fechaNac: string;
  edad: string;
  telefono: string;
  direccion: string;
  posta: string;
  role: "paciente" | "medico";
  // Campos exclusivos del médico
  cmp?: string;
  especialidad?: string;
  renae?: string; // Código RENAES
  redSalud?: string;
  horarioAtencion?: string;
  // Campos adicionales paciente (registro inicial)
  fechaRegistro?: string;
  pa?: string;
  fc?: string;
  peso?: string;
  talla?: string;
  imc?: string;
  glucosa?: string;
  estadoGlucosa?: "Ayunas" | "Post-prandial";
  tipoDiabetes?: string;
  tiempoDiagnostico?: string;
  otrasEnfermedades?: string[];
  otrasEnfermedadesDetalle?: string;
  sintomasIniciales?: string[];
  medicamentos?: string;
  usaInsulina?: string;
  cuantaInsulina?: string;
  cumpleDosis?: string;
  actividadFisica?: string;
  frecuenciaActividad?: string;
  planAlimentacion?: string;
  fuma?: string;
  alcohol?: string;
};

type TriajeRecord = {
  id: string;
  createdAt: number;
  dni: string;
  nombres: string;
  edad: string;
  posta: string;
  pa: string;
  fc: string;
  peso: string;
  talla: string;
  imc: string;
  glucosa: string;
  estadoGlucosa: "Ayunas" | "Post-prandial";
  sintomas: string[];
};

function classify(r: Pick<TriajeRecord, "glucosa" | "estadoGlucosa" | "sintomas">) {
  const g = Number(r.glucosa);
  const hasSevere = r.sintomas.some((s) => SEVERE_SYMPTOMS.has(s));
  const manySymptoms = r.sintomas.length >= 4;
  const extremeGlucose = g > 180 || (g > 0 && g < 70);
  if (extremeGlucose || hasSevere || manySymptoms) return "alto";
  const limitGlucose = r.estadoGlucosa === "Ayunas" ? g > 130 : g > 180;
  if (limitGlucose || r.sintomas.length >= 2) return "medio";
  return "normal";
}

// ---------- mock persistence ----------
const LS_USERS = "glucotech_users_v2";
const LS_RECORDS = "glucotech_records_v2";
const LS_SESSION = "glucotech_session_v2";

const DAY = 86_400_000;

const seedUsers: User[] = [
  { dni: "11111111", password: "doctor", nombres: "Dr. Gregory House", fechaNac: "1959-06-11", edad: "66", telefono: "987654321", direccion: "Av. Diagnóstico 221B", posta: "San Isidro", role: "medico", cmp: "CMP-045231", especialidad: "Endocrinología", renae: "RENAE-001234", redSalud: "DIRESA Lima Ciudad", horarioAtencion: "Lun–Vie 8:00–14:00" },
  { dni: "72345612", password: "demo2026", nombres: "María Elena Vargas", fechaNac: "1968-04-15", edad: "57", telefono: "999111222", direccion: "Jr. Salud 45, Surquillo", posta: "Surquillo", role: "paciente" },
  { dni: "45678901", password: "paciente1", nombres: "Carlos Mendieta", fechaNac: "1975-09-22", edad: "50", telefono: "988776655", direccion: "Av. Los Olivos 120", posta: "Mirones", role: "paciente" },
  { dni: "33445566", password: "paciente2", nombres: "Rosa Huamán", fechaNac: "1982-01-08", edad: "43", telefono: "977665544", direccion: "Calle Breña 88", posta: "Breña", role: "paciente" },
];

const seedRecords: TriajeRecord[] = [
  { id: "r01", createdAt: Date.now() - 2 * DAY, dni: "72345612", nombres: "María Elena Vargas", edad: "57", posta: "Surquillo", pa: "118/76", fc: "74", peso: "67", talla: "1.58", imc: "26.8", glucosa: "108", estadoGlucosa: "Ayunas", sintomas: [] },
  { id: "r02", createdAt: Date.now() - 5 * DAY, dni: "72345612", nombres: "María Elena Vargas", edad: "57", posta: "Surquillo", pa: "122/80", fc: "78", peso: "67", talla: "1.58", imc: "26.8", glucosa: "142", estadoGlucosa: "Post-prandial", sintomas: ["Mucha sed"] },
  { id: "r03", createdAt: Date.now() - 8 * DAY, dni: "72345612", nombres: "María Elena Vargas", edad: "57", posta: "Surquillo", pa: "125/82", fc: "80", peso: "68", talla: "1.58", imc: "27.2", glucosa: "135", estadoGlucosa: "Post-prandial", sintomas: ["Mucha sed", "Cansancio extremo"] },
  { id: "r04", createdAt: Date.now() - 12 * DAY, dni: "72345612", nombres: "María Elena Vargas", edad: "57", posta: "Surquillo", pa: "120/78", fc: "76", peso: "68", talla: "1.58", imc: "27.2", glucosa: "98", estadoGlucosa: "Ayunas", sintomas: [] },
  { id: "r05", createdAt: Date.now() - 18 * DAY, dni: "72345612", nombres: "María Elena Vargas", edad: "57", posta: "Surquillo", pa: "128/84", fc: "82", peso: "68", talla: "1.58", imc: "27.2", glucosa: "168", estadoGlucosa: "Post-prandial", sintomas: ["Visión borrosa"] },
  { id: "r06", createdAt: Date.now() - 25 * DAY, dni: "72345612", nombres: "María Elena Vargas", edad: "57", posta: "Surquillo", pa: "115/75", fc: "72", peso: "67", talla: "1.58", imc: "26.8", glucosa: "112", estadoGlucosa: "Ayunas", sintomas: [] },
  { id: "r07", createdAt: Date.now() - 3 * DAY, dni: "45678901", nombres: "Carlos Mendieta", edad: "50", posta: "Mirones", pa: "130/85", fc: "84", peso: "82", talla: "1.72", imc: "27.7", glucosa: "195", estadoGlucosa: "Post-prandial", sintomas: ["Mucha sed", "Orinar seguido", "Visión borrosa", "Cansancio extremo"] },
  { id: "r08", createdAt: Date.now() - 10 * DAY, dni: "45678901", nombres: "Carlos Mendieta", edad: "50", posta: "Mirones", pa: "126/82", fc: "80", peso: "81", talla: "1.72", imc: "27.4", glucosa: "118", estadoGlucosa: "Ayunas", sintomas: [] },
  { id: "r09", createdAt: Date.now() - 20 * DAY, dni: "45678901", nombres: "Carlos Mendieta", edad: "50", posta: "Mirones", pa: "124/80", fc: "78", peso: "81", talla: "1.72", imc: "27.4", glucosa: "128", estadoGlucosa: "Post-prandial", sintomas: ["Mucha hambre"] },
  { id: "r10", createdAt: Date.now() - 1 * DAY, dni: "33445566", nombres: "Rosa Huamán", edad: "43", posta: "Breña", pa: "118/74", fc: "70", peso: "62", talla: "1.55", imc: "25.8", glucosa: "102", estadoGlucosa: "Ayunas", sintomas: [] },
  { id: "r11", createdAt: Date.now() - 7 * DAY, dni: "33445566", nombres: "Rosa Huamán", edad: "43", posta: "Breña", pa: "120/76", fc: "72", peso: "62", talla: "1.55", imc: "25.8", glucosa: "138", estadoGlucosa: "Post-prandial", sintomas: ["Mucha sed"] },
  { id: "r12", createdAt: Date.now() - 15 * DAY, dni: "33445566", nombres: "Rosa Huamán", edad: "43", posta: "Breña", pa: "116/72", fc: "68", peso: "61", talla: "1.55", imc: "25.4", glucosa: "95", estadoGlucosa: "Ayunas", sintomas: [] },
];

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function saveJSON(key: string, v: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* noop */ }
}

type Screen =
  | { name: "landing" }
  | { name: "auth"; role: "paciente" | "medico"; mode: "login" | "register" | "forgot" }
  | { name: "app"; userDni: string };

function Index() {
  const [users, setUsers] = useState<User[]>(() => {
    const u = loadJSON<User[]>(LS_USERS, []);
    return u.length ? u : seedUsers;
  });
  const [records, setRecords] = useState<TriajeRecord[]>(() => {
    const r = loadJSON<TriajeRecord[]>(LS_RECORDS, []);
    return r.length ? r : seedRecords;
  });
  const [screen, setScreen] = useState<Screen>(() => {
    const s = loadJSON<Screen | null>(LS_SESSION, null);
    return s ?? { name: "landing" };
  });

  useEffect(() => saveJSON(LS_USERS, users), [users]);
  useEffect(() => saveJSON(LS_RECORDS, records), [records]);
  useEffect(() => saveJSON(LS_SESSION, screen), [screen]);

  const currentUser = screen.name === "app" ? users.find((u) => u.dni === screen.userDni) ?? null : null;

  const logout = () => setScreen({ name: "landing" });

  return (
    <div className="min-h-screen text-foreground" style={{ fontFamily: "Inter, system-ui, sans-serif", background: "radial-gradient(1200px 600px at 10% -10%, oklch(0.93 0.02 230 / 0.6), transparent), radial-gradient(900px 500px at 100% 0%, oklch(0.94 0.015 200 / 0.5), transparent), var(--background)" }}>
      <Header user={currentUser} onLogout={logout} onHome={() => setScreen({ name: "landing" })} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {screen.name === "landing" && <Landing onPick={(role) => setScreen({ name: "auth", role, mode: "login" })} />}
        {screen.name === "auth" && (
          <AuthScreen
            role={screen.role}
            mode={screen.mode}
            users={users}
            onSwitch={(mode) => setScreen({ name: "auth", role: screen.role, mode })}
            onBack={() => setScreen({ name: "landing" })}
            onLogin={(dni) => setScreen({ name: "app", userDni: dni })}
            onRegister={(u, rec) => {
              setUsers((p) => [...p, u]);
              if (rec) {
                setRecords((prev) => [rec, ...prev]);
              }
              setScreen({ name: "app", userDni: u.dni });
            }}
            onResetPassword={(dni, pw) => setUsers((p) => p.map((x) => x.dni === dni ? { ...x, password: pw } : x))}
          />
        )}
        {screen.name === "app" && currentUser?.role === "paciente" && (
          <PatientApp
            user={currentUser}
            records={records.filter((r) => r.dni === currentUser.dni)}
            onSave={(r) => setRecords((prev) => [r, ...prev])}
          />
        )}
        {screen.name === "app" && currentUser?.role === "medico" && (
          <DoctorApp user={currentUser} records={records} users={users} />
        )}
        {screen.name === "app" && !currentUser && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            Sesión inválida. <button onClick={logout} className="text-primary underline">Volver</button>
          </div>
        )}
      </main>
      <footer className="mx-auto max-w-7xl px-6 pb-8 pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME} · Plataforma de monitoreo de diabetes
      </footer>
    </div>
  );
}

// ---------- HEADER ----------
function Header({ user, onLogout, onHome }: { user: User | null; onLogout: () => void; onHome: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-card/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <button onClick={onHome} className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-lg" style={{ background: "var(--gradient-hero)" }}>GT</div>
          <div className="text-left">
            <div className="text-xl font-bold tracking-tight">{APP_NAME}</div>
            <div className="-mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">Monitoreo de Diabetes</div>
          </div>
        </button>
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold leading-tight">Bienvenido, {user.nombres.split(" ")[0]}</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{user.role === "medico" ? "Vista Médico" : "Vista Paciente"}</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white shadow-md" style={{ background: "var(--gradient-card)" }}>
              {user.nombres.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <button onClick={onLogout} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// ---------- LANDING ----------
function Landing({ onPick }: { onPick: (role: "paciente" | "medico") => void }) {
  return (
    <div className="py-6 sm:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Salud digital
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Controla tu diabetes,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
              conecta con tu posta
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {APP_NAME} une a pacientes y médicos en tiempo real: registra tu triaje y síntomas, recibe seguimiento profesional y prevén complicaciones.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <RoleCard
              title="Soy Paciente"
              desc="Registra tu glucemia y síntomas. Tu médico te seguirá."
              illustration={<PatientIllustration />}
              onClick={() => onPick("paciente")}
              gradient="var(--gradient-hero)"
            />
            <RoleCard
              title="Soy Médico"
              desc="Visualiza pacientes priorizados y analiza tendencias."
              illustration={<DoctorIllustration />}
              onClick={() => onPick("medico")}
              gradient="var(--gradient-card)"
            />
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-semibold">Tendencia glucémica</div>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-[oklch(0.4_0.15_155)]">En rango</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={[
                { d: "L", g: 110 }, { d: "M", g: 125 }, { d: "X", g: 118 },
                { d: "J", g: 140 }, { d: "V", g: 105 }, { d: "S", g: 120 }, { d: "D", g: 115 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 230)" />
                <XAxis dataKey="d" stroke="oklch(0.5 0.04 250)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.04 250)" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="g" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)" }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { l: "Promedio", v: "119" },
                { l: "Mínimo", v: "105" },
                { l: "Máximo", v: "140" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-background p-3">
                  <div className="text-lg font-bold text-primary">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ title, desc, illustration, onClick, gradient }: { title: string; desc: string; illustration: ReactNode; onClick: () => void; gradient: string }) {
  return (
    <button onClick={onClick} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: gradient }} />
      <div className="mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-brand-100)] bg-[var(--color-brand-050)] shadow-md">
        {illustration}
      </div>
      <div className="text-lg font-bold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
        Continuar →
      </div>
    </button>
  );
}

// ---------- AUTH ----------
function AuthScreen({
  role, mode, users, onSwitch, onBack, onLogin, onRegister, onResetPassword,
}: {
  role: "paciente" | "medico";
  mode: "login" | "register" | "forgot";
  users: User[];
  onSwitch: (mode: "login" | "register" | "forgot") => void;
  onBack: () => void;
  onLogin: (dni: string) => void;
  onRegister: (u: User, initialRecord?: TriajeRecord) => void;
  onResetPassword: (dni: string, pw: string) => void;
}) {
  const wide = mode === "register";
  return (
    <div className={`mx-auto py-8 ${wide ? "max-w-lg" : "max-w-md"}`}>
      <button onClick={onBack} className="mb-4 text-sm text-muted-foreground hover:text-foreground">← Volver al inicio</button>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: role === "medico" ? "var(--gradient-card)" : "var(--gradient-hero)" }} />
        <div className="p-7">
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {role === "medico" ? "Acceso médico" : "Acceso paciente"}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {mode === "login" && "Inicia sesión"}
            {mode === "register" && "Crea tu cuenta"}
            {mode === "forgot" && "Recupera tu contraseña"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" && "Ingresa con tu DNI y contraseña."}
            {mode === "register" && "Completa el formulario para registrarte."}
            {mode === "forgot" && "Ingresa tu DNI para restablecer."}
          </p>

          <div className="mt-6">
            {mode === "login" && <LoginForm role={role} users={users} onLogin={onLogin} />}
            {mode === "register" && <RegisterForm role={role} users={users} onRegister={onRegister} />}
            {mode === "forgot" && <ForgotForm users={users} onResetPassword={onResetPassword} onDone={() => onSwitch("login")} />}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-sm">
            {mode !== "login" && <button onClick={() => onSwitch("login")} className="text-primary hover:underline">Iniciar sesión</button>}
            {mode !== "register" && <button onClick={() => onSwitch("register")} className="text-primary hover:underline">Crear cuenta</button>}
            {mode !== "forgot" && <button onClick={() => onSwitch("forgot")} className="text-muted-foreground hover:text-foreground">¿Olvidaste tu contraseña?</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function btnPrimary(extra = "") {
  return `w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 ${extra}`;
}

function LoginForm({ role, users, onLogin }: { role: "paciente" | "medico"; users: User[]; onLogin: (dni: string) => void }) {
  const demoDni = role === "medico" ? "11111111" : "72345612";
  const demoPw = role === "medico" ? "doctor" : "demo2026";
  const [dni, setDni] = useState(demoDni);
  const [pw, setPw] = useState(demoPw);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setDni(demoDni);
    setPw(demoPw);
    setErr(null);
  }, [role, demoDni, demoPw]);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const u = users.find((x) => x.dni === dni.trim() && x.password === pw && x.role === role);
        if (!u) return setErr("DNI o contraseña incorrectos para este rol.");
        onLogin(u.dni);
      }}
    >
      <Field label="DNI"><input className={inputCls} value={dni} onChange={(e) => setDni(e.target.value)} placeholder="00000000" required /></Field>
      <Field label="Contraseña"><input type="password" className={inputCls} value={pw} onChange={(e) => setPw(e.target.value)} required /></Field>
      {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</div>}
      <button type="submit" className={btnPrimary()} style={{ background: "var(--gradient-hero)" }}>Entrar</button>

      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-primary">Acceso de Demostración:</span>
          <button
            type="button"
            onClick={() => {
              setDni(demoDni);
              setPw(demoPw);
              setErr(null);
            }}
            className="font-bold text-primary hover:underline"
          >
            Auto-completar ⚡
          </button>
        </div>
        <p className="mt-1 text-muted-foreground">
          DNI: <strong className="text-foreground">{demoDni}</strong> | Clave: <strong className="text-foreground">{demoPw}</strong>
        </p>
      </div>
    </form>
  );
}



function CheckPill({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all select-none text-left ${
        checked
          ? "border-primary bg-primary/10 text-primary font-medium shadow-sm"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
      }`}
    >
      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${checked ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
        {checked && (
          <svg viewBox="0 0 12 9" className="h-3 w-3" fill="none">
            <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function RadioPill({ label, checked, onChange }: { label: string; name?: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all select-none ${
        checked
          ? "border-primary bg-primary/10 text-primary font-medium shadow-sm"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
      }`}
    >
      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${checked ? "border-primary" : "border-muted-foreground/40"}`}>
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      {label}
    </button>
  );
}

function RegisterForm({ role, users, onRegister }: { role: "paciente" | "medico"; users: User[]; onRegister: (u: User, initialRecord?: TriajeRecord) => void }) {
  if (role === "medico") return <RegisterFormMedico users={users} onRegister={onRegister} />;
  return <RegisterFormPaciente users={users} onRegister={onRegister} />;
}

// ---- REGISTRO MÉDICO ----
function RegisterFormMedico({ users, onRegister }: { users: User[]; onRegister: (u: User) => void }) {
  const [u, setU] = useState<User>({
    dni: "", password: "", nombres: "", fechaNac: "", edad: "", telefono: "",
    direccion: "", posta: POSTAS[0], role: "medico",
    cmp: "", especialidad: "", renae: "", redSalud: "", horarioAtencion: "",
  });
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const set = <K extends keyof User>(k: K, v: User[K]) => setU((p) => ({ ...p, [k]: v }));

  return (
    <form className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!u.dni || !u.password || !u.nombres || !u.cmp || !u.especialidad || !u.renae || !u.redSalud || !u.horarioAtencion)
          return setErr("Completa todos los campos obligatorios.");
        if (u.password !== pw2) return setErr("Las contraseñas no coinciden.");
        if (users.some((x) => x.dni === u.dni)) return setErr("Ya existe una cuenta con ese DNI.");
        onRegister(u);
      }}
    >
      <Field label="Nombre completo">
        <input className={inputCls} value={u.nombres} onChange={(e) => set("nombres", e.target.value)} placeholder="Dr. Juan Pérez López" required />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="DNI">
          <input className={inputCls} value={u.dni} onChange={(e) => set("dni", e.target.value)} placeholder="00000000" required />
        </Field>
        <Field label="Teléfono">
          <input className={inputCls} value={u.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="9XXXXXXXX" required />
        </Field>
      </div>

      <div className="border-t border-border pt-1" />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="CMP">
          <input className={inputCls} value={u.cmp} onChange={(e) => set("cmp", e.target.value)} placeholder="CMP-XXXXXX" required />
        </Field>
        <Field label="Especialidad">
          <input className={inputCls} value={u.especialidad} onChange={(e) => set("especialidad", e.target.value)} placeholder="Endocrinología" required />
        </Field>
        <Field label="Código RENAES">
          <input className={inputCls} value={u.renae} onChange={(e) => set("renae", e.target.value)} placeholder="RENAES-XXXXXX" required />
        </Field>
        <Field label="Red de salud / DIRESA">
          <input className={inputCls} value={u.redSalud} onChange={(e) => set("redSalud", e.target.value)} placeholder="DIRESA Lima Ciudad" required />
        </Field>
      </div>
      <Field label="Horario de atención">
        <input className={inputCls} value={u.horarioAtencion} onChange={(e) => set("horarioAtencion", e.target.value)} placeholder="Lun–Vie 8:00–14:00" required />
      </Field>
      <Field label="Posta / Centro de salud">
        <select className={inputCls} value={u.posta} onChange={(e) => set("posta", e.target.value)}>
          {POSTAS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>

      <div className="border-t border-border pt-1" />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Contraseña">
          <input type="password" className={inputCls} value={u.password} onChange={(e) => set("password", e.target.value)} required />
        </Field>
        <Field label="Confirmar contraseña">
          <input type="password" className={inputCls} value={pw2} onChange={(e) => setPw2(e.target.value)} required />
        </Field>
      </div>

      {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</div>}
      <button type="submit" className={btnPrimary()} style={{ background: "var(--gradient-hero)" }}>Crear cuenta</button>
    </form>
  );
}

// ---- REGISTRO PACIENTE (formulario completo en pasos) ----
const ENFERMEDADES_LIST = ["Hipertensión", "Colesterol alto", "Problemas renales", "Ninguna"];
const PAC_STEPS = [
  "Datos Personales",
  "Triaje Inicial",
  "Antecedentes y Diagnóstico",
  "Tratamiento Actual",
  "Síntomas Recientes",
  "Estilo de Vida",
  "Credenciales de Acceso",
] as const;

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium text-muted-foreground">
        Paso {current + 1} de {total} — <span className="text-foreground font-semibold">{PAC_STEPS[current]}</span>
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all ${i === current ? "h-2 w-6 bg-primary" : i < current ? "h-2 w-2 bg-primary/40" : "h-2 w-2 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

function RegisterFormPaciente({ users, onRegister }: { users: User[]; onRegister: (u: User, initialRecord?: TriajeRecord) => void }) {
  const [step, setStep] = useState(0);
  const [u, setU] = useState<User>({
    dni: "", password: "", nombres: "", fechaNac: "", edad: "", telefono: "",
    direccion: "", posta: POSTAS[0], role: "paciente",
    fechaRegistro: new Date().toISOString().split("T")[0],
    pa: "", fc: "", peso: "", talla: "", imc: "", glucosa: "", estadoGlucosa: "Ayunas",
    tipoDiabetes: "", tiempoDiagnostico: "", otrasEnfermedades: [], otrasEnfermedadesDetalle: "",
    medicamentos: "", usaInsulina: "No", cuantaInsulina: "", cumpleDosis: "Siempre",
    actividadFisica: "No", frecuenciaActividad: "", planAlimentacion: "Sí", fuma: "No", alcohol: "No",
  });
  const [sintomasIniciales, setSintomasIniciales] = useState<string[]>([]);
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const set = <K extends keyof User>(k: K, v: User[K]) => setU((p) => ({ ...p, [k]: v }));

  // Auto-calcular IMC
  useEffect(() => {
    const p = Number(u.peso);
    const t = Number(u.talla);
    if (p > 0 && t > 0) {
      const calculatedImc = (p / (t * t)).toFixed(1);
      if (u.imc !== calculatedImc) {
        set("imc", calculatedImc);
      }
    } else {
      if (u.imc !== "") {
        set("imc", "");
      }
    }
  }, [u.peso, u.talla]);

  const toggleEnf = (enf: string) => {
    const cur = u.otrasEnfermedades ?? [];
    if (enf === "Ninguna") { set("otrasEnfermedades", ["Ninguna"]); return; }
    const filtered = cur.filter((e) => e !== "Ninguna");
    set("otrasEnfermedades", filtered.includes(enf) ? filtered.filter((e) => e !== enf) : [...filtered, enf]);
  };

  const toggleSintomaInicial = (s: string) => {
    setSintomasIniciales((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!u.dni || !u.password || !u.nombres || !u.fechaNac || !u.edad || !u.telefono || !u.direccion)
      return setErr("Completa todos los campos obligatorios.");
    if (u.password !== pw2) return setErr("Las contraseñas no coinciden.");
    if (users.some((x) => x.dni === u.dni)) return setErr("Ya existe una cuenta con ese DNI.");
    
    // Crear el record inicial de triaje a partir de los datos ingresados
    const initialRecord: TriajeRecord = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      dni: u.dni,
      nombres: u.nombres,
      edad: u.edad,
      posta: u.posta,
      pa: u.pa || "—",
      fc: u.fc || "—",
      peso: u.peso || "—",
      talla: u.talla || "—",
      imc: u.imc || "—",
      glucosa: u.glucosa || "—",
      estadoGlucosa: u.estadoGlucosa || "Ayunas",
      sintomas: sintomasIniciales,
    };

    onRegister(u, initialRecord);
  };

  const next = () => {
    setErr(null);
    if (step === 0) {
      if (!u.fechaRegistro || !u.nombres || !u.dni || !u.fechaNac || !u.edad || !u.telefono || !u.direccion) {
        return setErr("Por favor completa todos los datos personales.");
      }
    }
    if (step === 1) {
      if (!u.pa || !u.fc || !u.peso || !u.talla || !u.glucosa || !u.estadoGlucosa) {
        return setErr("Por favor completa todos los campos de triaje inicial.");
      }
    }
    if (step === 2) {
      if (!u.tipoDiabetes || !u.tiempoDiagnostico || (u.otrasEnfermedades ?? []).length === 0) {
        return setErr("Por favor responde a los antecedentes y diagnóstico.");
      }
    }
    if (step === 3) {
      if (!u.medicamentos || !u.usaInsulina || !u.cumpleDosis) {
        return setErr("Por favor responde las preguntas de tratamiento.");
      }
      if (u.usaInsulina === "Sí" && !u.cuantaInsulina) {
        return setErr("Por favor especifica cuál y cuántas unidades de insulina usa.");
      }
    }
    if (step === 5) {
      if (!u.actividadFisica || !u.planAlimentacion || !u.fuma || !u.alcohol) {
        return setErr("Por favor completa las preguntas de estilo de vida.");
      }
      if (u.actividadFisica === "Sí" && !u.frecuenciaActividad) {
        return setErr("Por favor especifica las veces por semana que realiza actividad física.");
      }
    }
    setStep((s) => Math.min(PAC_STEPS.length - 1, s + 1));
  };

  const prev = () => { setErr(null); setStep((s) => Math.max(0, s - 1)); };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <StepDots current={step} total={PAC_STEPS.length} />

      {/* Paso 0: Datos personales */}
      {step === 0 && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Fecha">
              <input type="date" className={inputCls} value={u.fechaRegistro || ""} onChange={(e) => set("fechaRegistro", e.target.value)} required />
            </Field>
            <Field label="Nombres y Apellidos">
              <input className={inputCls} value={u.nombres} onChange={(e) => set("nombres", e.target.value)} placeholder="María Elena Vargas" required />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="DNI / Documento de Identidad">
              <input className={inputCls} value={u.dni} onChange={(e) => set("dni", e.target.value)} placeholder="00000000" required />
            </Field>
            <Field label="Teléfono de Contacto">
              <input className={inputCls} value={u.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="9XXXXXXXX" required />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Fecha de Nacimiento">
              <input type="date" className={inputCls} value={u.fechaNac} onChange={(e) => {
                const birth = e.target.value;
                set("fechaNac", birth);
                if (birth) {
                  const birthYear = new Date(birth).getFullYear();
                  const currentYear = new Date().getFullYear();
                  set("edad", String(currentYear - birthYear));
                }
              }} required />
            </Field>
            <Field label="Edad">
              <input type="number" className={inputCls} value={u.edad} onChange={(e) => set("edad", e.target.value)} placeholder="45" required />
            </Field>
          </div>
          <Field label="Dirección">
            <input className={inputCls} value={u.direccion} onChange={(e) => set("direccion", e.target.value)} placeholder="Jr. Salud 45, Surquillo" required />
          </Field>
          <Field label="Posta de salud">
            <select className={inputCls} value={u.posta} onChange={(e) => set("posta", e.target.value)}>
              {POSTAS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
        </div>
      )}

      {/* Paso 1: Triaje Inicial */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="rounded-lg bg-muted/30 p-2 text-xs text-muted-foreground">
            ⚠️ <strong>Uso Exclusivo del Personal de Salud</strong> o control de ingreso.
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Presión Arterial (PA) (mmHg)">
              <input className={inputCls} value={u.pa || ""} onChange={(e) => set("pa", e.target.value)} placeholder="120/80" required />
            </Field>
            <Field label="Frecuencia Cardíaca (FC) (lpm)">
              <input type="number" className={inputCls} value={u.fc || ""} onChange={(e) => set("fc", e.target.value)} placeholder="78" required />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Peso (kg)">
              <input type="number" step="0.1" className={inputCls} value={u.peso || ""} onChange={(e) => set("peso", e.target.value)} placeholder="70.0" required />
            </Field>
            <Field label="Talla (m)">
              <input type="number" step="0.01" className={inputCls} value={u.talla || ""} onChange={(e) => set("talla", e.target.value)} placeholder="1.65" required />
            </Field>
            <Field label="Índice de Masa Corporal (IMC)">
              <input readOnly className={inputCls + " bg-muted/40 font-mono font-semibold"} value={u.imc || ""} placeholder="—" />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Glucemia Capilar (Hemoglucotest) (mg/dL)">
              <input type="number" className={inputCls} value={u.glucosa || ""} onChange={(e) => set("glucosa", e.target.value)} placeholder="110" required />
            </Field>
            <div>
              <span className="mb-1.5 block text-sm font-medium">Estado</span>
              <div className="flex gap-2">
                {(["Ayunas", "Post-prandial"] as const).map((opt) => (
                  <RadioPill
                    key={opt}
                    label={opt === "Post-prandial" ? "Post-prandial (después de comer)" : "Ayunas"}
                    checked={u.estadoGlucosa === opt}
                    onChange={() => set("estadoGlucosa", opt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paso 2: Antecedentes y Diagnóstico */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">Tipo de Diabetes</p>
            <div className="grid grid-cols-2 gap-2">
              {["Tipo 1", "Tipo 2", "Gestacional", "No sabe"].map((opt) => (
                <RadioPill key={opt} label={opt} name="tipoDiabetes" checked={u.tipoDiabetes === opt} onChange={() => set("tipoDiabetes", opt)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Tiempo desde el diagnóstico</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {["Menos de 1 año", "1 a 5 años", "Más de 5 años"].map((opt) => (
                <RadioPill key={opt} label={opt} name="tiempoDiag" checked={u.tiempoDiagnostico === opt} onChange={() => set("tiempoDiagnostico", opt)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Otras enfermedades</p>
            <div className="grid grid-cols-2 gap-2">
              {ENFERMEDADES_LIST.map((enf) => (
                <CheckPill key={enf} label={enf} checked={(u.otrasEnfermedades ?? []).includes(enf)} onChange={() => toggleEnf(enf)} />
              ))}
            </div>
          </div>
          <Field label="Otros antecedentes u observaciones">
            <input className={inputCls} value={u.otrasEnfermedadesDetalle || ""} onChange={(e) => set("otrasEnfermedadesDetalle", e.target.value)} placeholder="Ej. Tiroides, problemas de presión, asma..." />
          </Field>
        </div>
      )}

      {/* Paso 3: Tratamiento Actual */}
      {step === 3 && (
        <div className="space-y-4">
          <Field label="Medicamentos que toma (Metformina, Glibenclamida, etc.)">
            <input className={inputCls} value={u.medicamentos ?? ""} onChange={(e) => set("medicamentos", e.target.value)} placeholder="Metformina 850mg c/12h..." required />
          </Field>
          <div>
            <p className="mb-2 text-sm font-medium">¿Usa Insulina?</p>
            <div className="flex gap-2">
              {["Sí", "No"].map((opt) => (
                <RadioPill key={opt} label={opt} name="insulina" checked={u.usaInsulina === opt} onChange={() => set("usaInsulina", opt)} />
              ))}
            </div>
          </div>
          {u.usaInsulina === "Sí" && (
            <Field label="¿Cuál y cuántas unidades?">
              <input className={inputCls} value={u.cuantaInsulina ?? ""} onChange={(e) => set("cuantaInsulina", e.target.value)} placeholder="Lantus, 15 unidades por la noche" required />
            </Field>
          )}
          <div>
            <p className="mb-2 text-sm font-medium">¿Cumple con las dosis?</p>
            <div className="flex gap-2">
              {["Siempre", "A veces", "Nunca"].map((opt) => (
                <RadioPill key={opt} label={opt} name="cumpleDosis" checked={u.cumpleDosis === opt} onChange={() => set("cumpleDosis", opt)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paso 4: Síntomas Recientes (Últimas 2 semanas) */}
      {step === 4 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Marque con una X si presenta alguno de los siguientes síntomas:</p>
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
            {SYMPTOM_LIST.map((s) => {
              const checked = sintomasIniciales.includes(s);
              return (
                <CheckPill key={s} label={s} checked={checked} onChange={() => toggleSintomaInicial(s)} />
              );
            })}
          </div>
        </div>
      )}

      {/* Paso 5: Estilo de Vida */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">¿Realiza actividad física?</p>
            <div className="flex gap-2">
              {["Sí", "No"].map((opt) => (
                <RadioPill key={opt} label={opt} name="actividad" checked={u.actividadFisica === opt} onChange={() => set("actividadFisica", opt)} />
              ))}
            </div>
          </div>
          {u.actividadFisica === "Sí" && (
            <Field label="Veces por semana">
              <input type="number" min="1" max="7" className={inputCls} value={u.frecuenciaActividad ?? ""} onChange={(e) => set("frecuenciaActividad", e.target.value)} placeholder="3" required />
            </Field>
          )}
          <div>
            <p className="mb-2 text-sm font-medium">¿Sigue el plan de alimentación?</p>
            <div className="flex gap-2">
              {["Sí", "A veces", "No"].map((opt) => (
                <RadioPill key={opt} label={opt} name="planAlim" checked={u.planAlimentacion === opt} onChange={() => set("planAlimentacion", opt)} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-sm font-medium">¿Fuma?</p>
              <div className="flex gap-2">
                {["Sí", "No"].map((opt) => (
                  <RadioPill key={opt} label={opt} name="fuma" checked={u.fuma === opt} onChange={() => set("fuma", opt)} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">¿Consume alcohol?</p>
              <div className="flex gap-2">
                {["Sí", "No"].map((opt) => (
                  <RadioPill key={opt} label={opt} name="alcohol" checked={u.alcohol === opt} onChange={() => set("alcohol", opt)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paso 6: Credenciales de Acceso */}
      {step === 6 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Define tu contraseña de ingreso para finalizar el registro.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Contraseña *">
              <input type="password" className={inputCls} value={u.password} onChange={(e) => set("password", e.target.value)} required />
            </Field>
            <Field label="Confirmar contraseña *">
              <input type="password" className={inputCls} value={pw2} onChange={(e) => setPw2(e.target.value)} required />
            </Field>
          </div>
        </div>
      )}

      {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</div>}

      <div className="flex items-center justify-between border-t border-border pt-4">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40"
        >
          ← Anterior
        </button>
        {step < PAC_STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            style={{ background: "var(--gradient-hero)" }}
          >
            Siguiente →
          </button>
        ) : (
          <button type="submit" className="rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ background: "var(--gradient-hero)" }}>
            ✓ Crear cuenta
          </button>
        )}
      </div>
    </form>
  );
}

function ForgotForm({ users, onResetPassword, onDone }: { users: User[]; onResetPassword: (dni: string, pw: string) => void; onDone: () => void }) {
  const [dni, setDni] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  return (
    <form className="space-y-3" onSubmit={(e) => {
      e.preventDefault();
      if (!users.find((x) => x.dni === dni.trim())) return setErr("No existe un usuario con ese DNI.");
      if (!pw || pw !== pw2) return setErr("Las contraseñas no coinciden.");
      onResetPassword(dni.trim(), pw);
      setOk(true);
      setTimeout(onDone, 1200);
    }}>
      <Field label="DNI"><input className={inputCls} value={dni} onChange={(e) => setDni(e.target.value)} required /></Field>
      <Field label="Nueva contraseña"><input type="password" className={inputCls} value={pw} onChange={(e) => setPw(e.target.value)} required /></Field>
      <Field label="Confirmar"><input type="password" className={inputCls} value={pw2} onChange={(e) => setPw2(e.target.value)} required /></Field>
      {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</div>}
      {ok && <div className="rounded-lg bg-success/15 px-3 py-2 text-xs text-[oklch(0.35_0.15_155)]">Contraseña actualizada. Redirigiendo…</div>}
      <button type="submit" className={btnPrimary()} style={{ background: "var(--gradient-hero)" }}>Restablecer</button>
    </form>
  );
}

// ---------- PATIENT APP ----------
const PATIENT_TABS = ["Triaje", "Síntomas"];

function PatientApp({ user, records, onSave }: { user: User; records: TriajeRecord[]; onSave: (r: TriajeRecord) => void }) {
  const [tab, setTab] = useState(0);
  const [pa, setPa] = useState(""); const [fc, setFc] = useState("");
  const [peso, setPeso] = useState(""); const [talla, setTalla] = useState("");
  const [glucosa, setGlucosa] = useState(""); const [estadoGlucosa, setEstadoGlucosa] = useState<"Ayunas" | "Post-prandial">("Ayunas");
  const [sintomas, setSintomas] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [histPage, setHistPage] = useState(1);
  const [histRisk, setHistRisk] = useState<"" | "alto" | "medio" | "normal">("");
  const [histFrom, setHistFrom] = useState("");
  const [histTo, setHistTo] = useState("");

  const imc = useMemo(() => {
    const p = Number(peso), t = Number(talla);
    if (p > 0 && t > 0) return (p / (t * t)).toFixed(1);
    return "";
  }, [peso, talla]);

  const sortedRecords = useMemo(() => [...records].sort((a, b) => b.createdAt - a.createdAt), [records]);
  const last = sortedRecords[0];

  const pendingRec = useMemo((): TriajeRecord | null => {
    if (!glucosa) return null;
    return {
      id: "pending", createdAt: Date.now(),
      dni: user.dni, nombres: user.nombres, edad: user.edad, posta: user.posta,
      pa, fc, peso, talla, imc, glucosa, estadoGlucosa, sintomas,
    };
  }, [user, pa, fc, peso, talla, imc, glucosa, estadoGlucosa, sintomas]);

  const filteredHistory = useMemo(() => {
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

  useEffect(() => { setHistPage(1); }, [histRisk, histFrom, histTo]);

  const requestSave = () => {
    if (!glucosa) { setTab(0); return notify("Registra la glucemia capilar."); }
    setConfirmOpen(true);
  };

  const confirmSave = () => {
    if (!pendingRec) return;
    onSave({ ...pendingRec, id: crypto.randomUUID() });
    setPa(""); setFc(""); setPeso(""); setTalla(""); setGlucosa(""); setSintomas([]); setEstadoGlucosa("Ayunas");
    setTab(0);
    setConfirmOpen(false);
    notify("✓ Ficha enviada al centro de salud.");
  };

  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const toggleSintoma = (s: string) => setSintomas((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const clearHistFilters = () => { setHistRisk(""); setHistFrom(""); setHistTo(""); };
  const hasHistFilters = histRisk || histFrom || histTo;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl text-white shadow-xl" style={{ background: "var(--gradient-hero)" }}>
        <div className="grid items-center gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Hola</div>
            <h2 className="mt-1 text-3xl font-bold leading-tight">Bienvenido, {user.nombres.split(" ")[0]} 👋</h2>
            <p className="mt-2 text-sm text-white/85">Registra tu triaje y síntomas para que tu equipo médico te dé seguimiento.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Última glucosa" value={last ? `${last.glucosa}` : "—"} sub={last ? last.estadoGlucosa : "mg/dL"} />
            <MiniStat label="Fichas" value={String(records.length)} sub="totales" />
            <MiniStat label="Riesgo" value={last ? classify(last) : "—"} sub="último" />
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-border bg-card p-1.5 shadow-sm">
        <div className="flex gap-1">
          {PATIENT_TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${tab === i ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted"}`} style={tab === i ? { background: "var(--gradient-hero)" } : undefined}>
              <span className="mr-2 text-xs opacity-80">{i + 1}</span>{t}
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {tab === 0 && (
          <div className="space-y-5">
            <header><h3 className="text-lg font-semibold tracking-tight">Triaje</h3><p className="text-sm text-muted-foreground">Tus signos vitales del día.</p></header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Presión Arterial"><input className={inputCls} value={pa} onChange={(e) => setPa(e.target.value)} placeholder="120/80" /></Field>
              <Field label="Frecuencia Cardíaca (lpm)"><input type="number" className={inputCls} value={fc} onChange={(e) => setFc(e.target.value)} placeholder="78" /></Field>
              <Field label="Peso (kg)"><input type="number" step="0.1" className={inputCls} value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="70" /></Field>
              <Field label="Talla (m)"><input type="number" step="0.01" className={inputCls} value={talla} onChange={(e) => setTalla(e.target.value)} placeholder="1.65" /></Field>
              <Field label="IMC"><input readOnly className={inputCls + " bg-muted/40"} value={imc} placeholder="—" /></Field>
              <Field label="Glucemia (mg/dL)">
                <input type="number" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-2xl font-bold tracking-tight outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" value={glucosa} onChange={(e) => setGlucosa(e.target.value)} placeholder="110" />
              </Field>
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium">Estado al momento de la medición</span>
              <div className="flex gap-3">
                {(["Ayunas", "Post-prandial"] as const).map((opt) => (
                  <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${estadoGlucosa === opt ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                    <input type="radio" className="accent-primary" checked={estadoGlucosa === opt} onChange={() => setEstadoGlucosa(opt)} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="space-y-5">
            <header><h3 className="text-lg font-semibold tracking-tight">Síntomas</h3><p className="text-sm text-muted-foreground">Marca los que has tenido las últimas 2 semanas.</p></header>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SYMPTOM_LIST.map((s) => {
                const checked = sintomas.includes(s);
                const severe = SEVERE_SYMPTOMS.has(s);
                return (
                  <label key={s} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${checked ? (severe ? "border-destructive bg-destructive/10" : "border-primary bg-primary/10") : "border-border hover:border-primary/40"}`}>
                    <input type="checkbox" className="h-4 w-4 accent-primary" checked={checked} onChange={() => toggleSintoma(s)} />
                    <span>{s}</span>
                    {severe && <span className="ml-auto text-[10px] font-semibold text-destructive">!</span>}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          <button type="button" onClick={() => setTab((i) => Math.max(0, i - 1))} disabled={tab === 0} className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-40">← Anterior</button>
          {tab < PATIENT_TABS.length - 1 ? (
            <button type="button" onClick={() => setTab((i) => i + 1)} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ background: "var(--gradient-hero)" }}>Siguiente →</button>
          ) : (
            <button type="button" onClick={requestSave} className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ background: "var(--gradient-hero)" }}>✓ Enviar ficha</button>
          )}
        </div>
      </section>

      {records.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight">Mi historial</h3>
            <span className="text-xs text-muted-foreground">{filteredHistory.length} registro{filteredHistory.length !== 1 ? "s" : ""}</span>
          </div>

          <FilterBar
            risk={histRisk}
            onRiskChange={(v) => setHistRisk(v as "" | "alto" | "medio" | "normal")}
            from={histFrom}
            to={histTo}
            onFromChange={setHistFrom}
            onToChange={setHistTo}
            onClear={clearHistFilters}
            hasFilters={!!hasHistFilters}
          />

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="py-2">Fecha</th><th>Glucosa</th><th>Estado</th><th>Síntomas</th><th>Riesgo</th></tr>
              </thead>
              <tbody>
                {pagedHistory.map((r) => {
                  const level = classify(r);
                  return (
                    <tr key={r.id} className={`border-t border-border ${rowRiskClass(level)}`}>
                      <td className="py-2">{new Date(r.createdAt).toLocaleString("es-PE", { dateStyle: "short", timeStyle: "short" })}</td>
                      <td className="font-semibold">{r.glucosa} mg/dL</td>
                      <td>{r.estadoGlucosa}</td>
                      <td>{r.sintomas.length || "—"}</td>
                      <td><RiskBadge level={level} /></td>
                    </tr>
                  );
                })}
                {pagedHistory.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No hay registros con estos filtros.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredHistory.length > HISTORY_PAGE_SIZE && (
            <PaginationBar page={histPageSafe} totalPages={histTotalPages} onPage={setHistPage} />
          )}
        </section>
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envío de triaje</AlertDialogTitle>
            <AlertDialogDescription>
              Revisa que los datos sean correctos antes de enviar tu ficha al centro de salud.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {pendingRec && (
            <div className="space-y-3 rounded-xl border border-border bg-[var(--color-brand-050)] p-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <SummaryItem label="Glucemia" value={`${pendingRec.glucosa} mg/dL`} highlight />
                <SummaryItem label="Estado" value={pendingRec.estadoGlucosa} />
                <SummaryItem label="Presión" value={pendingRec.pa || "—"} />
                <SummaryItem label="FC" value={pendingRec.fc ? `${pendingRec.fc} lpm` : "—"} />
                <SummaryItem label="Peso" value={pendingRec.peso ? `${pendingRec.peso} kg` : "—"} />
                <SummaryItem label="IMC" value={pendingRec.imc || "—"} />
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Síntomas</span>
                <p className="mt-0.5">{pendingRec.sintomas.length ? pendingRec.sintomas.join(", ") : "Ninguno"}</p>
              </div>
              <div className="flex items-center gap-2 border-t border-border pt-3">
                <span className="text-xs font-medium text-muted-foreground">Riesgo estimado:</span>
                <RiskBadge level={classify(pendingRec)} />
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Revisar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave} style={{ background: "var(--color-brand-400)" }}>
              Confirmar y enviar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-xl">{toast}</div>}
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm">
      <div className="text-[10px] uppercase tracking-wider text-white/70">{label}</div>
      <div className="mt-1 text-xl font-bold capitalize">{value}</div>
      <div className="text-[10px] text-white/70">{sub}</div>
    </div>
  );
}

// ---------- SHARED UI ----------
function rowRiskClass(level: string) {
  if (level === "alto") return "bg-[var(--color-risk-alto-bg)]";
  if (level === "medio") return "bg-[var(--color-risk-medio-bg)]";
  return "";
}

function SummaryItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <span className="text-xs text-muted-foreground">{label}</span>
      <p className={`font-medium ${highlight ? "text-lg font-bold text-[var(--color-brand-800)]" : ""}`}>{value}</p>
    </div>
  );
}

function FilterBar({
  risk, onRiskChange, from, to, onFromChange, onToChange, onClear, hasFilters,
  search, onSearchChange, posta, onPostaChange, postas,
}: {
  risk: string;
  onRiskChange: (v: string) => void;
  from: string;
  to: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  onClear: () => void;
  hasFilters: boolean;
  search?: string;
  onSearchChange?: (v: string) => void;
  posta?: string;
  onPostaChange?: (v: string) => void;
  postas?: string[];
}) {
  return (
    <div className="rounded-xl border border-[var(--color-brand-100)] bg-[var(--color-brand-050)] p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-800)]">
        <Filter className="h-4 w-4" />
        Filtros
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {onSearchChange !== undefined && (
          <label className="relative block sm:col-span-2 lg:col-span-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Buscar paciente</span>
            <Search className="pointer-events-none absolute bottom-2.5 left-3 h-4 w-4 text-muted-foreground" />
            <input
              className={`${inputCls} pl-9`}
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Nombre o DNI"
            />
          </label>
        )}
        {postas && onPostaChange && (
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Posta</span>
            <select className={inputCls} value={posta ?? ""} onChange={(e) => onPostaChange(e.target.value)}>
              <option value="">Todas</option>
              {postas.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        )}
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Riesgo</span>
          <select className={inputCls} value={risk} onChange={(e) => onRiskChange(e.target.value)}>
            <option value="">Todos</option>
            <option value="alto">Alto</option>
            <option value="medio">Medio</option>
            <option value="normal">Normal</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Desde</span>
          <input type="date" className={inputCls} value={from} onChange={(e) => onFromChange(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Hasta</span>
          <input type="date" className={inputCls} value={to} onChange={(e) => onToChange(e.target.value)} />
        </label>
      </div>
      {hasFilters && (
        <button type="button" onClick={onClear} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-brand-600)] hover:underline">
          <X className="h-3 w-3" /> Limpiar filtros
        </button>
      )}
    </div>
  );
}

function PaginationBar({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
      <span className="text-xs text-muted-foreground">Página {page} de {totalPages}</span>
      <div className="flex gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-sm transition hover:bg-muted disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
              p === page ? "text-white shadow-sm" : "border border-border bg-background hover:bg-muted"
            }`}
            style={p === page ? { background: "var(--color-brand-400)" } : undefined}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-sm transition hover:bg-muted disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ---------- DOCTOR APP ----------
// ---------- DOCTOR APP ----------
function DetailBlock({ label, value, highlight }: { label: string; value: ReactNode; highlight?: boolean }) {
  return (
    <div>
      <span className="text-xs text-muted-foreground font-medium block">{label}</span>
      <span className={`mt-0.5 block font-semibold ${highlight ? "text-primary text-base" : "text-foreground"}`}>
        {value || "—"}
      </span>
    </div>
  );
}

function DoctorApp({ user, records, users }: { user: User; records: TriajeRecord[]; users: User[] }) {
  const [docRisk, setDocRisk] = useState<"" | "alto" | "medio" | "normal">("");
  const [docFrom, setDocFrom] = useState("");
  const [docTo, setDocTo] = useState("");
  const [docSearch, setDocSearch] = useState("");
  const [docPosta, setDocPosta] = useState("");
  const [docPage, setDocPage] = useState(1);
  const [selectedDni, setSelectedDni] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const order: { [k: string]: number } = { alto: 0, medio: 1, normal: 2 };
    return [...records].sort((a, b) => {
      const d = order[classify(a)] - order[classify(b)];
      if (d !== 0) return d;
      return b.createdAt - a.createdAt;
    });
  }, [records]);

  const filtered = useMemo(() => {
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

  useEffect(() => { setDocPage(1); }, [docRisk, docPosta, docSearch, docFrom, docTo]);

  const alto = sorted.filter((r) => classify(r) === "alto").length;
  const medio = sorted.filter((r) => classify(r) === "medio").length;
  const normal = sorted.filter((r) => classify(r) === "normal").length;
  const uniquePatients = new Set(records.map((r) => r.dni)).size;
  const hasDocFilters = !!(docRisk || docPosta || docSearch || docFrom || docTo);

  // Glucose trend (last 7 records chronological)
  const trend = useMemo(() => {
    return [...records].sort((a, b) => a.createdAt - b.createdAt).slice(-10).map((r) => ({
      d: new Date(r.createdAt).toLocaleDateString("es-PE", { month: "2-digit", day: "2-digit" }),
      glucosa: Number(r.glucosa) || 0,
    }));
  }, [records]);

  // Distribution by posta
  const porPosta = useMemo(() => {
    const m: { [k: string]: number } = {};
    for (const r of records) m[r.posta] = (m[r.posta] || 0) + 1;
    return Object.entries(m).map(([posta, n]) => ({ posta, n }));
  }, [records]);

  const pie = [
    { name: "Alto", value: alto, color: "var(--color-risk-alto-strong)" },
    { name: "Medio", value: medio, color: "var(--color-risk-medio-strong)" },
    { name: "Normal", value: normal, color: "var(--color-risk-normal-strong)" },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl p-6 text-white shadow-xl sm:p-8" style={{ background: "var(--gradient-card)" }}>
        <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Centro médico</div>
        <h2 className="mt-1 text-3xl font-bold">Bienvenido, {user.nombres}</h2>
        <p className="mt-1 text-sm text-white/85">Panel de monitoreo y priorización de pacientes.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Pacientes activos" value={String(uniquePatients)} />
        <Stat label="Fichas totales" value={String(records.length)} />
        <Stat label="En alerta" value={String(alto)} accent="alert" />
        <Stat label="Normales" value={String(normal)} accent="ok" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Tendencia de glucemia</h3>
              <p className="text-sm text-muted-foreground">Últimas mediciones reportadas</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend}>
              <defs>
                <linearGradient id="gl" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.62 0.18 220)" />
                  <stop offset="100%" stopColor="oklch(0.68 0.22 320)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 230)" />
              <XAxis dataKey="d" stroke="oklch(0.5 0.04 250)" fontSize={12} />
              <YAxis stroke="oklch(0.5 0.04 250)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="glucosa" stroke="url(#gl)" strokeWidth={3} dot={{ r: 5, fill: "oklch(0.62 0.18 220)" }} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">Distribución de riesgo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={4}>
                {pie.map((p) => <Cell key={p.name} fill={p.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {pie.map((p) => (
              <div key={p.name}>
                <div className="text-lg font-bold" style={{ color: p.color }}>{p.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold tracking-tight">Fichas por posta</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={porPosta}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 230)" />
            <XAxis dataKey="posta" stroke="oklch(0.5 0.04 250)" fontSize={12} />
            <YAxis stroke="oklch(0.5 0.04 250)" fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="n" radius={[8, 8, 0, 0]} fill="oklch(0.62 0.18 220)" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <header className="border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold tracking-tight">Tabla de Triaje priorizada</h3>
          <p className="text-sm text-muted-foreground">Ordenada por nivel de riesgo · {filtered.length} ficha{filtered.length !== 1 ? "s" : ""}</p>
        </header>

        <div className="p-4 sm:p-6">
          <FilterBar
            risk={docRisk}
            onRiskChange={(v) => setDocRisk(v as "" | "alto" | "medio" | "normal")}
            from={docFrom}
            to={docTo}
            onFromChange={setDocFrom}
            onToChange={setDocTo}
            onClear={() => { setDocRisk(""); setDocPosta(""); setDocSearch(""); setDocFrom(""); setDocTo(""); }}
            hasFilters={hasDocFilters}
            search={docSearch}
            onSearchChange={setDocSearch}
            posta={docPosta}
            onPostaChange={setDocPosta}
            postas={POSTAS}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Paciente</th>
                <th className="px-6 py-3 font-medium">Fecha y hora</th>
                <th className="px-6 py-3 font-medium">Posta</th>
                <th className="px-6 py-3 font-medium">Glucosa</th>
                <th className="px-6 py-3 font-medium">Síntomas</th>
                <th className="px-6 py-3 font-medium">Riesgo</th>
                <th className="px-6 py-3 text-right font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((r) => {
                const level = classify(r);
                const isAlert = level === "alto";
                const alertSym = r.sintomas.filter((s) => SEVERE_SYMPTOMS.has(s));
                const fecha = new Date(r.createdAt);
                return (
                  <tr key={r.id} className={`border-t border-border ${rowRiskClass(level)}`}>
                    <td className="px-6 py-3">
                      <div className="font-medium">{r.nombres}</div>
                      <div className="text-xs text-muted-foreground">DNI {r.dni} · {r.edad}a</div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="text-sm tabular-nums">{fecha.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })} h</div>
                    </td>
                    <td className="px-6 py-3">{r.posta}</td>
                    <td className="px-6 py-3"><span className="font-semibold tabular-nums">{r.glucosa}</span> <span className="text-xs text-muted-foreground">mg/dL · {r.estadoGlucosa}</span></td>
                    <td className="px-6 py-3">
                      {r.sintomas.length === 0 ? <span className="text-xs text-muted-foreground">Ninguno</span> : (
                        <div className="flex flex-wrap gap-1">
                          {(alertSym.length ? alertSym : r.sintomas).slice(0, 3).map((s) => (
                            <span key={s} className={`rounded-md px-2 py-0.5 text-[11px] ${SEVERE_SYMPTOMS.has(s) ? "bg-[var(--color-risk-alto-bg)] text-[var(--color-risk-alto-text)]" : "bg-muted text-muted-foreground"}`}>{s}</span>
                          ))}
                          {r.sintomas.length > 3 && <span className="text-[11px] text-muted-foreground">+{r.sintomas.length - 3}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-3"><RiskBadge level={level} /></td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedDni(r.dni)}
                          className="rounded-lg border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-white transition shadow-sm"
                        >
                          Ver Ficha
                        </button>
                        {isAlert && (
                          <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition" style={{ background: "var(--color-risk-alto-strong)" }}>
                            Contactar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && <tr><td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">{hasDocFilters ? "Sin resultados con estos filtros." : "Sin fichas aún."}</td></tr>}
            </tbody>
          </table>
        </div>

        {filtered.length > DOCTOR_PAGE_SIZE && (
          <div className="px-6 pb-4">
            <PaginationBar page={docPageSafe} totalPages={docTotalPages} onPage={setDocPage} />
          </div>
        )}
      </section>

      {/* Modal de Ficha Médica del Paciente */}
      {selectedDni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Cabecera */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Ficha Clínica del Paciente</span>
                <h3 className="text-2xl font-bold tracking-tight mt-0.5">
                  {users.find((u) => u.dni === selectedDni)?.nombres || records.find((r) => r.dni === selectedDni)?.nombres || "Paciente"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">DNI: {selectedDni}</p>
              </div>
              <button
                onClick={() => setSelectedDni(null)}
                className="rounded-full border border-border p-1.5 hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenido */}
            {(() => {
              const p = users.find((u) => u.dni === selectedDni);
              const pRecords = records.filter((r) => r.dni === selectedDni).sort((a, b) => b.createdAt - a.createdAt);
              const latestRec = pRecords[0];

              return (
                <div className="mt-6 space-y-6">
                  {/* 1. Datos Personales */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                      1. Datos Personales
                    </h4>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 text-sm">
                      <DetailBlock label="Fecha de Registro" value={p?.fechaRegistro || "Demo Pre-existente"} />
                      <DetailBlock label="Fecha de Nacimiento" value={p?.fechaNac || "No registrada"} />
                      <DetailBlock label="Edad" value={p?.edad ? `${p.edad} años` : (latestRec?.edad ? `${latestRec.edad} años` : "No registrada")} />
                      <DetailBlock label="Teléfono de Contacto" value={p?.telefono || "No registrado"} />
                      <DetailBlock label="Posta / Centro" value={p?.posta || latestRec?.posta || "No asignada"} />
                      <div className="col-span-2">
                        <DetailBlock label="Dirección" value={p?.direccion || "No registrada"} />
                      </div>
                    </div>
                  </div>

                  <hr className="border-border/60" />

                  {/* 2. Último Triaje */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                      2. Último Triaje Registrado
                    </h4>
                    {latestRec ? (
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 text-sm bg-muted/30 rounded-2xl p-4">
                        <DetailBlock label="Presión Arterial (PA)" value={latestRec.pa || "—"} />
                        <DetailBlock label="Frecuencia Cardíaca" value={latestRec.fc ? `${latestRec.fc} lpm` : "—"} />
                        <DetailBlock label="Peso" value={latestRec.peso ? `${latestRec.peso} kg` : "—"} />
                        <DetailBlock label="Talla" value={latestRec.talla ? `${latestRec.talla} m` : "—"} />
                        <DetailBlock label="IMC" value={latestRec.imc || "—"} />
                        <DetailBlock label="Glucemia" value={latestRec.glucosa ? `${latestRec.glucosa} mg/dL` : "—"} highlight />
                        <DetailBlock label="Estado de Medición" value={latestRec.estadoGlucosa || "—"} />
                        <DetailBlock label="Nivel de Riesgo" value={<RiskBadge level={classify(latestRec)} />} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No hay registros de triaje aún.</p>
                    )}
                  </div>

                  <hr className="border-border/60" />

                  {/* 3. Antecedentes y Diagnóstico */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                      3. Antecedentes y Diagnóstico
                    </h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm">
                      <DetailBlock label="Tipo de Diabetes" value={p?.tipoDiabetes || "No registrado"} />
                      <DetailBlock label="Tiempo desde el diagnóstico" value={p?.tiempoDiagnostico || "No registrado"} />
                      <div className="col-span-2">
                        <DetailBlock
                          label="Otras enfermedades"
                          value={p?.otrasEnfermedades && p.otrasEnfermedades.length > 0
                            ? p.otrasEnfermedades.filter(x => !x.startsWith("_snt_")).join(", ")
                            : "Ninguna"
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <DetailBlock label="Detalles u observaciones adicionales" value={p?.otrasEnfermedadesDetalle || "Ninguno"} />
                      </div>
                    </div>
                  </div>

                  <hr className="border-border/60" />

                  {/* 4. Tratamiento Actual */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                      4. Tratamiento Actual
                    </h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm">
                      <div className="col-span-2">
                        <DetailBlock label="Medicamentos que toma" value={p?.medicamentos || "No registrado"} />
                      </div>
                      <DetailBlock label="¿Usa Insulina?" value={p?.usaInsulina || "No registrado"} />
                      {p?.usaInsulina === "Sí" && (
                        <DetailBlock label="Insulina (cuál y cuántas unidades)" value={p?.cuantaInsulina || "—"} />
                      )}
                      <DetailBlock label="¿Cumple con las dosis?" value={p?.cumpleDosis || "No registrado"} />
                    </div>
                  </div>

                  <hr className="border-border/60" />

                  {/* 5. Síntomas Recientes (Últimas 2 semanas) */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                      5. Síntomas del Registro Inicial
                    </h4>
                    {p?.sintomasIniciales && p.sintomasIniciales.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {p.sintomasIniciales.map((s) => (
                          <span
                            key={s}
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                              SEVERE_SYMPTOMS.has(s)
                                ? "bg-[var(--color-risk-alto-bg)] text-[var(--color-risk-alto-text)] border border-[var(--color-risk-alto-border)]"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">No se marcaron síntomas en el registro inicial.</p>
                    )}
                  </div>

                  <hr className="border-border/60" />

                  {/* 6. Estilo de Vida */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                      6. Estilo de Vida
                    </h4>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 text-sm">
                      <DetailBlock label="Actividad física" value={p?.actividadFisica === "Sí" ? `Sí (${p.frecuenciaActividad} veces/sem)` : "No"} />
                      <DetailBlock label="Plan de alimentación" value={p?.planAlimentacion || "No registrado"} />
                      <DetailBlock label="¿Fuma?" value={p?.fuma || "No registrado"} />
                      <DetailBlock label="¿Consume alcohol?" value={p?.alcohol || "No registrado"} />
                    </div>
                  </div>

                  {/* Historial Completo */}
                  {pRecords.length > 0 && (
                    <>
                      <hr className="border-border/60" />
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                          Historial de Reportes ({pRecords.length})
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-border bg-muted/10">
                          <table className="w-full text-xs">
                            <thead className="bg-muted text-left uppercase text-muted-foreground">
                              <tr>
                                <th className="px-4 py-2">Fecha</th>
                                <th className="px-4 py-2">Glucemia</th>
                                <th className="px-4 py-2">Presión</th>
                                <th className="px-4 py-2">FC</th>
                                <th className="px-4 py-2">Síntomas</th>
                                <th className="px-4 py-2 text-right">Riesgo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pRecords.map((rec) => {
                                const level = classify(rec);
                                return (
                                  <tr key={rec.id} className="border-t border-border">
                                    <td className="px-4 py-2">{new Date(rec.createdAt).toLocaleDateString("es-PE")}</td>
                                    <td className="px-4 py-2 font-semibold">{rec.glucosa} mg/dL ({rec.estadoGlucosa})</td>
                                    <td className="px-4 py-2">{rec.pa || "—"}</td>
                                    <td className="px-4 py-2">{rec.fc ? `${rec.fc} lpm` : "—"}</td>
                                    <td className="px-4 py-2">{rec.sintomas.length || "0"}</td>
                                    <td className="px-4 py-2 text-right"><RiskBadge level={level} /></td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            {/* Pie de modal */}
            <div className="mt-8 flex justify-end border-t border-border pt-4">
              <button
                onClick={() => setSelectedDni(null)}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "ok" | "alert" }) {
  const color = accent === "alert" ? "text-destructive" : accent === "ok" ? "text-[oklch(0.5_0.16_155)]" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-bold tracking-tight ${color}`}>{value}</div>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  if (level === "alto") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ background: "var(--color-risk-alto-bg)", borderColor: "var(--color-risk-alto-border)", color: "var(--color-risk-alto-text)" }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-risk-alto-strong)" }} />Alto
      </span>
    );
  }
  if (level === "medio") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ background: "var(--color-risk-medio-bg)", borderColor: "var(--color-risk-medio-border)", color: "var(--color-risk-medio-text)" }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-risk-medio-strong)" }} />Medio
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ background: "var(--color-risk-normal-bg)", borderColor: "var(--color-risk-normal-border)", color: "var(--color-risk-normal-text)" }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-risk-normal-strong)" }} />Normal
    </span>
  );
}
