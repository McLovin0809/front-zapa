import React from 'react';

function Button({ key, text, className }) {
  return <button key={key} className={className}>{text}</button>;
}

export default Button;