import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputFile from "../../components/atoms/InputFile";

describe("InputFile", () => {
  it("renderiza el input de tipo file", () => {
    render(<InputFile />);
    const input = document.querySelector(".inputfile-input");
    expect(input).not.toBeNull();
    expect(input.type).toBe("file");
  });

  it("llama a onChange al seleccionar archivo", () => {
    const handleChange = jasmine.createSpy("onChange");
    render(<InputFile onChange={handleChange} />);
    const input = document.querySelector(".inputfile-input");
    const file = new File(["contenido"], "test.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [file] } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("muestra preview cuando se pasa prop", () => {
    render(<InputFile preview="preview.png" />);
    const img = screen.getByAltText("Previsualización");
    expect(img).not.toBeNull();
    expect(img.getAttribute("src")).toBe("preview.png");
  });

  it("muestra texto 'Subiendo...' cuando está deshabilitado", () => {
    render(<InputFile disabled />);
    const box = screen.getByText("Subiendo...");
    expect(box).not.toBeNull();
  });

  it("muestra texto 'Seleccionar imagen' cuando está activo", () => {
    render(<InputFile />);
    const box = screen.getByText("Seleccionar imagen");
    expect(box).not.toBeNull();
  });
});
