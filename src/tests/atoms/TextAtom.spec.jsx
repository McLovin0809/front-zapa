import React from "react";
import { render, screen } from "@testing-library/react";
import TextAtom from "../../components/atoms/TextAtom";

describe("TextAtom", () => {
  it("renderiza el texto correctamente", () => {
    render(<TextAtom>Hola Mundo</TextAtom>);
    const element = screen.getByText("Hola Mundo");
    expect(element).not.toBeNull(); // matcher nativo
  });

  it("usa el tag correcto según 'variant'", () => {
    render(<TextAtom variant="h2">Título</TextAtom>);
    const element = screen.getByText("Título");
    expect(element.tagName).toBe("H2");
  });
});
