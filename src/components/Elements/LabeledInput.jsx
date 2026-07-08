import React, { useContext } from "react";
import Input from "./Input";
import { ThemeContext } from "../../context/themeContext";

function LabeledInput(props) {
  const { label, id, ...rest } = props;
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <label htmlFor={id} className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : ''}`}>
        {label}
      </label>
      <Input 
        id={id} 
        backgroundColor={isDarkMode ? "bg-gray-700" : "bg-white"} 
        border={isDarkMode ? "border-gray-600" : "border-gray-03"} 
        color={isDarkMode ? "text-white" : "text-gray-01"} 
        {...rest} 
      />
    </>
  );
}

export default LabeledInput;