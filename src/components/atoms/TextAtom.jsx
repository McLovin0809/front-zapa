import React from "react";

function TextAtom({children, variant = 'p', className}) {
    const Tag = variant; //puede ser h1 p span etc
    return <Tag className={className}>{children}</Tag>;
}

export default TextAtom;