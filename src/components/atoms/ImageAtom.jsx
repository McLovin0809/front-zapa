import React from "react";

function ImageAtom({src, alt, className}){
    return <img src={src} alt={alt} className={className}/>;
}

export default ImageAtom;