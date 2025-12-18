import { config } from "@config/config";
import { pushGtmEvent } from "@helpers/gtmEvents";

interface Props {
  message: string;
  style?: "primary" | "secondary";
}

const whatsappNumber = config.wa_number;

export const ReactAskButton = ({ message, style = "primary" }: Props) => {
  const baseClasses =
    "border px-4 py-2 border-slate-800 rounded w-full text-center";
  const styleClasses =
    style === "primary"
      ? "bg-slate-800 text-white hover:bg-white hover:text-slate-800 "
      : "bg-white text-slate-800 hover:bg-slate-800 hover:text-white transition";

  const handleChat = (message: string) => {
    pushGtmEvent("asesor_click", { source: "calculator_asesor", message });

    window.open(
      `https://wa.me/${whatsappNumber}?text=Hola, me contacto a través del sitio web de Galpones y Tingaldos. Estoy interesado en un ${message}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={() => handleChat(message)}
      title="Chatear por Whatsapp"
      id="chat_with_us"
      className={`${baseClasses} ${styleClasses} transition-all delay-75 self-start`}>
      Hablar con un asesor
    </button>
  );
};
