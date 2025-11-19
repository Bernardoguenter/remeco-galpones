import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../../components/React/Button";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("debería renderizar con el texto proporcionado", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("debería tener tipo button por defecto", () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("debería permitir cambiar el tipo a submit", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("debería aplicar estilos primarios por defecto", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-slate-800");
    expect(button).toHaveClass("text-white");
  });

  it("debería aplicar estilos secundarios cuando se especifique", () => {
    render(<Button style="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-slate-800");
  });

  it("debería ejecutar onClick cuando se hace click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("debería permitir múltiples clicks", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("debería renderizar elementos hijo complejos", () => {
    render(
      <Button>
        <span data-testid="span-child">Complex child</span>
      </Button>
    );
    expect(screen.getByTestId("span-child")).toBeInTheDocument();
  });

  it("debería tener cursor pointer", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-pointer");
  });

  it("debería aplicar clase border", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });
});
