import { formatPrices } from "@helpers/formatData";
import type { FormResults } from "../../types/types";
import { Button } from "./Button";
import { ReactAskButton } from "./AskButton";

interface Props {
  total: number;
  formResults: FormResults;
  setView: React.Dispatch<React.SetStateAction<"form" | "result">>;
}

export const FormResult = ({ total, formResults, setView }: Props) => {
  const handleView = () => {
    setView("form");
  };

  const message =
    formResults.structure_type === "galpones"
      ? ` Un galpón con estructura de ${formResults.material} de ${
          formResults.width
        }mts de ancho x ${formResults.height}mts de alto x
          ${
            formResults.length
          }mts de largo, con portón corredizo, tiene un costo
          aproximado de ${formatPrices(Math.floor(total))} (Iva incluido).`
      : `Un tinglado con estructura de ${formResults.material} de
          ${formResults.width}mts de ancho x ${formResults.height}
          mts de alto x ${formResults.length}mts de largo tiene un costo
          aproximado de ${formatPrices(Math.floor(total))} (Iva incluido).`;

  return (
    <div className="mt-4 text-center">
      <p className=" bg-slate-900 p-2 rounded text-white text-balance text-base!">
        {message}
      </p>

      <div className="mt-8 w-full flex items-center justify-strech px-10 flex-col gap-4">
        <ReactAskButton
          style="primary"
          message={message}
        />
        <Button style="secondary">
          <span onClick={handleView}>Volver a Cotizar</span>
        </Button>
      </div>
    </div>
  );
};
