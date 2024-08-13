import React from "react";

const FilterCheckbox = ({ label, checked, onChange, disabled }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={(e) => onChange(label, e.target.checked)}
        className="mr-2"
        disabled={disabled}
      />
      <label htmlFor={label} className="text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default FilterCheckbox;
