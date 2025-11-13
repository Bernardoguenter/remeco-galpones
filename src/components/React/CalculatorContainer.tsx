import { useState } from "react";
import type { FormResults, Preferences } from "../../types/types";
import { Calculator } from "./Calculator";
import { FormResult } from "./FormResults";

interface Props {
  preferences: Preferences;
  type: "galpones" | "tinglados";
}

export const CalculatorContainer = ({ preferences, type }: Props) => {
  const [view, setView] = useState<"form" | "result">("form");
  const [formResults, setFormResults] = useState<null | FormResults>(null);
  const [total, setTotal] = useState<number | null>(null);
  return (
    <div className="w-full">
      <h3 className="font-semibold text-slate-800">
        Cotizá tu {type === "galpones" ? "Galpón" : "Tinglado"}
      </h3>
      {view === "form" && (
        <Calculator
          preferences={preferences}
          type={type}
          setFormResults={setFormResults}
          setTotal={setTotal}
          setView={setView}
        />
      )}
      {view === "result" && formResults && total && (
        <FormResult
          formResults={formResults}
          total={total}
          setView={setView}
        />
      )}
    </div>
  );
};
