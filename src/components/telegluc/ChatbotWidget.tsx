import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, AlertTriangle } from "lucide-react";

type Msg = {
  id: number;
  from: "user" | "bot";
  text: string;
  alert?: boolean;
};

const EMERGENCY = ["mareo", "mareos", "sudor", "sudores", "desmayo", "desmayos", "mal", "vision borrosa", "visión borrosa", "nauseas", "náuseas"];
const GREETINGS = ["hola", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "hi", "hey"];

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function botReply(text: string): Omit<Msg, "id" | "from"> {
  const t = norm(text);
  if (EMERGENCY.some((k) => t.includes(norm(k)))) {
    return {
      text:
        "⚠️ ALERTA: Los síntomas que describes pueden ser graves. Acude de INMEDIATO a tu posta médica más cercana o llama al 106 (SAMU). No esperes.",
      alert: true,
    };
  }
  if (GREETINGS.some((k) => t.includes(norm(k)))) {
    return {
      text:
        "¡Hola! Soy el Asistente Virtual de GlucoTech PE. Puedo orientarte sobre controles de glucosa, triaje y síntomas. ¿En qué te ayudo?",
    };
  }
  if (t.includes("ayuno") || t.includes("ayunas") || t.includes("requisito")) {
    return {
      text:
        "Para una medición confiable en ayunas: no comas ni bebas (excepto agua) durante 8 horas antes. Lleva tu carnet y medicación habitual.",
    };
  }
  if (t.includes("medir") || t.includes("glucosa") || t.includes("glucómetro")) {
    return {
      text:
        "Lava tus manos, coloca una tira nueva en el glucómetro, pincha el lateral del dedo y aplica la gota. Registra el valor en tu ficha de Triaje.",
    };
  }
  if (t.includes("posta") || t.includes("contacto") || t.includes("contactar")) {
    return {
      text:
        "Puedes acudir a la posta más cercana o registrar tus datos en la pestaña 'Triaje' del sistema para que un profesional te contacte.",
    };
  }
  if (t.includes("triaje") || t.includes("formulario") || t.includes("registrar")) {
    return {
      text:
        "Ve a tu Ficha de Paciente y completa la pestaña 'Triaje'. Allí tu posta podrá revisar tus valores y priorizar tu atención.",
    };
  }
  if (t.includes("riesgo") || t.includes("nivel")) {
    return {
      text:
        "El sistema clasifica tu riesgo en Normal, Medio o Alto según tu glucemia, estado de medición y síntomas reportados. Tu médico revisa cada ficha.",
    };
  }
  return {
    text:
      "Puedo ayudarte con mediciones de glucosa, triaje, síntomas y contacto con tu posta. Usa los botones rápidos o escribe tu consulta.",
  };
}

const QUICK = [
  { label: "¿Requisitos para medirme?", text: "¿Cuáles son los requisitos para medirme la glucosa?" },
  { label: "Contactar posta", text: "¿Cómo contacto a mi posta?" },
  { label: "¿Cómo mido mi glucosa?", text: "¿Cómo mido mi glucosa?" },
];

const BRAND = "#085041";
const BRAND_CTA = "#1d9e75";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      from: "bot",
      text:
        "Hola, soy el Asistente Virtual de GlucoTech PE. Puedo orientarte sobre glucosa, triaje y síntomas. Si tienes mareo, sudor o desmayo, acude a tu posta de inmediato.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: nextId.current++, from: "user", text: trimmed };
    const reply = botReply(trimmed);
    const botMsg: Msg = { id: nextId.current++, from: "bot", ...reply };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Cerrar chat de asistencia" : "Abrir chat de asistencia"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
        style={{ backgroundColor: BRAND_CTA, color: "white" }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Asistente Virtual GlucoTech PE"
          className="fixed bottom-24 right-5 z-50 flex w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
          style={{ height: "min(560px, 75vh)" }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundColor: BRAND }}
          >
            <div>
              <p className="text-sm font-semibold leading-tight">GlucoTech PE · Asistente</p>
              <p className="text-[11px] opacity-90">Orientación sobre glucosa y triaje</p>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-[#f4faf8] p-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-sm text-white"
                      : m.alert
                        ? "rounded-bl-sm border border-[#f7c1c1] bg-[#fcebeb] text-[#791f1f]"
                        : "rounded-bl-sm border border-[#ecf0f1] bg-white text-[#2c3e50]"
                  }`}
                  style={m.from === "user" ? { backgroundColor: BRAND_CTA } : undefined}
                >
                  {m.alert && (
                    <div className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase">
                      <AlertTriangle className="h-3.5 w-3.5" /> Emergencia
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t bg-white px-3 py-2">
            {QUICK.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => send(q.text)}
                className="rounded-full border border-[#ecf0f1] px-2.5 py-1 text-[11px] text-[#2c3e50] transition hover:border-[#0f6e56] hover:text-[#0f6e56]"
              >
                {q.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t bg-white p-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              aria-label="Mensaje"
              className="flex-1 rounded-full border border-[#ecf0f1] px-3 py-2 text-sm outline-none focus:border-[#1d9e75]"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_CTA }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
