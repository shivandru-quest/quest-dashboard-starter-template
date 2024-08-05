// import { OnBoarding, Toast } from "@questlabs/react-sdk";
// import LoginWrapper from "../Common/LoginWrapper";
// import { useContext, useEffect, useState } from "react";
// import { generalFunction } from "../../assets/Config/generalFunction";
// import { useNavigate } from "react-router-dom";
// import { ThemeContext } from "../Common/AppContext";
// import { mainConfig } from "../../assets/Config/appConfig";

// export default function Onboarding() {
//   // const [answer, setAnswer] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { appConfig } = useContext(ThemeContext);
//   const { theme, bgColors, contentConfig } = useContext(ThemeContext);
//   const [key, setKey] = useState("");

//   const completeAnswer = async (e) => {
//     await generalFunction.supabase_updateData(
//       "users",
//       generalFunction.getUserCredentials()?.email,
//       {
//         // for storing the data in supabase add the following key and value
//         // eg. name: answer["ec-cf14a2e1-9ea5-448f-aaa4-d6f866a853e9"]
//       }
//     );

//     navigate("/dashboard");
//   };

//   useEffect(() => {}, [appConfig.QUEST_API_KEY]);

//   return (
//     <div className="w-full flex h-full items-center justify-center m-auto">
//       <div
//         className={`${!loading && "rounded-xl"} w-2/3`}
//         style={{ boxShadow: loading ? "" : "" }}
//       >
//         {appConfig.QUEST_API_KEY != "" && (
//           // <OnBoarding
//           //   questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
//           //   userId={generalFunction.getUserId()}
//           //   token={generalFunction.getUserToken()}
//           //   controlBtnType="Buttons"
//           //   headingScreen={[
//           //     {
//           //       name: "Welcome Aboard!",
//           //       desc: "Join our voyage towards innovation and excellence! ⚡",
//           //     },
//           //   ]}
//           //   singleChoose="modal3"
//           //   multiChoice="modal2"
//           //   answer={answer}
//           //   setAnswer={setAnswer}
//           //   inputBgColor=""
//           //   loadingTracker={true}
//           //   setLoading={setLoading}
//           //   getAnswers={completeAnswer}
//           //   onError={(e) => Toast.error({ text: e.error })}
//           //   styleConfig={{
//           //     Form: {
//           //       borderRadius: "10px",
//           //       overflow: "hidden",
//           //       backgroundColor:
//           //         theme === "dark"
//           //           ? bgColors[`${theme}-primary-bg-color-2`]
//           //           : "",
//           //     },
//           //     Topbar: {
//           //       padding: "20px 0",
//           //       gap: "4px",
//           //       border: "none",
//           //     },
//           //     Heading: {
//           //       color: bgColors[`${theme}-color-premitive-grey-5`],
//           //       textAlign: "center",
//           //       fontFamily: "Figtree",
//           //       fontSize: "20px",
//           //       fontStyle: "normal",
//           //       fontWeight: "600",
//           //       lineHeight: "30px",
//           //       letterSpacing: "-0.4px",
//           //     },
//           //     Description: {
//           //       color: "#939393",
//           //       textAlign: "center",
//           //       fontFamily: "Figtree",
//           //       fontSize: "14px",
//           //       fontStyle: "normal",
//           //       fontWeight: "400",
//           //       lineHeight: "16px",
//           //       margin: "auto",
//           //     },
//           //     Label: {
//           //       color: bgColors[`${theme}-color-premitive-grey-6`],
//           //       fontFamily: "Figtree",
//           //       fontSize: "14px",
//           //       fontStyle: "normal",
//           //       fontWeight: "500",
//           //       lineHeight: "16px",
//           //     },
//           //     Input: {
//           //       borderRadius: "10px",
//           //       border: `1px solid ${
//           //         bgColors[`${theme}-primary-border-color`]
//           //       }`,
//           //     },
//           //     MultiChoice: {
//           //       selectedStyle: {
//           //         background: bgColors[`${theme}-primary-bg-color-0`],
//           //         color: "#E0E0E0",
//           //         border: `1px solid ${
//           //           bgColors[`${theme}-primary-border-color`]
//           //         }`,
//           //       },
//           //       style: {
//           //         border: `1px solid ${
//           //           bgColors[`${theme}-primary-border-color`]
//           //         }`,
//           //       },
//           //     },
//           //     SingleChoice: {
//           //       selectedStyle: {
//           //         border: `1px solid ${
//           //           bgColors[`${theme}-primary-border-color`]
//           //         }`,
//           //       },
//           //       style: {
//           //         border: `1px solid ${
//           //           bgColors[`${theme}-primary-border-color`]
//           //         }`,
//           //       },
//           //     },
//           //     PrimaryButton: {
//           //       border: "none",
//           //     },
//           //     TextArea: {
//           //       border: `1px solid ${
//           //         bgColors[`${theme}-primary-border-color`]
//           //       }`,
//           //     },
//           //   }}
//           //   showFooter={false}
//           // />
//           <QuestProvider
//             apiKey={mainConfig.QUEST_API_KEY}
//             entityId="e-a313b535-2479-43d5-8336-9a79d4138f37"
//             themeConfig={{
//               backgroundColor: "",
//               borderColor: "",
//               buttonColor: "",
//               primaryColor: "",
//               secondaryColor: "",
//               fontFamily: "",
//             }}
//           >
//             <Onboarding
//               questId="c-fe5067b5-8752-4706-b08c-e95f5bf353cc"
//               userId="u-e494f554-ef7d-4b0b-804a-44a98a5c059e"
//               token="<your jwt user token>"
//               controlBtnType="Buttons"
//               headingScreen={[
//                 {
//                   name: "Identity Insights",
//                   desc: "Revealing dimensions beyond words",
//                 },
//               ]}
//               Headers={[
//                 {
//                   heading: "Identity Insights",
//                   subHeading: "Revealing dimensions beyond words",
//                 },
//               ]}
//               singleChoose="modal1"
//               multiChoice="modal2"
//               styleConfig={{
//                 ProgressBar: {
//                   completeTabColor: "",
//                   currentTabColor: "",
//                   pendingTabColor: "",
//                 },
//               }}
//             />
//           </QuestProvider>
//         )}
//         {appConfig.QUEST_API_KEY != "" && (
//           <div
//             className="m-auto text-xs px-4 py-2 text-[#939393] rounded-md flex items-center justify-center gap-3 cursor-pointer"
//             onClick={() => window.open("https://questlabs.ai/")}
//           >
//             <p>Powered by Quest Labs</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { QuestProvider, OnBoarding } from "@questlabs/react-sdk";
import "@questlabs/react-sdk/dist/style.css";
import { useNavigate } from "react-router-dom";
import { mainConfig } from "../../assets/Config/appConfig";
import LoginSuccessModal from "../Login/LoginsuccessModal";

