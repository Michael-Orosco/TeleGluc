import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TeleGluc — Monitoreo de Diabetes" },
      { name: "description", content: "Plataforma de telemonitoreo de diabetes para pacientes y centros de salud." },
      { property: "og:title", content: "TeleGluc" },
      { property: "og:description", content: "Control y triaje de diabetes." },
    ],
  }),
  component: Index,
});

const POSTAS = ["Surquillo", "Mirones", "San Isidro", "Breña", "La Victoria", "Barranco"];

const SYMPTOM_LIST = [
  "Mucha sed", "Orinar seguido", "Mucha hambre", "Pérdida de peso",
  "Visión borrosa", "Cansancio extremo", "Mareos/sudoración fría",
  "Heridas que tardan en sanar", "Adormecimiento en pies",
];

const SEVERE_SYMPTOMS = new Set([
  "Visión borrosa", "Mareos/sudoración fría", "Pérdida de peso", "Heridas que tardan en sanar",
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
const LS_USERS = "telegluc_users_v1";
const LS_RECORDS = "telegluc_records_v1";
const LS_SESSION = "telegluc_session_v1";

const seedUsers: User[] = [
  { dni: "11111111", password: "doctor", nombres: "Dra. Carla Mendoza", fechaNac: "1985-03-12", edad: "40", telefono: "987654321", direccion: "Av. Salud 123", posta: "San Isidro", role: "medico" },
  { dni: "45612378", password: "1234", nombres: "María López", fechaNac: "1970-06-01", edad: "54", telefono: "999111222", direccion: "Jr. Lima 22", posta: "Surquillo", role: "paciente" },
];

const seedRecords: TriajeRecord[] = [
  { id: "1", createdAt: Date.now() - 3600_000, dni: "45612378", nombres: "María López", edad: "54", posta: "Surquillo", pa: "120/80", fc: "78", peso: "68", talla: "1.60", imc: "26.6", glucosa: "110", estadoGlucosa: "Ayunas", sintomas: [] },
  { id: "2", createdAt: Date.now() - 7200_000, dni: "70123456", nombres: "Jorge Ruiz", edad: "61", posta: "Mirones", pa: "130/85", fc: "82", peso: "75", talla: "1.70", imc: "25.9", glucosa: "95", estadoGlucosa: "Ayunas", sintomas: ["Mucha sed"] },
  { id: "3", createdAt: Date.now() - 1800_000, dni: "44556677", nombres: "Ana Torres", edad: "47", posta: "Breña", pa: "140/90", fc: "95", peso: "82", talla: "1.58", imc: "32.8", glucosa: "210", estadoGlucosa: "Post-prandial", sintomas: ["Mucha sed", "Visión borrosa", "Cansancio extremo"] },
  { id: "4", createdAt: Date.now() - 86400_000, dni: "45612378", nombres: "María López", edad: "54", posta: "Surquillo", pa: "118/78", fc: "76", peso: "68", talla: "1.60", imc: "26.6", glucosa: "125", estadoGlucosa: "Post-prandial", sintomas: [] },
  { id: "5", createdAt: Date.now() - 172800_000, dni: "45612378", nombres: "María López", edad: "54", posta: "Surquillo", pa: "122/82", fc: "80", peso: "68", talla: "1.60", imc: "26.6", glucosa: "140", estadoGlucosa: "Post-prandial", sintomas: ["Mucha sed"] },
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
            onRegister={(u) => { setUsers((p) => [...p, u]); setScreen({ name: "app", userDni: u.dni }); }}
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
          <DoctorApp user={currentUser} records={records} />
        )}
        {screen.name === "app" && !currentUser && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            Sesión inválida. <button onClick={logout} className="text-primary underline">Volver</button>
          </div>
        )}
      </main>
      <footer className="mx-auto max-w-7xl px-6 pb-8 pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TeleGluc · Plataforma de monitoreo de diabetes
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-lg" style={{ background: "var(--gradient-hero)" }}>T</div>
          <div className="text-left">
            <div className="text-xl font-bold tracking-tight">TeleGluc</div>
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
            TeleGluc une a pacientes y médicos en tiempo real: registra tu triaje y síntomas, recibe seguimiento profesional y prevén complicaciones.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <RoleCard
              title="Soy Paciente"
              desc="Registra tu glucemia y síntomas. Tu médico te seguirá."
              icon="🧑‍⚕️"
              onClick={() => onPick("paciente")}
              gradient="var(--gradient-hero)"
            />
            <RoleCard
              title="Soy Médico"
              desc="Visualiza pacientes priorizados y analiza tendencias."
              icon="🩺"
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

