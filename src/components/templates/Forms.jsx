import React from "react";
import DynamicTexts from "../molecules/DynamicTexts";
import Button from "../atoms/ButtonAtom";
import DynamicInputs from "../molecules/DynamicInput";

function Forms({ content = [], className = "p-4" }) {
    return (
        <div className={className}>
        {content.map((item, index) => {
            switch (item.type) {
            case "text":
                return <DynamicTexts key={index} Texts={item.text} />;

            case "button":
                return (
                <Button
                    key={index}
                    text={item.text}
                    className={item.className}
                    onClick={item.onClick}
                    disabled={item.disabled}
                />
                );

            case "inputs":
                return (
                <DynamicInputs
                    key={index}
                    Inputs={item.inputs}
                    className={item.className}
                />
                );

            default:
                return null;
            }
        })}
        </div>
    );
}

export default Forms;
