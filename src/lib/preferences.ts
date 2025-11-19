import type { Preferences } from "../types/types";
import { supabase } from "./supabase";

let cachedPreferences: Preferences | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutos

export async function getCachedPreferences() {
  const now = Date.now();

  if (cachedPreferences && now - lastFetchTime < CACHE_DURATION) {
    return cachedPreferences;
  }

  const { data, error } = await supabase
    .from("preferences_web")
    .select(
      "company_id,dollar_quote,default_markup,gate_price,u_profile_cost,iva_percentage,enclousure_cost,solid_web_columns_price_list,twisted_iron_cost,twisted_iron_column_cost,u_profile_column_cost,solid_web_price_list"
    )
    .single();

  if (error) throw new Error(error.message);

  cachedPreferences = data;
  lastFetchTime = now;

  return data;
}
