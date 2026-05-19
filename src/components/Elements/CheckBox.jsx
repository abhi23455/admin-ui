import React from 'react'

function CheckBox(props) {
    const { label, id, ...rest } = props
  return (
    <>
        <input
            type="checkbox"
            className="accent-primary w-4 h-4"
            id={id}
            {...rest}
        />
        <label 
            htmlFor={id}
            className="text-sm text-gray-01"
        >
            {label}
        </label>
    </>
  )
}

export default CheckBox