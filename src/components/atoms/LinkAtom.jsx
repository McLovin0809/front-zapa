import React from "react";

const LinkAtom = ({ href, children, className = ''}) => {
    return (
        <a href={href} className={`link-atom ${className}`}>
            {children}
        </a>
    );
};

export default LinkAtom;