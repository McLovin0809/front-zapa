import React from "react";
import TextAtom from "../atoms/TextAtom";

function DynamicTexts({ Texts = [] }) {
    return (
        <>
            {Texts.map((text) => (
                <TextAtom key={text.id} variant={text.variant} className={text.className}>
                    {text.content}
                </TextAtom>
            ))}
        </>
    );
}

export default DynamicTexts;
