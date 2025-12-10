import React from 'react';

function Button({ key, text, className, ...props }) {
  return <button key={key} className={className} {...props}>{text}</button>;
}

export default Button;