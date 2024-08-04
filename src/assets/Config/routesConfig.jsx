import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import LoginWrapper from "../../Components/Common/LoginWrapper";
import { ProviderConfig } from "../../Components/Common/ProviderConfig";
import {
  GetStartedSvg,
  DashboardSvg,
  SprintsSvg,
  ProjectSvg,
  SettingsSvg,
} from "../../Components/Common/SideBarSvg";
import GetStartedComponent from "../../Components/GetStarted/GetStarted";
import Login from "../../Components/Login/Login";
import Onboarding from "../../Components/Onboarding/Onboarding";
import Settings from "../../Components/Settings/Settings";
import Dashboard from "../../Dashboard/Dashboard";
import Sprints from "../../Sprints/Sprints";
import Projects from "../../Projects/Projects";
import Home from "../../Components/Home/Home";
export const routesConfig = [
  {
    path: "/login",
    name: "Login",
    logo: "",
    component: (
      <ProviderConfig showTag={true}>
        <LoginWrapper>
          <Login />
        </LoginWrapper>
      </ProviderConfig>
    ),
    hidden: true,
    isUpper: false,
  },
  {
    path: "*",
    name: "Login",
    logo: "",
    component: (
      <ProviderConfig showTag={true}>
        <LoginWrapper>
          <Login />
        </LoginWrapper>
      </ProviderConfig>
    ),
    hidden: true,
    isUpper: false,
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    logo: "",
    component: (
      <ProviderConfig showTag={false}>
        <LoginWrapper>
          <Onboarding />
        </LoginWrapper>
      </ProviderConfig>
    ),
    hidden: true,
    isUpper: false,
  },
  {
    path: "/home",
    name: "home",
    logo: "",
    component: <Home />,
    hidden: true,
    isUpper: false,
  },
  {
    path: "/getstarted",
    name: "Get Started",
    logo: GetStartedSvg(),
    component: (
      <ProviderConfig showTag={false}>
        <DashboardWrapper selectdRoute={"getstarted"}>
          <GetStartedComponent />
        </DashboardWrapper>
      </ProviderConfig>
    ),
    hidden: false,
    isUpper: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    logo: DashboardSvg(),
    component: (
      <ProviderConfig showTag={false}>
        <DashboardWrapper selectdRoute={"dashboard"}>
          <Dashboard />
        </DashboardWrapper>
      </ProviderConfig>
    ),
    hidden: false,
    isUpper: true,
  },
  {
    path: "/sprints",
    name: "Sprints",
    logo: SprintsSvg(),
    component: (
      <ProviderConfig showTag={false}>
        <DashboardWrapper selectdRoute={"insights"}>
          <Sprints />
        </DashboardWrapper>
      </ProviderConfig>
    ),
    hidden: false,
    isUpper: true,
  },
  {
    path: "/projects",
    name: "Projects",
    logo: ProjectSvg(),
    component: (
      <ProviderConfig showTag={false}>
        <DashboardWrapper selectdRoute={"insights"}>
          <Projects />
        </DashboardWrapper>
      </ProviderConfig>
    ),
    hidden: false,
    isUpper: true,
  },
  {
    path: "/settings",
    name: "Settings",
    logo: SettingsSvg(),
    component: (
      <ProviderConfig showTag={false}>
        <DashboardWrapper selectdRoute={"Settings"}>
          <Settings />
        </DashboardWrapper>
      </ProviderConfig>
    ),
    hidden: false,
    isUpper: true,
  },
];
