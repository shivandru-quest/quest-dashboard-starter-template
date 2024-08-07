import { useContext, useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { FeedbackWorkflow, Search, Survey } from "@questlabs/react-sdk";
import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/generalFunction";
import { bookACall, logOutBtn, userIcon, ArrowRight } from "./SideBarSvg";
import ReferralPopup from "../Referral/ReferralPopup";
import { ThemeContext } from "./AppContext";
import { mainConfig } from "../../assets/Config/appConfig";
import SearchComponents from "./SearchComponents";
import SurveyComponents from "./SurveyComponents";
import Cookies from "universal-cookie";
import HelphubComponent from "./HelphubComponent";

export default function DashboardWrapper({ children, selectdRoute }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [quesNoFeed, setQuesNoFeed] = useState(1);
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const [isSidebarCompressed, setIsSidebarCompressed] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const { theme, setTheme, bgColors, appConfig, checked, setChecked } =
    useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLinkClickSideLogo = (path) => {
    if (activePath === path) {
      setActivePath("");
    } else {
      setActivePath(path);
    }
  };
  function getUser() {
    const userAnswers = localStorage.getItem("UserAnswers");
    if (userAnswers) {
      const paprsedData = JSON.parse(userAnswers);
      setUser(paprsedData);
    } else {
      navigate("/login");
    }
  }
  const userName = user
    ? user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)
    : "";
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleToggle = () => {
    document.getElementsByTagName("BODY")[0].classList.toggle("dark");
    setChecked((prev) => !prev);
    toggleTheme();
  };

  const handleChange = (e) => {
    e.stopPropagation();
    toggleTheme();
  };

  const diffWithDate = (date, type) => {
    const inputDate = new Date().getTime();
    const targetDate = new Date(date).getTime();
    const differenceInMilliseconds = Math.abs(inputDate - targetDate);
    const differenceInDays = Math.ceil(
      differenceInMilliseconds /
        (type == "days" ? 1000 * 3600 * 24 : 1000 * 3600)
    );
    return differenceInDays;
  };
  const toggleSidebar = () => {
    setIsSidebarCompressed(!isSidebarCompressed);
  };
  useEffect(() => {
    let websiteVisit = localStorage.getItem("websiteVisit");
    let feedbackOpen = localStorage.getItem("feedbackOpen");
    const websiteVisitDiffDate = diffWithDate(websiteVisit, "days");
    const feedbackOpenDiffDate = diffWithDate(feedbackOpen, "hours");

    if (!!websiteVisit && !!feedbackOpen && websiteVisitDiffDate > 2) {
      if (feedbackOpenDiffDate > 2) {
        localStorage.setItem("feedbackOpen", new Date());
        setShowFeedbackSection(true);
      }
    } else {
      localStorage.setItem("websiteVisit", new Date());
    }
  }, []);
  useEffect(() => {
    getUser();
  }, []);
  const closeSurveyPopup = (e) => {
    if (document.getElementById("clickbox_sreferral").contains(e.target)) {
    } else {
      setShowFeedbackSection(false);
    }
  };
  return (
    <div
      className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]"
      style={{
        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
        position: "relative",
      }}
    >
      <button
        onClick={toggleSidebar}
        className={`toggle-sidebar-button ${
          isSidebarCompressed ? "compressed" : ""
        } border`}
      >
        <img
          src={ArrowRight("#181818")}
          alt="arrowRight"
          className={`arrow-icon ${isSidebarCompressed ? "" : "rotate"}`}
        />
      </button>
      {/* <FeedbackButton /> */}
      <HelphubComponent />

      {openPopup && <ReferralPopup setOpenPopup={() => setOpenPopup(false)} />}
      <SearchComponents />

      {showFeedbackSection && (
        <SurveyComponents closeSurveyPopup={closeSurveyPopup} />
      )}

      <nav
        className={`s_nav_container ${
          isSidebarCompressed ? "s_nav_container_compressed" : ""
        }`}
        style={{
          backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
        }}
      >
        <div
          className={`s_nav_header_cont ${
            isSidebarCompressed ? "items-center" : "items-start"
          }`}
        >
          <div className="s_nav_company_logo_cont">
            <div className="border border-[#757575] rounded-full flex justify-center items-center h-[2.25rem] w-[2.25rem] p-2">
              <img
                src={userIcon("#757575")}
                alt="User Icon"
                className="object-fit: cover min-w-full h-full rounded-full"
              />
            </div>
            <div className="s_nav_company_name">
              <p
                className={`nav_menu_link_username`}
                style={{
                  color: theme === "light" ? "#2F54EB" : "#757575",
                }}
              >
                {userName}
              </p>
              <span
                className="font-[600] text-[0.625rem] leading-[0.75rem] tracking-[-0.00625rem]"
                style={{
                  color: theme === "light" ? "#030723" : "#757575",
                }}
              >
                Developer
              </span>
            </div>
          </div>
        </div>
        <div className="s_navigation_cont">
          <div className="s_nav_menu_cont-upper">
            <ul className="s_nav_menu">
              {routesConfig.map(
                (routes, index) =>
                  !routes.hidden &&
                  routes.isUpper && (
                    <li
                      className={`s_nav_menu_item ${
                        window.location.href.includes(routes.path) &&
                        "s_nav_active"
                      }`}
                      key={index}
                      onClick={() => handleLinkClickSideLogo(routes.path)}
                    >
                      <Link to={routes.path} className="s_nav_menu_link">
                        <div className="w-full flex flex-col">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center justify-center gap-2">
                              <div>{routes.logo}</div>
                              <p>{routes.name}</p>
                            </div>
                            <div>
                              {!isSidebarCompressed && routes.sideLogo && (
                                <img
                                  src={routes.sideLogo}
                                  className={`side-logo ${
                                    activePath === routes.path ? "rotate" : ""
                                  }`}
                                  alt="side logo"
                                />
                              )}
                            </div>
                          </div>
                          {!isSidebarCompressed &&
                            activePath === routes.path &&
                            routes.sideLogo && (
                              <div className="h-10 w-full flex justify-center items-center">
                                content
                              </div>
                            )}
                        </div>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className={`s_nav_menu_cont-lower`}>
            <ul className="s_nav_menu">
              <li className={"profileContSecondary toggle-btn"}>
                <div className={"profileContThird"} onClick={handleToggle}>
                  <label className={"PaymentSwitch2"}>
                    <input
                      id="sidebar-toggle"
                      type="checkbox"
                      checked={checked}
                      onChange={handleChange}
                    />
                    <span className={"slider2"} />
                  </label>
                  {!isSidebarCompressed && (
                    <div className={"profileTitle3"}>
                      {checked ? "Light Mode" : "Dark Mode"}
                    </div>
                  )}
                </div>
              </li>

              <li>
                <Link
                  className="s_nav_menu_link"
                  onClick={() => {
                    window.open(mainConfig.CALENDLY_LINK, "_blank");
                  }}
                >
                  <div className="flex justify-center items-center gap-2">
                    <div>{bookACall()}</div>
                    <p
                      style={{
                        color: "#535353",
                        fontFamily: "Figtree",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      }}
                    >
                      Book a call
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <div
                  className="s_nav_menu_link cursor-pointer"
                  onClick={() => {
                    generalFunction.logout();
                    navigate("/login");
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div>{logOutBtn()}</div>
                    <p id="nav_logout">Logout</p>
                  </div>
                </div>
              </li>

              {/* <li className={`flex items-center justify-between`}>
                <div className="s_nav_menu_link cursor-pointer">
                  <div className="flex items-center justify-center gap-2">
                    <div className="border border-[#757575] rounded-full flex justify-center items-center h-[2.25rem] w-[2.25rem] p-2">
                      <img
                        src={userIcon("#757575")}
                        alt="User Icon"
                        className="object-fit: cover min-w-full h-full rounded-full"
                      />
                    </div>
                    <p
                      className={`nav_menu_link_username`}
                      style={{
                        color: theme === "light" ? "#535353" : "#757575",
                      }}
                    >
                      {user?.firstname}
                    </p>
                  </div>
                </div>
                {!isSidebarCompressed && (
                  <div
                    style={{
                      paddingRight: "1rem",
                    }}
                  >
                    {theme === "light" ? (
                      <img src={ArrowRight("#181818")} alt="arrowRight" />
                    ) : (
                      <img src={ArrowRight("#757575")} alt="arrowRight" />
                    )}
                  </div>
                )}
              </li> */}
            </ul>
            <div
              className="text-xs text-[#939393] mt-3 w-full flex items-center justify-center cursor-pointer"
              onClick={() => window.open("https://questlabs.ai/")}
            >
              <p>Powered by Quest Labs</p>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="w-[calc(100vw-185px)]"
        style={{
          backgroundColor: theme === "dark" ? "black" : "white",
        }}
      >
        <div className="">{children}</div>
      </div>
    </div>
  );
}
