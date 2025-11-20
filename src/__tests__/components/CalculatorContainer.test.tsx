import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CalculatorContainer } from "../../components/React/CalculatorContainer";
import type { Preferences } from "../../types/types";

const mockPreferences: Preferences = {
  company_id: "test-company",
  dollar_quote: 1000,
  default_markup: 10,
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

describe("CalculatorContainer Component", () => {
  it("debería renderizar para galpones", () => {
    render(
      <CalculatorContainer
        preferences={mockPreferences}
        type="galpones"
      />
    );

    expect(screen.getByText(/Cotizá tu Galpón/i)).toBeInTheDocument();
  });

  it("debería renderizar para tinglados", () => {
    render(
      <CalculatorContainer
        preferences={mockPreferences}
        type="tinglados"
      />
    );

    expect(screen.getByText(/Cotizá tu Tinglado/i)).toBeInTheDocument();
  });

  it("debería mostrar el formulario inicialmente", () => {
    render(
      <CalculatorContainer
        preferences={mockPreferences}
        type="galpones"
      />
    );

    expect(
      screen.getByRole("button", { name: /Calcular/i })
    ).toBeInTheDocument();
  });

  it("debería renderizar campos del formulario", () => {
    render(
      <CalculatorContainer
        preferences={mockPreferences}
        type="galpones"
      />
    );

    // Verificar que existen inputs numéricos (spinbuttons)
    const spinbuttons = screen.getAllByRole("spinbutton");
    expect(spinbuttons.length).toBeGreaterThan(0);
  });

  it("debería mostrar el selector de material", () => {
    render(
      <CalculatorContainer
        preferences={mockPreferences}
        type="galpones"
      />
    );

    expect(screen.getByDisplayValue(/Hierro Torsionado/i)).toBeInTheDocument();
  });
});
