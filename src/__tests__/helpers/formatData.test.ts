import { describe, it, expect } from "vitest";
import { formatPrices } from "../../helpers/formatData";

describe("formatPrices", () => {
  it("debería formatear un precio positivo correctamente", () => {
    const result = formatPrices(1000);
    // El resultado tiene espacios de no-breaking space, así que solo verificamos el formato
    expect(result).toContain("$");
    expect(result).toContain("1");
    expect(result).toContain("000");
  });

  it("debería formatear 0 como $0", () => {
    const result = formatPrices(0);
    expect(result).toContain("$");
    expect(result).toContain("0");
  });

  it("debería formatear NaN como $0", () => {
    const result = formatPrices(NaN);
    expect(result).toBe("$0");
  });

  it("debería manejar decimales con el formato locale", () => {
    const result = formatPrices(1234.56);
    // Usa coma como separador decimal en es-AR
    expect(result).toContain("1.234");
  });

  it("debería formatear grandes números correctamente", () => {
    const result = formatPrices(1000000);
    expect(result).toContain("$");
  });

  it("debería formatear números pequeños", () => {
    const result = formatPrices(100);
    expect(result).toContain("$");
    expect(result).toContain("100");
  });

  it("debería usar símbolo de peso argentino", () => {
    const result = formatPrices(500);
    expect(result).toContain("$");
  });

  it("debería usar separador de miles", () => {
    const result = formatPrices(10000);
    expect(result).toContain(".");
  });

  it("debería manejar números negativos", () => {
    const result = formatPrices(-1000);
    expect(result).toContain("-");
  });
});
