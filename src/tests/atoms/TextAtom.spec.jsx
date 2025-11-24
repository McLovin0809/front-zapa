import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jasmine-dom";
import TextAtom from "../../components/atoms/TextAtom";

describe("TextAtom", () => {
  it("renderiza el texto correctamente", () => {
    render(<TextAtom>Hola Mundo</TextAtom>);
    expect(screen.getByText("Hola Mundo")).toBeInTheDocument();
  });

  it("usa el tag correcto según 'variant'", () => {
    render(<TextAtom variant="h2">Título</TextAtom>);
    const element = screen.getByText("Título");
    expect(element.tagName).toBe("H2");
  });
});