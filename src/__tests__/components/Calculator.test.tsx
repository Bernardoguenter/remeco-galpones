import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Calculator } from "../../components/React/Calculator";
import type { Preferences } from "../../types/types";
import userEvent from "@testing-library/user-event";

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

describe("Calculator Component", () => {
  const mockSetFormResults = vi.fn();
  const mockSetTotal = vi.fn();
  const mockSetView = vi.fn();

  beforeEach(() => {
    mockSetFormResults.mockClear();
    mockSetTotal.mockClear();
    mockSetView.mockClear();
  });

  it("debería renderizar el formulario", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    expect(
      screen.getByRole("button", { name: /Calcular/i })
    ).toBeInTheDocument();
  });

  it("debería renderizar campos para galpones", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    expect(screen.getByDisplayValue(/Hierro Torsionado/i)).toBeInTheDocument();
    // Verificar que existen los inputs por su rol
    const spinbuttons = screen.getAllByRole("spinbutton");
    expect(spinbuttons.length).toBeGreaterThanOrEqual(3); // Al menos height, width, length
  });

  it("debería tener selector de material con opciones", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    expect(screen.getByDisplayValue(/Hierro Torsionado/i)).toBeInTheDocument();
  });

  it("debería renderizar botón Calcular", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    expect(
      screen.getByRole("button", { name: /Calcular/i })
    ).toBeInTheDocument();
  });

  it("debería renderizar botón Resetear Formulario", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    expect(
      screen.getByRole("button", { name: /Resetear Formulario/i })
    ).toBeInTheDocument();
  });

  it("debería permitir ingresar valores en los campos", async () => {
    const user = userEvent.setup();

    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    const spinbuttons = screen.getAllByRole("spinbutton");
    // spinbutton[0] es el height, [1] es width, [2] es length
    await user.type(spinbuttons[0], "5");
    await user.type(spinbuttons[1], "10");
    await user.type(spinbuttons[2], "20");

    expect((spinbuttons[0] as HTMLInputElement).value).toBe("5");
    expect((spinbuttons[1] as HTMLInputElement).value).toBe("10");
    expect((spinbuttons[2] as HTMLInputElement).value).toBe("20");
  });

  it("debería permitir cambiar el material", async () => {
    const user = userEvent.setup();

    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    const materialSelect = screen.getByDisplayValue(
      /Hierro Torsionado/i
    ) as HTMLSelectElement;

    await user.selectOptions(materialSelect, "Perfil U");

    expect(materialSelect.value).toBe("Perfil U");
  });

  it("debería renderizar diferentes opciones de material", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    expect(
      screen.getByRole("option", { name: /Hierro Torsionado/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /Perfil U/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /Alma Llena/i })
    ).toBeInTheDocument();
  });

  it("debería tener botón de reset", async () => {
    const user = userEvent.setup();

    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    const resetButton = screen.getByRole("button", {
      name: /Resetear Formulario/i,
    });

    // Verificar que el botón existe y es clickeable
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveClass("bg-white"); // Es un botón secundario

    // Debería ser clicable sin errores
    await user.click(resetButton);
    expect(mockSetFormResults).not.toHaveBeenCalled(); // No debería llamar setFormResults
  });

  it("debería tener estilos correctos en los botones", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    expect(calculateButton).toHaveClass("bg-slate-800");
  });

  it("debería renderizar ambos botones en diferentes estilos", () => {
    render(
      <Calculator
        preferences={mockPreferences}
        type="galpones"
        setFormResults={mockSetFormResults}
        setTotal={mockSetTotal}
        setView={mockSetView}
      />
    );

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    const resetButton = screen.getByRole("button", {
      name: /Resetear Formulario/i,
    });

    // El botón Calcular debe ser primario (bg-slate-800)
    expect(calculateButton).toHaveClass("bg-slate-800");
    // El botón Resetear debe ser secundario (bg-white)
    expect(resetButton).toHaveClass("bg-white");
  });
});
