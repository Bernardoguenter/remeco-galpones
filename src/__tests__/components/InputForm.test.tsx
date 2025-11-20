import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InputForm } from "../../components/React/InputForm";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("InputForm Component", () => {
  it("debería renderizar con label", () => {
    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    expect(screen.getByText("Alto (mts)")).toBeInTheDocument();
  });

  it("debería renderizar input de tipo number", () => {
    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", "number");
  });

  it("debería renderizar input de tipo text", () => {
    render(
      <Wrapper>
        <InputForm
          name="description"
          type="text"
          label="Descripción"
        />
      </Wrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("debería permitir escribir en el input", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    await user.type(input, "5");

    expect(input.value).toBe("5");
  });

  it("debería tener clase de borde slate-300", () => {
    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveClass("border-slate-300");
  });

  it("debería tener focus styles", () => {
    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveClass("focus:ring-2");
    expect(input).toHaveClass("focus:ring-slate-600");
  });

  it("debería renderizar con padding", () => {
    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveClass("p-2");
  });

  it("debería renderizar con bordes redondeados", () => {
    render(
      <Wrapper>
        <InputForm
          name="height"
          type="number"
          label="Alto (mts)"
        />
      </Wrapper>
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveClass("rounded-md");
  });
});
