import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DynamicInputs from "../../components/molecules/DynamicInput";

describe("DynamicInput", () => {
  it("renderiza un input de texto cuando type no es select", () => {
    render(
      <DynamicInputs
        Inputs={[
          { type: "text", placeholder: "Escribe aquí", name: "campo1" }
        ]}
      />
    );
    const input = screen.getByPlaceholderText("Escribe aquí");
    expect(input).not.toBeNull();
    expect(input.getAttribute("type")).toBe("text");
  });

  it("renderiza un select con opciones cuando type es select", () => {
    render(
      <DynamicInputs
        Inputs={[
          {
            type: "select",
            name: "opciones",
            value: "2",
            options: [
              { value: "1", label: "Uno" },
              { value: "2", label: "Dos" }
            ]
          }
        ]}
      />
    );
    const select = screen.getByRole("combobox");
    expect(select).not.toBeNull();

    const optionUno = screen.getByText("Uno");
    const optionDos = screen.getByText("Dos");
    expect(optionUno).not.toBeNull();
    expect(optionDos).not.toBeNull();
  });

  it("llama a onChange cuando cambia el valor del input", () => {
    const handleChange = jasmine.createSpy("onChange");
    render(
      <DynamicInputs
        Inputs={[
          { type: "text", name: "campo", value: "Hola", onChange: handleChange }
        ]}
      />
    );
    const input = screen.getByDisplayValue("Hola");
    fireEvent.change(input, { target: { value: "Nuevo" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("aplica la clase pasada a cada contenedor", () => {
    render(
      <DynamicInputs
        className="contenedor"
        Inputs={[{ type: "text", placeholder: "Campo" }]}
      />
    );
    const wrapper = document.querySelector(".contenedor");
    expect(wrapper).not.toBeNull();
  });
});
