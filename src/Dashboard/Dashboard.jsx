import { useContext } from "react";
import { ThemeContext } from "../Components/Common/AppContext";
import Admin from "../Components/Admin/Admin";
const Dashboard = () => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
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
          Dashboard
        </p>
      </div>
      <Admin />
    </div>
  );
};

export default Dashboard;
