import React, { useState } from "react";
import FilterCheckbox from "./FilterCheckbox";

const filterGroups = [
  {
    name: "Group 1",
    range: [0, 3],
    options: ["urgent", "high", "normal", "low"],
  },
  {
    name: "Group 2",
    range: [4, 8],
    options: ["research", "design", "review", "code", "testing"],
  },
  {
    name: "Group 3",
    range: [9, 11],
    options: ["todo", "in-process", "closed"],
  },
];

const FiltersPanel = ({ onFiltersChange, closeFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleFilterChange = (label, isChecked, index) => {
    let updatedFilters = [];
    if (isChecked) {
      updatedFilters = [...selectedFilters, label];
    } else {
      updatedFilters = selectedFilters.filter((filter) => filter !== label);
    }
    setSelectedFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };
  return (
    <div
      className="p-4 bg-white rounded-md shadow-md w-[18rem]"
      onMouseLeave={closeFilters}
    >
      <div className="grid grid-cols-2 gap-4">
        {filterGroups.flatMap((group) =>
          group.options.map((option, idx) => (
            <FilterCheckbox
              key={option}
              label={option}
              checked={selectedFilters.includes(option)}
              onChange={(isChecked) =>
                handleFilterChange(option, isChecked, group.range[0] + idx)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FiltersPanel;
