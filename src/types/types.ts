export interface Preferences {
  company_id: string;
  dollar_quote: number;
  default_markup: number;
  iva_percentage: number;
  u_profile_cost: number;
  twisted_iron_cost: number;
  solid_web_price_list: SolidWebPriceMap;
  gate_price: number;
  enclousure_cost: number;
  twisted_iron_column_cost: number;
  u_profile_column_cost: number;
  solid_web_columns_price_list: SolidWebPriceMap;
}

export type WidthSolidWeb = 8 | 12 | 16 | 20 | 25 | 30;
export type SolidWebPriceMap = Record<WidthSolidWeb, number>;

export interface FormResults {
  width: number;
  length: number;
  height: number;
  enclousure_height: number;
  structure_type: string;
  material: string;
  gates_measurements: Record<string, number>;
}
