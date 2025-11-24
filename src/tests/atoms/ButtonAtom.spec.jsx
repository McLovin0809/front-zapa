import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../../components/atoms/ButtonAtom";

describe("ButtonAtom", () => {
  it("renderiza el texto correctamente", () => {
    render(<Button text="Click aquí" />);
    const button = screen.getByText("Click aquí");
    expect(button).not.toBeNull();
  });

  it("aplica clase correctamente", () => {
    render(<Button text="Guardar" className="btn-primary" />);
    const button = screen.getByText("Guardar");
    expect(button.className).toContain("btn-primary");
  });
});
