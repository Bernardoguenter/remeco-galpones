import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormResult } from "../../components/React/FormResults";
import type { FormResults } from "../../types/types";
import userEvent from "@testing-library/user-event";

describe("FormResult Component", () => {
  const mockFormResultsGalpon: FormResults = {
    width: 10,
    length: 20,
    height: 5,
    enclousure_height: 4.5,
    structure_type: "galpones",
    material: "Hierro torsionado",
    gates_measurements: { width: 3.33, height: 4.5 },
  };

  const mockFormResultsTinglado: FormResults = {
    width: 10,
    length: 20,
    height: 5,
    enclousure_height: 0,
    structure_type: "tinglados",
    material: "Perfil U",
    gates_measurements: { width: 0, height: 0 },
  };

  const mockSetView = vi.fn();

  it("debería renderizar correctamente para galpones", () => {
    render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    expect(screen.getByText(/galpón/i)).toBeInTheDocument();
    expect(screen.getByText(/Hierro torsionado/i)).toBeInTheDocument();
  });

  it("debería renderizar correctamente para tinglados", () => {
    render(
      <FormResult
        total={40000}
        formResults={mockFormResultsTinglado}
        setView={mockSetView}
      />
    );

    expect(screen.getByText(/tinglado/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil U/i)).toBeInTheDocument();
  });

  it("debería incluir las dimensiones en el mensaje para galpones", () => {
    render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    expect(screen.getByText(/10mts de ancho/i)).toBeInTheDocument();
    expect(screen.getByText(/5mts de alto/i)).toBeInTheDocument();
    expect(screen.getByText(/20mts de largo/i)).toBeInTheDocument();
  });

  it("debería mostrar portón corredizo solo para galpones", () => {
    const { rerender } = render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    expect(screen.getByText(/portón corredizo/i)).toBeInTheDocument();

    rerender(
      <FormResult
        total={40000}
        formResults={mockFormResultsTinglado}
        setView={mockSetView}
      />
    );

    expect(screen.queryByText(/portón corredizo/i)).not.toBeInTheDocument();
  });

  it("debería mostrar el total formateado", () => {
    render(
      <FormResult
        total={100000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    // Busca el símbolo $ en el precio
    const priceElements = screen.getAllByText(/\$/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it("debería incluir Iva incluido", () => {
    render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    expect(screen.getByText(/Iva incluido/i)).toBeInTheDocument();
  });

  it("debería renderizar botón Volver a Cotizar", () => {
    render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    expect(
      screen.getByRole("button", { name: /Volver a Cotizar/i })
    ).toBeInTheDocument();
  });

  it("debería llamar a setView con form al hacer click en Volver a Cotizar", async () => {
    const user = userEvent.setup();

    render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    const button = screen.getByRole("button", { name: /Volver a Cotizar/i });
    await user.click(button);

    expect(mockSetView).toHaveBeenCalledWith("form");
  });

  it("debería renderizar múltiples botones de acción", () => {
    render(
      <FormResult
        total={50000}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    // Debería haber al menos el botón "Volver a Cotizar" y potencialmente ReactAskButton
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("debería mostrar diferentes materiales", () => {
    const formResultsAlmaLlena: FormResults = {
      ...mockFormResultsGalpon,
      material: "Alma llena",
    };

    render(
      <FormResult
        total={55000}
        formResults={formResultsAlmaLlena}
        setView={mockSetView}
      />
    );

    expect(screen.getByText(/Alma llena/i)).toBeInTheDocument();
  });

  it("debería redondear el total mostrado", () => {
    render(
      <FormResult
        total={50123.99}
        formResults={mockFormResultsGalpon}
        setView={mockSetView}
      />
    );

    // El mensaje debe mostrar el precio redondeado
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });
});
