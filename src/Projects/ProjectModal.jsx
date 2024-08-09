import React, { useState, useRef, useEffect } from "react";
import { importConfig } from "../assets/Config/importConfig";
import CustomDropdown from "./CustomDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FlagSvg, UrgentSvg } from "../Components/Common/SideBarSvg";
import SearchableMultiSelect from "./SearchableMultiSelect";
import axios from "axios";
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
const priorityOptions = [
  {
    value: "urgent",
    label: "Urgent",
    fill: "#ED0A34",
    className:
      "text-center text-[#535353] font-[400] leading-[1rem] text-[0.75rem]",
    svgIcon: FlagSvg("#ED0A34"),
  },
  {
    value: "high",
    label: "High",
    fill: "#FF9E00",
    className:
      "text-center text-[#535353] font-[400] leading-[1rem] text-[0.75rem]",
    svgIcon: FlagSvg("#FF9E00"),
  },

  {
    value: "normal",
    label: "Normal",
    fill: "#3542FF",
    className:
      "text-center text-[#535353] font-[400] leading-[1rem] text-[0.75rem]",
    svgIcon: FlagSvg("#3542FF"),
  },
  {
    value: "low",
    label: "Low",
    fill: "#979797",
    className:
      "text-center text-[#535353] font-[400] leading-[1rem] text-[0.75rem]",
    svgIcon: FlagSvg("#979797"),
  },
];
const tagOptions = [
  {
    value: "research",
    label: "Research",
    fill: "#8090FF",
    className:
      "text-[#8090FF] text-center font-[700] text-[0.625rem] leading-[0.75rem] tracking-[-0.00625rem] bg-[#E1E1FB]",
    svgIcon: UrgentSvg("#8090FF"),
  },
  {
    value: "design",
    label: "Design",
    fill: "#00C16A",
    className:
      "text-[#00C16A] text-center font-[700] text-[0.625rem] leading-[0.75rem] tracking-[-0.00625rem] bg-[#C2F0D9]",
    svgIcon: UrgentSvg("#00C16A"),
  },
  {
    value: "review",
    label: "Review",
    fill: "#42B2B3",
    className:
      "text-[#42B2B3] text-center font-[700] text-[0.625rem] leading-[0.75rem] tracking-[-0.00625rem] bg-[#D9EFF0]",
    svgIcon: UrgentSvg("#42B2B3"),
  },
  {
    value: "code",
    label: "Code",
    fill: "#FF9E00",
    className:
      "text-[#FF9E00] text-center font-[700] text-[0.625rem] leading-[0.75rem] tracking-[-0.00625rem] bg-[#FFEBCC]",
    svgIcon: UrgentSvg("#FF9E00"),
  },
  {
    value: "testing",
    label: "Testing",
    fill: "#F57189",
    className:
      "text-[#F57189] text-center font-[700] text-[0.625rem] leading-[0.75rem] tracking-[-0.00625rem] bg-[#FED8DF]",
    svgIcon: UrgentSvg("#F57189"),
  },
];
// const teamMembers = [
//   {
//     value: "1",
//     label: "Bruce Banner",
//     avatar:
//       "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     value: "2",
//     label: "Black Widow",
//     avatar:
//       "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     value: "3",
//     label: "Steve Roggers",
//     avatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
//   },
//   {
//     value: "4",
//     label: "Tony Stark",
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// ];
const ProjectModal = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    status: projectStatusoptions[0].value,
    sprintPoints: "",
    dueDate: new Date(),
    assignee: [],
    priority: priorityOptions[0].value,
    tag: tagOptions[0].value,
    description: "",
    attachment: null,
  });
  const [users, setUser] = useState([]);
  const inpRef = useRef(null);

  async function getAssignees() {
    try {
      let res = await axios.get(`http://localhost:3001/user/`);
      setUser(res.data.users);
    } catch (error) {
      console.error("Error", error.message);
    }
  }
  useEffect(() => {
    getAssignees();
  }, []);
  console.log(users);
  const teamMembers = users?.map((user) => ({
    value: user._id,
    label: user.firstname,
    avatar:
      user.avatar ||
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  }));
  const handleAssigneeChange = (selectedAssignees) => {
    setFormData((prevState) => ({ ...prevState, assignee: selectedAssignees }));
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleDropdownChange = (key) => (option) => {
    setFormData((prevState) => ({ ...prevState, [key]: option }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setFormData((prevState) => ({ ...prevState, dueDate: date }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      attachment: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const assigneeObjectIds = formData.assignee.map(
      (assignee) => assignee.value
    );
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append(
      "status",
      typeof formData.status === "string" ? formData.status : ""
    );
    formDataObj.append("sprintPoints", formData.sprintPoints);
    formDataObj.append("dueDate", formData.dueDate.toISOString());
    formDataObj.append(
      "priority",
      typeof formData.priority === "string" ? formData.priority : ""
    );
    formDataObj.append(
      "tag",
      typeof formData.tag === "string" ? formData.tag : ""
    );
    formDataObj.append("description", formData.description);
    formDataObj.append("assignee", JSON.stringify(assigneeObjectIds));
    if (formData.attachment) {
      formDataObj.append("attachment", formData.attachment);
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/projects/create",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[1000]"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-10 max-w-[57.6rem] h-auto shadow-lg rounded-[1.25rem] bg-white">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="flex justify-end items-center">
            <button
              className="text-base font-medium rounded-md w-[1.25rem] h-[1.25rem]"
              onClick={onClose}
            >
              <img src={importConfig.project.cancelLogo} alt="cancelLogo" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full h-auto flex flex-col gap-3">
              <div className="w-full h-auto">
                <label
                  htmlFor="title"
                  className="text-sm text-[#979797] font-[500]"
                >
                  Project Title
                </label>
                <br />
                <input
                  type="text"
                  className="w-full rounded-lg text-[#535353] h-11 border p-3 placeholder:text-[#d1d5db]"
                  id="title"
                  placeholder="Enter your project title"
                  value={formData.title}
                  name="title"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex">
                <div className="h-[8.25rem] w-[33rem] flex justify-between">
                  <div className="flex flex-col">
                    <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                      <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                        Status
                      </div>
                      <div className="px-2 py-3">
                        <CustomDropdown
                          options={projectStatusoptions}
                          onChange={handleDropdownChange("status")}
                        />
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
                          type="text"
                          name="sprintPoints"
                          id="sprintPoints"
                          className="w-20 bg-[#1C1C1C0D] text-[#535353] rounded-lg p-2"
                          value={formData.sprintPoints}
                          onChange={handleInputChange}
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
                          onChange={handleDateChange}
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

                        <div class="flex -space-x-1 overflow-hidden">
                          {formData.assignee.map((option) => (
                            <img
                              key={option.value}
                              src={option.avatar}
                              alt={option.label}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                        <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                          Priority
                        </div>
                        <div>
                          <CustomDropdown
                            options={priorityOptions}
                            onChange={handleDropdownChange("priority")}
                          />
                        </div>
                      </div>
                      <div className="w-[15rem] h-[2.75rem] flex items-center justify-between gap-4">
                        <div className="px-2 py-3 text-[#979797] font-[500] leading-5 text-[0.875rem]">
                          Tag
                        </div>
                        <div>
                          <CustomDropdown
                            options={tagOptions}
                            onChange={handleDropdownChange("tag")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center items-start">
                  <SearchableMultiSelect
                    options={teamMembers}
                    onChange={handleAssigneeChange}
                    value={formData.assignee}
                  />
                </div>
              </div>

              <div className="w-full h-auto">
                <label
                  htmlFor="description"
                  className="text-sm text-[#979797] font-[500]"
                >
                  Description
                </label>
                <br />
                <input
                  type="text"
                  className="border w-full rounded-lg p-[0.75rem] text-sm h-[9rem] placeholder:absolute placeholder:top-2 placeholder:text-[#d1d5db] text-[#535353]"
                  id="description"
                  placeholder="Write your Project Description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[0.875rem] font-[600] text-[#1D2433] leading-5">
                  Attachments
                </label>
                <div className="border border-gray-400 w-full rounded-md p-3 text-sm flex justify-between items-center hover:cursor-pointer h-11">
                  <label
                    htmlFor="attachment"
                    className="text-sm text-slate-400 flex items-center gap-2"
                  >
                    <img
                      src={importConfig.home.plusIcon}
                      alt="uploadIcon"
                      className="w-[1rem] h-[1rem]"
                    />
                    Add Attachment
                  </label>
                  <input
                    ref={inpRef}
                    type="file"
                    id="attachment"
                    placeholder=""
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-[8px] p-3 text-sm font-[500] bg-[#E2E2E2] h-10 text-[#ffffff] hover:cursor-pointer"
                  style={{
                    background:
                      "radial-gradient(288.85% 77.24% at 100% 78.12%, #7175F2 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(666.24% 220.15% at 105.03% -112.5%, #0065FF 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(367.24% 88.88% at 4.78% -13.04%, #9035FF 0%, #9035FF 100%), #FFF",
                  }}
                >
                  Save Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
