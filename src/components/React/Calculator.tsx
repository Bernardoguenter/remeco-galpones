import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type { FormResults, Preferences } from "../../types/types";
import { Button } from "./Button";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CalculatorSchema, type CalculatorSchemaType } from "./schema";
import { InputForm } from "./InputForm";
import { SelectForm } from "./SelectForm";
import { getStructureBudgetTotal } from "@helpers/calculatePrices";

interface Props {
  preferences: Preferences;
  type: "galpones" | "tinglados";
  setFormResults: React.Dispatch<React.SetStateAction<FormResults | null>>;
  setTotal: React.Dispatch<React.SetStateAction<number | null>>;
  setView: React.Dispatch<React.SetStateAction<"form" | "result">>;
}

export const Calculator = ({
  preferences,
  type,
  setFormResults,
  setTotal,
  setView,
}: Props) => {
  const methods = useForm<CalculatorSchemaType>({
    resolver: valibotResolver(CalculatorSchema),
    defaultValues: {
      height: 0,
      length: 0,
      width: 0,
      material: "Hierro torsionado",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<CalculatorSchemaType> = (data) => {
    const enclousureHeight = type === "galpones" ? data.height - 0.5 : 0;
    const gates =
      type === "galpones"
        ? { width: data.width / 3, height: data.height - 0.5 }
        : { width: 0, height: 0 };

    const result = getStructureBudgetTotal(
      preferences,
      data.width,
      data.length,
      data.height,
      enclousureHeight,
      type,
      data.material,
      gates
    );

    setFormResults({
      width: data.width,
      length: data.length,
      height: data.height,
      enclousure_height: enclousureHeight,
      structure_type: type,
      material: data.material,
      gates_measurements: gates,
    });

    setTotal(result);
    setView("result");
    reset();
  };

  const onReset = () => {
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-full mt-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectForm
            name="material"
            label="Material">
            <option value="Hierro torsionado">Hierro Torsionado</option>
            <option value="Perfil U">Perfil U</option>
            <option value="Alma llena">Alma Llena</option>
          </SelectForm>
          <InputForm
            label="Alto (mts)"
            name="height"
            type="number"
          />
          <InputForm
            label="Ancho (mts)"
            name="width"
            type="number"
          />
          <InputForm
            label="Largo (mts)"
            name="length"
            type="number"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <Button style="secondary">
            <span onClick={onReset}>Resetear Formulario</span>
          </Button>
          <Button
            type="submit"
            style="primary">
            Calcular
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
