import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputAtom from "../../components/atoms/InputAtom";

describe("InputAtom", () => {
  it("renderiza con placeholder", () => {
    render(<InputAtom placeholder="Escribe aquí" />);
    const input = screen.getByPlaceholderText("Escribe aquí");
    expect(input).not.toBeNull();
  });

  it("acepta valor y dispara onChange", () => {
    const handleChange = jasmine.createSpy("onChange");
    render(<InputAtom value="Hola" onChange={handleChange} />);
    const input = screen.getByDisplayValue("Hola");
    fireEvent.change(input, { target: { value: "Nuevo" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("se deshabilita correctamente", () => {
    render(<InputAtom disabled />);
    const input = screen.getByRole("textbox");
    expect(input.disabled).toBeTrue();
  });

  it("aplica clase correctamente", () => {
    render(<InputAtom className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("custom-class");
  });

  it("es requerido cuando se pasa la prop required", () => {
    render(<InputAtom required />);
    const input = screen.getByRole("textbox");
    expect(input.required).toBeTrue();
  });
});
