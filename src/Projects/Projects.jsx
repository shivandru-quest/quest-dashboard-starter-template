import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Components/Common/AppContext";
import { importConfig } from "../assets/Config/importConfig";
import ProjectModal from "./ProjectModal";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import Pagination from "../Components/Common/CommonComponents/Pagination";
import FiltersPanel from "./FiltersPanel";
const Projects = () => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUser] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState({
    total: 0,
    currentPage: Number(searchParams.get("page")) || 1,
    itemsPerPage: Number(searchParams.get("limit")) || 3,
    totalPages: 0,
  });
  const [sortOptions, setSortOptions] = useState({
    sortBy: searchParams.get("sortBy") || "priority",
    sortOrder: searchParams.get("sortOrder") || "asc",
  });
  const [filters, setFilters] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  async function getAssignees() {
    try {
      let res = await axios.get(`http://localhost:3001/user/`);
      setUser(res.data.users);
    } catch (error) {
      console.error("Error", error.message);
    }
  }
  async function getProjects() {
    try {
      const userAnswers = localStorage.getItem("UserAnswers");
      let role;
      let userid;
      if (userAnswers) {
        const parsedData = JSON.parse(userAnswers);
        const matchedUser = users?.find((el) => el.email === parsedData.email);
        if (matchedUser) {
          role = matchedUser.role;
          userid = matchedUser._id;
        }
      }
      const filterQuery =
        filters?.length && `filters=${encodeURIComponent(filters[0])}`;
      console.log("Filter Query:", filterQuery);
      let url = `http://localhost:3001/projects/?role=${role}&userid=${userid}&page=${page.currentPage}&limit=${page.itemsPerPage}&sortBy=${sortOptions.sortBy}&sortOrder=${sortOptions.sortOrder}`;
      if (filterQuery) {
        url += `&${filterQuery}`;
      }
      let res = await axios.get(url);
      setProjectData(res.data.projects);
      setPage((prev) => ({
        ...prev,
        total: res.data.pagination?.total,
        totalPages: res.data.pagination?.totalPages,
      }));
    } catch (error) {
      console.error("Error", error.message);
    }
  }
  useEffect(() => {
    getAssignees();
  }, []);
  useEffect(() => {
    getProjects();
  }, [
    page.currentPage,
    page.itemsPerPage,
    sortOptions.sortBy,
    sortOptions.sortOrder,
    searchParams,
    filters,
    users,
  ]);
  useEffect(() => {
    setSearchParams({
      page: page.currentPage,
      limit: page.itemsPerPage,
      sortBy: sortOptions.sortBy,
      sortOrder: sortOptions.sortOrder,
      filters: filters.join(","),
    });
  }, [
    page.currentPage,
    page.itemsPerPage,
    sortOptions.sortBy,
    sortOptions.sortOrder,
    filters,
    setSearchParams,
  ]);
  const handleProjectCreation = () => {
    getProjects();
    closeModal();
  };
  const handlePageChange = (newPage) => {
    setPage((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortOptions((prev) => ({ ...prev, sortBy: newSortBy }));
  };
  const handleFiltersChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };
  const handleSortOrderChange = (newSortOrder) => {
    setSortOptions((prev) => ({ ...prev, sortOrder: newSortOrder }));
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openFilters = () => setFilterVisible(true);
  const closeFilters = () => setFilterVisible(false);
  return (
    <div className="dashboard-page transition-all ease-in delay-[40]">
      <div
        className="dashboard-page-header"
        style={{
          borderBottom: `1.5px solid ${
            bgColors[`${theme}-primary-border-color`]
          }`,
        }}
      >
        <p
          style={{
            color: bgColors[`${theme}-color-premitive-grey-5`],
          }}
        >
          Projects
        </p>
        <div className="flex gap-2 items-center">
          <div>
            <select
              onChange={handleSortChange}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="tag">Tag</option>
            </select>
          </div>
          <div className="flex flex-col">
            <button className="text-[0.75rem] w-[1rem] h-[1rem]">
              &#9650;
            </button>
            <button className="text-[0.75rem] w-[1rem] h-[1rem]">
              &#9660;
            </button>
          </div>
        </div>
        <div className="relative">
          <button
            className="px-4 py-2 rounded-lg border"
            onMouseEnter={openFilters}
          >
            Filter
          </button>
          <div className="absolute top-[110%]  z-50 bg-[#ffffff] shadow-lg">
            {filterVisible && (
              <FiltersPanel
                onFiltersChange={handleFiltersChange}
                closeFilters={closeFilters}
              />
            )}
          </div>
        </div>
        {projectData.length && (
          <button
            className="w-[fit-content] h-[2.25rem] px-3 py-2 text-sm font-[600]  rounded-[0.375rem] text-[#FFF]"
            style={{
              background:
                "radial-gradient(288.85% 77.24% at 100% 78.12%, #7175F2 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(666.24% 220.15% at 105.03% -112.5%, #0065FF 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(367.24% 88.88% at 4.78% -13.04%, #9035FF 0%, #9035FF 100%), #FFF",
            }}
            onClick={openModal}
          >
            create projects
          </button>
        )}
      </div>

      {!projectData.length ? (
        <div className="w-full h-[calc(100vh-68px)] flex flex-col gap-8 justify-center items-center">
          <div className="h-[9.38rem] w-[11.1rem]">
            <img
              src={importConfig.project.projectPageLogo}
              alt="projectPageLogo"
              className="w-full h-full"
            />
          </div>
          <div className="h-auto w-[22.6rem] gap-3 flex flex-col justify-center items-center">
            <div className="h-[4rem] w-full flex flex-col justify-center items-center">
              <p className="text-[#2C2C2C] text-[1.5rem] font-[600] leading-8 tracking-[-0.03rem] text-center">
                Nothing here yet.
              </p>
              <p className="text-[#2C2C2C] text-[1.5rem] font-[600] leading-8 tracking-[-0.03rem] text-center">
                Let’s create something amazing!
              </p>
            </div>
            <div className="h-[1.5rem]">
              <p className="text-[1rem] font-[500] text-[#808080] leading-6 text-center">
                Start with adding new Project and keep a track
              </p>
            </div>
          </div>
          <div>
            <button
              className="w-[7.4rem] h-[2.25rem] px-3 py-2 text-sm font-[600]  rounded-[0.375rem] text-[#FFF]"
              style={{
                background:
                  "radial-gradient(288.85% 77.24% at 100% 78.12%, #7175F2 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(666.24% 220.15% at 105.03% -112.5%, #0065FF 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(367.24% 88.88% at 4.78% -13.04%, #9035FF 0%, #9035FF 100%), #FFF",
              }}
              onClick={openModal}
            >
              Create Project
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {projectData.map((el, i) => (
              <div key={i} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{el.title}</h3>
                <p className="text-gray-600 mb-4">{el.description}</p>
                <p className="text-gray-800">
                  <strong>Due Date:</strong>{" "}
                  {new Date(el.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-800">
                  <strong>Priority:</strong> {el.priority}
                </p>
                <p className="text-gray-800">
                  <strong>Status:</strong> {el.status}
                </p>
                <p className="text-gray-800">
                  <strong>Sprint Points:</strong> {el.sprintPoints}
                </p>
                <p className="text-gray-800">
                  <strong>Tag:</strong> {el.tag}
                </p>
                <p className="text-gray-800">
                  <strong>Assignee:</strong>{" "}
                  {el.assignee?.length > 0 ? el.assignee.join(", ") : "N/A"}
                </p>
                {el.attachment && (
                  <div className="mt-4">
                    <strong>Attachment:</strong>{" "}
                    <a
                      href={`data:${el.attachment.contentType};base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(el.attachment.data.data)
                        )
                      )}`}
                      download="attachment"
                      className="text-blue-600 underline"
                    >
                      Download Attachment
                    </a>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <Link
                    to={`/project/${el._id}`}
                    className="text-blue-600 text-sm"
                  >
                    View Details
                  </Link>
                  <button className="text-red-600 text-sm">Edit</button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={page.currentPage}
            totalPages={page.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        users={users}
        onProjectCreate={handleProjectCreation}
      />
    </div>
  );
};

export default Projects;
