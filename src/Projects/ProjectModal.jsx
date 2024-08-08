import React, { useState } from "react";
import { importConfig } from "../assets/Config/importConfig";
import CustomDropdown from "./CustomDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const projectStatusoptions = [
  {
    value: "todo",
    label: "To Do",
    className:
      "text-[#535353] text-[0.625rem] font-[700] leading-[0.75rem] tracking-[-0.00625rem] bg-[#C9C9C9] text-center px-[12px] py-[4px]",
  },
  {
    value: "in-process",
    label: "In Process",
    className:
      "text-[#0065FF] bg-[#E1E1FB] text-[0.625rem] font-[700] leading-[0.75rem] tracking-[-0.00625rem] text-center px-[12px] py-[4px]",
  },
  {
    value: "closed",
    label: "Closed",
    className:
      "text-[#0DC268] bg-[#C2F0D9] text-[0.625rem] font-[700] leading-[0.75rem] tracking-[-0.00625rem] text-center px-[12px] py-[4px]",
  },
];
const ProjectModal = ({ isOpen, onClose, children }) => {
  const [startDate, setStartDate] = useState(new Date());
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[1000]"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-10 max-w-[57.6rem] h-[35.3rem] shadow-lg rounded-[1.25rem] bg-white">
        <div className="border h-full w-full flex flex-col gap-4">
          <div className="flex justify-end items-center">
            <button
              className="text-base font-medium rounded-md w-[1.25rem] h-[1.25rem]"
              onClick={onClose}
            >
              <img src={importConfig.project.cancelLogo} alt="cancelLogo" />
            </button>
          </div>
          <div className="w-full h-auto flex flex-col gap-3">
            <div className="w-full h-auto">
              <label
                htmlFor="textInp"
                className="text-sm text-[#979797] font-[500]"
              >
                Project Title
              </label>
              <br />
              <input
                type="text"
                className="w-[33rem] rounded-lg h-11 border p-3 placeholder:text-[#d1d5db]"
                id="textInp"
                placeholder="Enter your project title"
              />
            </div>
            <div className="h-[8.25rem] w-[33rem] flex justify-between">
              <div className="flex flex-col">
                <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                  <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                    Status
                  </div>
                  <div className="px-2 py-3">
                    <CustomDropdown options={projectStatusoptions} />
                  </div>
                </div>

                <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                  <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                    Sprint Point
                  </div>
                  <div className="px-2 py-3 flex justify-center items-center">
                    <label htmlFor="sprintPoints">
                      <img
                        src={importConfig.project.sprintPoint}
                        alt="sprintPoint"
                      />
                    </label>
                    <input
                      type="number"
                      name="sprint"
                      id="sprintPoints"
                      className="w-20 bg-[#1C1C1C0D] rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                  <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                    Due Date
                  </div>
                  <div className="px-2 py-3 flex justify-center items-center">
                    <label htmlFor="dueDate">
                      <img
                        src={importConfig.project.calenderSvg}
                        alt="sprintPoint"
                      />
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                    <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                      Assignee
                    </div>
                    <div className="px-2 py-3">
                      <CustomDropdown />
                    </div>
                  </div>

                  <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                    <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                      Priority
                    </div>
                    {/* <div className="px-2 py-3 flex justify-center items-center">
                      <label htmlFor="sprintPoints">
                        <img
                          src={importConfig.project.sprintPoint}
                          alt="sprintPoint"
                        />
                      </label>
                      <input
                        type="number"
                        name="sprint"
                        id="sprintPoints"
                        className="w-12 bg-[#1C1C1C0D] rounded-lg p-2"
                      />
                    </div> */}
                  </div>
                  <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                    <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                      Tag
                    </div>
                    {/* <div className="px-2 py-3 flex justify-center items-center">
                      <label htmlFor="dueDate">
                        <img
                          src={importConfig.project.calenderSvg}
                          alt="sprintPoint"
                        />
                      </label>
                      <input
                        type="date"
                        name="sprint"
                        id="dueDate"
                        className="w-12 bg-[#1C1C1C0D] rounded-lg p-2"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
