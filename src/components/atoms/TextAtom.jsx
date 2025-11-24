import React from "react";

function TextAtom({children, variant = 'p', className}) {
    const Tag = variant;
    return <Tag className={className}>{children}</Tag>;
}

export default TextAtom;