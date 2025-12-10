import React from "react";
import { render, screen } from "@testing-library/react";
import DynamicTexts from "../../components/molecules/DynamicTexts";

describe("DynamicTexts", () => {
  it("renderiza textos con el contenido correcto", () => {
    render(
      <DynamicTexts
        Texts={[
          { content: "Hola mundo", variant: "p" },
          { content: "Título", variant: "h1" }
        ]}
      />
    );
    const texto1 = screen.getByText("Hola mundo");
    const texto2 = screen.getByText("Título");
    expect(texto1).not.toBeNull();
    expect(texto2).not.toBeNull();
  });

  it("aplica la clase correctamente", () => {
    render(
      <DynamicTexts
        Texts={[{ content: "Texto con clase", variant: "p", className: "extra" }]}
      />
    );
    const texto = screen.getByText("Texto con clase");
    expect(texto.className).toContain("extra");
  });
});
