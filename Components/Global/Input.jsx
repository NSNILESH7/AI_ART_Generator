import React from "react";

const Input = ({ type, placeholder, onChange, stylecss }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      style={{ margin: stylecss }}
      className="w-64 px-3 py-2 bg-zinc-700 focus:outline-none
      focus:ring-1 focus:indigo-blue-500 rounded-lg border border-zinc-600
      hover:brightness-110"


    />
  );
};

export default Input;
