import type { Preferences, SolidWebPriceMap } from "../types/types";

const calculateGatePrice = (
  gates_measurements: Record<string, number>,
  gate_price: number
) => {
  const square_meters = gates_measurements.height * gates_measurements.width;
  if (square_meters <= 22.5) return 0;

  return (square_meters - 22.5) * gate_price;
};

export const getStructureBudgetTotal = (
  preferences: Preferences,
  width: number,
  length: number,
  height: number,
  enclousure_height: number,
  structure_type: string,
  material: string,
  gates_measurements: Record<string, number>
) => {
  const {
    default_markup,
    gate_price,
    enclousure_cost,
    twisted_iron_cost,
    u_profile_cost,
    twisted_iron_column_cost,
    u_profile_column_cost,
    solid_web_price_list,
    solid_web_columns_price_list,
  } = preferences;

  console.log({ width, length, height });
  const floorArea = width * length;
  const perimeter = 2 * (width + length);
  const enclousureArea = perimeter * enclousure_height;

  const price_per_meter =
    material === "Hierro torsionado"
      ? twisted_iron_cost
      : material === "Perfil U"
      ? u_profile_cost
      : calculateSolidWebStructure(width, solid_web_price_list!);

  console.log("price_per_meter", price_per_meter);

  //CALCULAR PRECIO DE ESTRUCTURA
  const structure_cost = floorArea * price_per_meter;
  console.log("structure_cost", structure_cost);

  //CALCULAR COLUMNAS
  const numberOfColumns = Math.floor(length / 5) + 1;
  const totalColumns = numberOfColumns * 2;

  console.log("material", material);
  console.log("twisted_iron_column_cost", twisted_iron_column_cost);
  const columnsPrice =
    material === "Hierro torsionado"
      ? twisted_iron_column_cost
      : material === "Perfil U"
      ? u_profile_column_cost
      : calculateSolidWebStructure(width, solid_web_columns_price_list);

  console.log("columnsPrice", columnsPrice);

  const columnsCost =
    height === 5
      ? 0
      : totalColumns *
        Math.abs(height - 5) *
        columnsPrice *
        (height > 5 ? 1 : -1);

  console.log("COLUMNS COST", columnsCost);

  //CALCULAR COSTO CERRAMIENTO
  const enclousureCost =
    structure_type === "tinglados" ? 0 : enclousureArea * enclousure_cost;

  //CALCULAR COSTO DE PORTÓN
  const gateCost =
    structure_type === "galpones"
      ? calculateGatePrice(gates_measurements, gate_price)
      : 0;

  //CALCULAR PRECIO TOTAL
  const totalPrice = structure_cost + columnsCost + enclousureCost + gateCost;
  console.log("TOTAL PRICE", totalPrice);

  const finalPriceInDollars =
    default_markup > 0 ? totalPrice * (1 + default_markup / 100) : totalPrice;

  const finalPriceARS = finalPriceInDollars * preferences.dollar_quote;

  return finalPriceARS;
};

const calculateSolidWebStructure = (
  width: number,
  solid_web_price_list: SolidWebPriceMap
) => {
  return width <= 8
    ? solid_web_price_list["8"]
    : width <= 12
    ? solid_web_price_list["12"]
    : width <= 16
    ? solid_web_price_list["16"]
    : width <= 20
    ? solid_web_price_list["20"]
    : width <= 25
    ? solid_web_price_list["25"]
    : solid_web_price_list["30"];
};
