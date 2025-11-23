import React from "react";
import TextAtom from "../atoms/TextAtom";

function DynamicTexts({ Texts = [] }) {
    return (
        <>
            {Texts.map((text, index) => (
                <TextAtom key={index} variant={text.variant} className={text.className}>
                    {text.content}
            </TextAtom>
            ))}
        </>
    );
}

export default DynamicTexts;
