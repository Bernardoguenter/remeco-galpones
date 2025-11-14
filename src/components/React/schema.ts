import * as v from "valibot";

export const CalculatorSchema = v.object({
  height: v.pipe(
    v.number("La altura debe ser un número"),
    v.minValue(1, "El valor debe ser mayor a 0")
  ),
  length: v.pipe(
    v.number("El largo debe ser un número"),
    v.minValue(1, "El valor debe ser mayor a 0")
  ),
  width: v.pipe(
    v.number("El ancho debe ser un número"),
    v.minValue(1, "El valor debe ser mayor a 0")
  ),
  material: v.pipe(
    v.string("El campo debe ser una cadena de texto"),
    v.minLength(1, "El valor debe contener un caracter cómo mínimo")
  ),
});

export type CalculatorSchemaType = v.InferInput<typeof CalculatorSchema>;
