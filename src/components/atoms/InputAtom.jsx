import React from "react";

const InputAtom = ({type = "text", placeholder = "", name = "", value = "", onChange = () => {}, required = false, autoComplete = "", className = "", disabled = false,}) => {
    return (
        <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} required={required} autoComplete={autoComplete} disabled={disabled} className={className}/>
    );
};

export default InputAtom;