const Onboarding = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    navigate("/dashboard");
  };
  function checkUser() {
    const userAnswers = localStorage.getItem("UserAnswers");
    if (userAnswers) {
      navigate("/dashboard");
    }
    return null;
  }
  const handleGetAnswers = async (response) => {
    console.log(response);
    const UserAnswers = {
      fullname: response["ca-9c3c9067-a87f-45b6-b64d-735c8b118e51"] || "",
      role: response["ca-5f47d56e-ac67-4c8a-917b-e3aed790c64b"] || "",
      dob: response["ca-4f99b188-bfbf-4cb6-a10a-2f0d03fcc27c"] || "",
      email: response["ca-05cb18f2-ac34-476a-a4d2-9f44fa74ca35"] || "",
      phone: response["ca-fb953688-0e09-433c-b74f-d22439f759bb"] || "",
      firstname: response["ca-652daf3f-dbb4-4f2a-8b17-3145561aeaf0"] || "",
    };

    localStorage.setItem("UserAnswers", JSON.stringify(UserAnswers));
    setAnswers(UserAnswers);
    console.log("Stored UserAnswers:", UserAnswers);
    setTimeout(() => {
      openModal();
    }, 2000);
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="h-screen">
      <div className="flex flex-col flex-1 h-full justify-center items-center">
        <QuestProvider
          apiKey={mainConfig.QUEST_API_KEY}
          entityId={mainConfig.QUEST_ENTITY_ID}
          apiType="STAGING"
          themeConfig={{
            backgroundColor: "",
            borderColor: "",
            buttonColor: "",
            primaryColor: "",
            secondaryColor: "",
            fontFamily: "",
          }}
        >
          <OnBoarding
            questId={mainConfig.QUEST_ID}
            userId={localStorage.getItem("userId")}
            token={localStorage.getItem("token")}
            controlBtnType="Buttons"
            headingScreen={[
              {
                name: "Share your details",
                desc: "Welcome back, Please complete your details",
              },
            ]}
            singleChoose="modal3"
            multiChoice="modal2"
            styleConfig={{
              Form: { width: "48%" },
              Topbar: {},
              Heading: {
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-2%",
              },
              Description: {
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "500",
                color: "#939393",
              },
              Input: { lineHeight: "20px" },
              Label: { fontWeight: "500" },
              TextArea: {},
              PrimaryButton: {},
              SecondaryButton: {},
              SingleChoice: { style: {}, selectedStyle: {} },
              MultiChoice: { style: {}, selectedStyle: {} },
              ProgressBar: {
                completeTabColor: "",
                currentTabColor: "",
                pendingTabColor: "",
              },
              Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
            }}
            answer={answers}
            getAnswers={handleGetAnswers}
            nextBtnText="Submit Details"
            setAnswer={setAnswers}
            showFooter={false}
          />
        </QuestProvider>
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <div className="flex justify-center items-center mt-[33px] text-center">
          <p className="text-[10px] font-normal leading-[12px] tracking-[-0.1px] text-[#939393]">
            Powered by Quest Labs
          </p>
        </div>
        <LoginSuccessModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default Onboarding;
