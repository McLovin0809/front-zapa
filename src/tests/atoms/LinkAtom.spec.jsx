import React from "react";
import { render, screen } from "@testing-library/react";
import LinkAtom from "../../components/atoms/LinkAtom";

describe("LinkAtom", () => {
  it("renderiza el texto correctamente", () => {
    render(<LinkAtom href="/home">Ir a Home</LinkAtom>);
    const link = screen.getByText("Ir a Home");
    expect(link).not.toBeNull();
  });

  it("usa el href correcto", () => {
    render(<LinkAtom href="/about">Acerca</LinkAtom>);
    const link = screen.getByText("Acerca");
    expect(link.getAttribute("href")).toBe("/about");
  });

  it("aplica la clase adicional", () => {
    render(<LinkAtom href="/" className="extra">Inicio</LinkAtom>);
    const link = screen.getByText("Inicio");
    expect(link.className).toContain("extra");
  });
});
