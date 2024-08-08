import React, { useState, useEffect } from "react";

const SearchableMultiSelect = ({ options = [], onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option)
        : [...prevSelected, option]
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const shouldShowDropdown = searchTerm && filteredOptions.length > 0;
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search team members..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full border p-2 rounded-lg"
      />
      {shouldShowDropdown && (
        <div className="absolute bg-white border mt-1 w-full rounded max-h-60 overflow-y-auto z-10">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionToggle(option)}
            >
              <img
                src={option.avatar}
                alt={option.label}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>{option.label}</span>
              {selectedOptions.includes(option) && (
                <span className="ml-auto text-green-500">&#10003;</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableMultiSelect;
