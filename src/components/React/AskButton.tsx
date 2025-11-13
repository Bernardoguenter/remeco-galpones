interface Props {
  message: string;
  style?: "primary" | "secondary";
}

const whatsappNumber = import.meta.env.PUBLIC_WA_NUMBER;

export const ReactAskButton = ({ message, style = "primary" }: Props) => {
  const baseClasses =
    "border px-4 py-2 border-slate-800 rounded w-full text-center";
  const styleClasses =
    style === "primary"
      ? "bg-slate-800 text-white hover:bg-white hover:text-slate-800 "
      : "bg-white text-slate-800 hover:bg-slate-800 hover:text-white transition";
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hola, me contacto a través del sitio web de Galpones y Tingaldos. Estoy interesado en un ${message}`}
      className={`${baseClasses} ${styleClasses} transition-all delay-75 self-start`}
      target="_blank">
      Hablar con un asesor
    </a>
  );
};
