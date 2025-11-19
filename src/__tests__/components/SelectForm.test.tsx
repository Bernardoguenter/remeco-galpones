import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SelectForm } from "../../components/React/SelectForm";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("SelectForm Component", () => {
  it("debería renderizar con label", () => {
    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="Hierro torsionado">Hierro Torsionado</option>
        </SelectForm>
      </Wrapper>
    );

    expect(screen.getByText("Material")).toBeInTheDocument();
  });

  it("debería renderizar opciones", () => {
    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="Hierro torsionado">Hierro Torsionado</option>
          <option value="Perfil U">Perfil U</option>
          <option value="Alma llena">Alma Llena</option>
        </SelectForm>
      </Wrapper>
    );

    expect(screen.getByDisplayValue("Hierro Torsionado")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Perfil U" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Alma Llena" })
    ).toBeInTheDocument();
  });

  it("debería permitir cambiar la opción seleccionada", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="Hierro torsionado">Hierro Torsionado</option>
          <option value="Perfil U">Perfil U</option>
          <option value="Alma llena">Alma Llena</option>
        </SelectForm>
      </Wrapper>
    );

    const select = screen.getByDisplayValue(
      "Hierro Torsionado"
    ) as HTMLSelectElement;
    await user.selectOptions(select, "Perfil U");

    expect(select.value).toBe("Perfil U");
  });

  it("debería tener clase de borde slate-300", () => {
    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="test">Test</option>
        </SelectForm>
      </Wrapper>
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-slate-300");
  });

  it("debería tener focus styles", () => {
    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="test">Test</option>
        </SelectForm>
      </Wrapper>
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("focus:ring-2");
    expect(select).toHaveClass("focus:ring-slate-600");
  });

  it("debería renderizar con padding", () => {
    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="test">Test</option>
        </SelectForm>
      </Wrapper>
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("p-2");
  });

  it("debería renderizar con bordes redondeados", () => {
    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="test">Test</option>
        </SelectForm>
      </Wrapper>
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("rounded-md");
  });

  it("debería mantener la opción seleccionada al cambiar", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <SelectForm
          name="material"
          label="Material">
          <option value="Hierro torsionado">Hierro Torsionado</option>
          <option value="Perfil U">Perfil U</option>
          <option value="Alma llena">Alma Llena</option>
        </SelectForm>
      </Wrapper>
    );

    const select = screen.getByDisplayValue(
      "Hierro Torsionado"
    ) as HTMLSelectElement;

    await user.selectOptions(select, "Alma llena");
    expect(select.value).toBe("Alma llena");

    await user.selectOptions(select, "Perfil U");
    expect(select.value).toBe("Perfil U");
  });
});
