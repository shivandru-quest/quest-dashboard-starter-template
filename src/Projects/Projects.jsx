import { useContext, useState } from "react";
import { ThemeContext } from "../Components/Common/AppContext";
import Admin from "../Components/Admin/Admin";
import { importConfig } from "../assets/Config/importConfig";
import ProjectModal from "./ProjectModal";
const Projects = () => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
      </div>
      {/* <Admin /> */}
      <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
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
      <ProjectModal isOpen={isModalOpen} onClose={closeModal}></ProjectModal>
    </div>
  );
};

export default Projects;
