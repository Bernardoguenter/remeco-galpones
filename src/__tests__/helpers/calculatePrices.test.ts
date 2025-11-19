import { describe, it, expect } from "vitest";
import { getStructureBudgetTotal } from "../../helpers/calculatePrices";
import type { Preferences } from "../../types/types";

// Mock preferences con valores realistas
const mockPreferences: Preferences = {
  company_id: "test-company",
  dollar_quote: 1000, // 1 dólar = 1000 ARS
  default_markup: 10, // 10% de markup
  iva_percentage: 21,
  twisted_iron_cost: 50,
  u_profile_cost: 60,
  solid_web_price_list: {
    "8": 70,
    "12": 80,
    "16": 90,
    "20": 100,
    "25": 110,
    "30": 120,
  },
  gate_price: 100,
  enclousure_cost: 40,
  twisted_iron_column_cost: 20,
  u_profile_column_cost: 25,
  solid_web_columns_price_list: {
    "8": 30,
    "12": 35,
    "16": 40,
    "20": 45,
    "25": 50,
    "30": 55,
  },
};

describe("getStructureBudgetTotal", () => {
  it("debería calcular el precio total para una estructura de galpón con Hierro Torsionado", () => {
    const result = getStructureBudgetTotal(
      mockPreferences,
      10, // width
      20, // length
      5, // height (sin costo adicional de columnas)
      4.5, // enclousure_height
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 } // gates measurements
    );

    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe("number");
    expect(result).not.toBeNaN();
  });

  it("debería calcular el precio total para una estructura de tinglado", () => {
    const result = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      0, // enclousure_height es 0 para tinglados
      "tinglados",
      "Hierro torsionado",
      { width: 0, height: 0 } // no gates para tinglados
    );

    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe("number");
  });

  it("debería incluir costo adicional de columnas cuando la altura es mayor a 5", () => {
    const resultHeight5 = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 }
    );

    const resultHeight6 = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      6, // altura mayor
      5.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 5.5 }
    );

    // La altura 6 debe ser más cara que la altura 5
    expect(resultHeight6).toBeGreaterThan(resultHeight5);
  });

  it("debería aplicar markup correctamente", () => {
    const preferencesWithMarkup = { ...mockPreferences, default_markup: 20 };
    const preferencesNoMarkup = { ...mockPreferences, default_markup: 0 };

    const resultWithMarkup = getStructureBudgetTotal(
      preferencesWithMarkup,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 }
    );

    const resultNoMarkup = getStructureBudgetTotal(
      preferencesNoMarkup,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 }
    );

    // Con markup debe ser más caro
    expect(resultWithMarkup).toBeGreaterThan(resultNoMarkup);
  });

  it("debería usar material Perfil U correctamente", () => {
    const result = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Perfil U",
      { width: 3.33, height: 4.5 }
    );

    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe("number");
  });

  it("debería usar material Alma llena correctamente", () => {
    const result = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Alma llena",
      { width: 3.33, height: 4.5 }
    );

    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe("number");
  });

  it("debería convertir a ARS según el tipo de cambio", () => {
    const preferencesWithLowRate = { ...mockPreferences, dollar_quote: 500 };
    const preferencesWithHighRate = { ...mockPreferences, dollar_quote: 1500 };

    const resultLowRate = getStructureBudgetTotal(
      preferencesWithLowRate,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 }
    );

    const resultHighRate = getStructureBudgetTotal(
      preferencesWithHighRate,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 }
    );

    expect(resultHighRate).toBeGreaterThan(resultLowRate);
  });

  it("debería incluir costo de portón para galpones", () => {
    // Gates con área que excede 22.5 m²
    const result = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 5, height: 5 } // área de portón = 25 m²
    );

    expect(result).toBeGreaterThan(0);
  });

  it("no debería incluir costo de portón para tinglados", () => {
    const resultGalpon = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      4.5,
      "galpones",
      "Hierro torsionado",
      { width: 3.33, height: 4.5 }
    );

    const resultTinglado = getStructureBudgetTotal(
      mockPreferences,
      10,
      20,
      5,
      0,
      "tinglados",
      "Hierro torsionado",
      { width: 0, height: 0 }
    );

    // El galpón debe ser más caro que el tinglado por el portón
    expect(resultGalpon).toBeGreaterThan(resultTinglado);
  });

  it("debería calcular correctamente con dimensiones pequeñas", () => {
    const result = getStructureBudgetTotal(
      mockPreferences,
      5,
      10,
      4,
      3.5,
      "galpones",
      "Hierro torsionado",
      { width: 1.67, height: 3.5 }
    );

    expect(result).toBeGreaterThan(0);
    expect(result).not.toBeNaN();
  });

  it("debería calcular correctamente con dimensiones grandes", () => {
    const result = getStructureBudgetTotal(
      mockPreferences,
      50,
      100,
      8,
      7.5,
      "galpones",
      "Hierro torsionado",
      { width: 16.67, height: 7.5 }
    );

    expect(result).toBeGreaterThan(0);
    expect(result).not.toBeNaN();
  });
});
