import React from 'react';
import "../../style/components/atoms/InputFile.css"

function InputFile({
  onChange,
  accept = "image/*",
  className = "",
  disabled = false,
  preview = null,
}) {
  return (
    <div className={`inputfile-wrapper ${className}`}>
      <div className="inputfile-container">
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          disabled={disabled}
          className="inputfile-input"
        />
        <div className={`inputfile-box ${disabled ? 'inputfile-disabled' : 'inputfile-active'}`}>
          <svg className="inputfile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          {disabled ? "Subiendo..." : "Seleccionar imagen"}
        </div>
      </div>

      {preview && (
        <div className="inputfile-preview">
          <img src={preview} alt="Previsualización" className="inputfile-img" />
        </div>
      )}
    </div>
  );
}

export default InputFile;
