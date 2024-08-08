import React, { useState, useEffect } from "react";


const CustomDropdown = ({ options = [] }) => {
  const [selected, setSelected] = useState(options[0] || {});

  useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0]);
    }
  }, [options]);
  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    setSelected(selectedOption);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        className={`w-[fit-content] rounded-lg h-[1.25rem] border border-gray-300 bg-gray-100 px-[12px] py-[4px] text-center flex justify-center items-center text-sm font-semibold ${selected.className}`}
      >
        {selected.label}
      </button>
      <select
        value={selected.value}
        onChange={handleChange}
        className="w-full h-[1.25remF] opacity-0 absolute top-0 left-0 cursor-pointer"
      >
        {options?.map((option, i) => (
          <option key={i} value={option.value} className={option.className}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