function RoleCard({ title, desc, icon, onClick, gradient }: { title: string; desc: string; icon: string; onClick: () => void; gradient: string }) {
  return (
    <button onClick={onClick} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: gradient }} />
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-md" style={{ background: gradient }}>{icon}</div>
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
  onRegister: (u: User) => void;
  onResetPassword: (dni: string, pw: string) => void;
}) {
  return (
    <div className="mx-auto max-w-md py-8">
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
            {mode === "register" && "Completa todos los campos para registrarte."}
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
  const [dni, setDni] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
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
      <p className="text-center text-[11px] text-muted-foreground">
        Demo: {role === "medico" ? "DNI 11111111 / doctor" : "DNI 45612378 / 1234"}
      </p>
    </form>
  );
}

function RegisterForm({ role, users, onRegister }: { role: "paciente" | "medico"; users: User[]; onRegister: (u: User) => void }) {
  const [u, setU] = useState<User>({ dni: "", password: "", nombres: "", fechaNac: "", edad: "", telefono: "", direccion: "", posta: POSTAS[0], role });
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const set = <K extends keyof User>(k: K, v: User[K]) => setU((p) => ({ ...p, [k]: v }));
  return (
    <form className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (Object.values(u).some((v) => v === "")) return setErr("Completa todos los campos.");
        if (u.password !== pw2) return setErr("Las contraseñas no coinciden.");
        if (users.some((x) => x.dni === u.dni)) return setErr("Ya existe una cuenta con ese DNI.");
        onRegister(u);
      }}
    >
      <Field label="Nombres y Apellidos"><input className={inputCls} value={u.nombres} onChange={(e) => set("nombres", e.target.value)} required /></Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="DNI"><input className={inputCls} value={u.dni} onChange={(e) => set("dni", e.target.value)} required /></Field>
        <Field label="Teléfono"><input className={inputCls} value={u.telefono} onChange={(e) => set("telefono", e.target.value)} required /></Field>
        <Field label="Fecha de Nacimiento"><input type="date" className={inputCls} value={u.fechaNac} onChange={(e) => set("fechaNac", e.target.value)} required /></Field>
        <Field label="Edad"><input type="number" className={inputCls} value={u.edad} onChange={(e) => set("edad", e.target.value)} required /></Field>
      </div>
      <Field label="Dirección"><input className={inputCls} value={u.direccion} onChange={(e) => set("direccion", e.target.value)} required /></Field>
      <Field label="Posta de Salud">
        <select className={inputCls} value={u.posta} onChange={(e) => set("posta", e.target.value)}>
          {POSTAS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Contraseña"><input type="password" className={inputCls} value={u.password} onChange={(e) => set("password", e.target.value)} required /></Field>
        <Field label="Confirmar contraseña"><input type="password" className={inputCls} value={pw2} onChange={(e) => setPw2(e.target.value)} required /></Field>
      </div>
      {err && <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</div>}
      <button type="submit" className={btnPrimary()} style={{ background: "var(--gradient-hero)" }}>Crear cuenta</button>
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

  const imc = useMemo(() => {
    const p = Number(peso), t = Number(talla);
    if (p > 0 && t > 0) return (p / (t * t)).toFixed(1);
    return "";
  }, [peso, talla]);

  const last = records[0];

  const save = () => {
    if (!glucosa) { setTab(0); return notify("Registra la glucemia capilar."); }
    const rec: TriajeRecord = {
      id: crypto.randomUUID(), createdAt: Date.now(),
      dni: user.dni, nombres: user.nombres, edad: user.edad, posta: user.posta,
      pa, fc, peso, talla, imc, glucosa, estadoGlucosa, sintomas,
    };
    onSave(rec);
    setPa(""); setFc(""); setPeso(""); setTalla(""); setGlucosa(""); setSintomas([]); setEstadoGlucosa("Ayunas");
    setTab(0);
    notify("✓ Ficha enviada al centro de salud.");
  };
  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const toggleSintoma = (s: string) => setSintomas((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

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
            <MiniStat label="Reportes" value={String(records.length)} sub="totales" />
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
            <button type="button" onClick={save} className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ background: "var(--gradient-hero)" }}>✓ Enviar Reporte</button>
          )}
        </div>
      </section>

      {records.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">Mi historial</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="py-2">Fecha</th><th>Glucosa</th><th>Estado</th><th>Síntomas</th><th>Riesgo</th></tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="py-2">{new Date(r.createdAt).toLocaleString("es-PE", { dateStyle: "short", timeStyle: "short" })}</td>
                    <td className="font-semibold">{r.glucosa} mg/dL</td>
                    <td>{r.estadoGlucosa}</td>
                    <td>{r.sintomas.length || "—"}</td>
                    <td><RiskBadge level={classify(r)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

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

// ---------- DOCTOR APP ----------
function DoctorApp({ user, records }: { user: User; records: TriajeRecord[] }) {
  const sorted = useMemo(() => {
    const order: { [k: string]: number } = { alto: 0, medio: 1, normal: 2 };
    return [...records].sort((a, b) => {
      const d = order[classify(a)] - order[classify(b)];
      if (d !== 0) return d;
      return b.createdAt - a.createdAt;
    });
  }, [records]);

  const alto = sorted.filter((r) => classify(r) === "alto").length;
  const medio = sorted.filter((r) => classify(r) === "medio").length;
  const normal = sorted.filter((r) => classify(r) === "normal").length;

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
    { name: "Alto", value: alto, color: "oklch(0.62 0.23 25)" },
    { name: "Medio", value: medio, color: "oklch(0.78 0.17 70)" },
    { name: "Normal", value: normal, color: "oklch(0.7 0.18 160)" },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl p-6 text-white shadow-xl sm:p-8" style={{ background: "var(--gradient-card)" }}>
        <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Centro médico</div>
        <h2 className="mt-1 text-3xl font-bold">Bienvenido, {user.nombres}</h2>
        <p className="mt-1 text-sm text-white/85">Panel de monitoreo y priorización de pacientes.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Pacientes registrados" value={String(new Set(records.map((r) => r.dni)).size)} />
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
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Tabla de Triaje priorizada</h3>
            <p className="text-sm text-muted-foreground">Ordenada por nivel de riesgo</p>
          </div>
          <button
            onClick={() => exportTriajePDF(sorted)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--gradient-hero)" }}
            disabled={sorted.length === 0}
          >
            Exportar PDF
          </button>
        </header>

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
              {sorted.map((r) => {
                const level = classify(r);
                const isAlert = level === "alto";
                const alertSym = r.sintomas.filter((s) => SEVERE_SYMPTOMS.has(s));
                const fecha = new Date(r.createdAt);
                return (
                  <tr key={r.id} className={`border-t border-border ${isAlert ? "bg-destructive/5" : ""}`}>
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
                            <span key={s} className={`rounded-md px-2 py-0.5 text-[11px] ${SEVERE_SYMPTOMS.has(s) ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`}>{s}</span>
                          ))}
                          {r.sintomas.length > 3 && <span className="text-[11px] text-muted-foreground">+{r.sintomas.length - 3}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-3"><RiskBadge level={level} /></td>
                    <td className="px-6 py-3 text-right">
                      {isAlert ? <button className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90">Contactar</button> : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && <tr><td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">Sin fichas aún.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
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
  if (level === "alto") return <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-semibold text-destructive"><span className="h-1.5 w-1.5 rounded-full bg-destructive" />Alto</span>;
  if (level === "medio") return <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.94_0.1_75)] px-2.5 py-1 text-xs font-semibold text-[oklch(0.45_0.15_70)]"><span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.17_75)]" />Medio</span>;
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-[oklch(0.35_0.15_155)]"><span className="h-1.5 w-1.5 rounded-full bg-success" />Normal</span>;
}

function exportTriajePDF(rows: TriajeRecord[]) {
  const now = new Date();
  const fecha = now.toLocaleString("es-PE", { dateStyle: "long", timeStyle: "short" });
  const labels: { [k: string]: string } = { alto: "Alto", medio: "Medio", normal: "Normal" };
  const colors: { [k: string]: string } = { alto: "#c0392b", medio: "#b7791f", normal: "#1f7a3a" };
  const body = rows.map((r, i) => {
    const lvl = classify(r);
    const sint = r.sintomas.length ? r.sintomas.join(", ") : "Ninguno";
    const f = new Date(r.createdAt);
    const fStr = `${f.toLocaleDateString("es-PE")} ${f.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}`;
    return `<tr style="background:${i % 2 ? "#f8fafc" : "#fff"}">
      <td>${i + 1}</td>
      <td><strong>${escapeHtml(r.nombres)}</strong><br/><span style="color:#666;font-size:11px">DNI ${escapeHtml(r.dni)} · ${r.edad}a</span></td>
      <td style="font-size:11px;white-space:nowrap">${fStr}</td>
      <td>${escapeHtml(r.posta || "—")}</td>
      <td><strong>${r.glucosa}</strong> mg/dL<br/><span style="color:#666;font-size:11px">${escapeHtml(r.estadoGlucosa)}</span></td>
      <td style="color:${colors[lvl]};font-weight:600">${labels[lvl]}</td>
      <td style="font-size:11px">${escapeHtml(sint)}</td>
    </tr>`;
  }).join("");
  const alto = rows.filter((r) => classify(r) === "alto").length;
  const medio = rows.filter((r) => classify(r) === "medio").length;
  const normal = rows.filter((r) => classify(r) === "normal").length;
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Triaje TeleGluc — ${fecha}</title>
    <style>
      *{box-sizing:border-box}
      body{font-family:Inter,Roboto,Arial,sans-serif;color:#111;margin:32px;font-size:12px}
      h1{margin:0 0 4px;font-size:20px;color:#0056b3}
      .meta{color:#555;margin-bottom:18px;font-size:12px}
      .summary{display:flex;gap:12px;margin-bottom:18px}
      .pill{flex:1;border:1px solid #e5e7eb;border-radius:10px;padding:10px 14px}
      .pill .n{font-size:20px;font-weight:700}
      .pill .l{font-size:11px;color:#555;text-transform:uppercase;letter-spacing:.04em}
      table{width:100%;border-collapse:collapse}
      th,td{padding:8px 10px;text-align:left;border-bottom:1px solid #e5e7eb;vertical-align:top}
      th{background:#0056b3;color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:.04em}
      footer{margin-top:24px;font-size:10px;color:#777;text-align:center}
      @media print { body{margin:16mm} }
    </style></head><body>
    <h1>TeleGluc — Reporte de Triaje</h1>
    <div class="meta">Centro de Salud · Generado el ${fecha}</div>
    <div class="summary">
      <div class="pill"><div class="l">Total</div><div class="n">${rows.length}</div></div>
      <div class="pill"><div class="l">Riesgo alto</div><div class="n" style="color:#c0392b">${alto}</div></div>
      <div class="pill"><div class="l">Riesgo medio</div><div class="n" style="color:#b7791f">${medio}</div></div>
      <div class="pill"><div class="l">Normal</div><div class="n" style="color:#1f7a3a">${normal}</div></div>
    </div>
    <table>
      <thead><tr><th>#</th><th>Paciente</th><th>Fecha/hora</th><th>Posta</th><th>Glucosa</th><th>Riesgo</th><th>Síntomas</th></tr></thead>
      <tbody>${body || `<tr><td colspan="7" style="text-align:center;padding:20px;color:#777">Sin fichas</td></tr>`}</tbody>
    </table>
    <footer>Lista priorizada por nivel de riesgo · TeleGluc</footer>
    <script>window.onload=()=>{setTimeout(()=>window.print(),250)}</script>
    </body></html>`;
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
