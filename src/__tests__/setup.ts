// Setup file for vitest
// Este archivo se ejecuta antes de todos los tests

import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
});

// Extender expect con matchers personalizados si es necesario
declare global {
  namespace Vi {
    interface Matchers<R> {
      // Aquí puedes agregar matchers personalizados
    }
  }
}
