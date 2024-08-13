import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Components/Common/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const ProjectDetails = () => {
  const [projectData, setProjectData] = useState({});
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getProject() {
    try {
      let res = await axios.get(`http://localhost:3001/projects/${id}`);
      setProjectData(res.data.project);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getProject();
  }, [id]);

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
          Project Details
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">{projectData?.title}</h3>
        <p className="text-gray-600 mb-4">{projectData?.description}</p>
        <p className="text-gray-800">
          <strong>Due Date:</strong>{" "}
          {new Date(projectData?.dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-800">
          <strong>Priority:</strong> {projectData?.priority}
        </p>
        <p className="text-gray-800">
          <strong>Status:</strong> {projectData?.status}
        </p>
        <p className="text-gray-800">
          <strong>Sprint Points:</strong> {projectData?.sprintPoints}
        </p>
        <p className="text-gray-800">
          <strong>Tag:</strong> {projectData?.tag}
        </p>
        <p className="text-gray-800">
          <strong>Assignee:</strong>{" "}
          {projectData?.assignee?.length > 0
            ? projectData?.assignee.join(", ")
            : "N/A"}
        </p>
        {projectData?.attachment && (
          <div className="mt-4">
            <strong>Attachment:</strong>{" "}
            <a
              href={`data:${projectData?.attachment.contentType};base64,${btoa(
                String.fromCharCode(
                  ...new Uint8Array(projectData?.attachment.data.data)
                )
              )}`}
              download="attachment"
              className="text-blue-600 underline"
            >
              Download Attachment
            </a>
          </div>
        )}
        <div>
          <span
            onClick={() => navigate(-1)}
            className="cursor-pointer text-sm text-blue-500 hover:text-blue-700"
          >
            &#8592; back
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
