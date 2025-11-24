import React from "react";
import { render, screen } from "@testing-library/react";
import ImageAtom from "../../components/atoms/ImageAtom";

describe("ImageAtom", () => {
  it("renderiza con src y alt", () => {
    render(<ImageAtom src="foto.png" alt="Foto de prueba" />);
    const img = screen.getByAltText("Foto de prueba");
    // Jasmine: comprobamos que no sea null
    expect(img).not.toBeNull();
    expect(img.getAttribute("src")).toBe("foto.png");
  });

  it("aplica clase correctamente", () => {
    render(<ImageAtom src="foto.png" alt="Foto" className="extra" />);
    const img = screen.getByAltText("Foto");
    expect(img.className).toContain("extra");
  });
});
