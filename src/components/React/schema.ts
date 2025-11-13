import * as z from "zod";

export const CalculatorSchema = z.object({
  height: z.coerce
    .number({
      required_error: "Debes ingresar un número para el alto",
      invalid_type_error: "Debes ingresar un número válido para el alto",
    })
    .min(1, "El alto debe ser mayor a 0"),
  length: z.coerce
    .number({
      required_error: "Debes ingresar un número para el largo",
      invalid_type_error: "Debes ingresar un número válido para el largo",
    })
    .min(1, "El largo debe ser mayor a 0"),
  width: z.coerce
    .number({
      required_error: "Debes ingresar un número para el ancho",
      invalid_type_error: "Debes ingresar un número válido para el ancho",
    })
    .min(1, "El ancho debe ser mayor a 0"),
  material: z.string({
    required_error: "Debes seleccionar un material para la estructura.",
  }),
});

export type CalculatorSchemaType = z.infer<typeof CalculatorSchema>;
