import React from "react";
import InputAtom from "../atoms/InputAtom";

function DynamicInputs({ Inputs = [], className = "" }) {
    return (
        <>
        {Inputs.map((input, index) => (
            <div className={className} key={index}>
            <InputAtom
                type={input.type || "text"}
                placeholder={input.placeholder}
                name={input.name}
                value={input.value}
                onChange={input.onChange}
                required={input.required}
                autoComplete={input.autoComplete}
                disabled={input.disabled}
                className={input.className}
            />
            </div>
        ))}
        </>
    );
}

export default DynamicInputs;
