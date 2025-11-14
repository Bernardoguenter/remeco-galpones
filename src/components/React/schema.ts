import * as v from "valibot";

export const CalculatorSchema = v.object({
  height: v.pipe(
    v.number("La altura debe ser un número"),
    v.minValue(1, "El valor debe ser mayor a 0"),
    v.transform((input) => Number(input))
  ),
  length: v.pipe(
    v.number("El largo debe ser un número"),
    /*     v.minValue(1, "El valor debe ser mayor a 0"),
     */ v.transform((input) => Number(input))
  ),
  width: v.pipe(
    v.number("El ancho debe ser un número"),
    /* v.minValue(1, "El valor debe ser mayor a 0"), */
    v.transform((input) => Number(input))
  ),
  material: v.pipe(
    v.string("El campo debe ser una cadena de texto"),
    v.minLength(1, "El valor debe contener un caracter cómo mínimo")
  ),
});

export type CalculatorSchemaType = v.InferInput<typeof CalculatorSchema>;

/*import * as v from "valibot";

const numberFromString = (fieldName: string) =>
  v.pipe(
    v.string(`${fieldName} debe ser un número`),
    v.transform((value) => Number(value)),
    v.check((n) => !Number.isNaN(n), `${fieldName} debe ser un número válido`),
    v.minValue(1, `${fieldName} debe ser mayor a 0`)
  );

export const CalculatorSchema = v.object({
  height: numberFromString("La altura"),
  length: numberFromString("El largo"),
  width: numberFromString("El ancho"),
  material: v.pipe(
    v.string("El campo debe ser una cadena de texto"),
    v.minLength(1, "Debes seleccionar un material")
  ),
});

export type CalculatorSchemaType = v.InferOutput<typeof CalculatorSchema>;
 */
