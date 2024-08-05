import { QuestLogin, Toast, QuestProvider } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";
import { mainConfig } from "../../assets/Config/appConfig";

// export default function Login() {
//   const navigate = useNavigate();
//   const { appConfig, theme, bgColors, contentConfig } =
//     useContext(ThemeContext);
//   const refQuery = new URLSearchParams(window.location.search)?.get("ref");

//   const completeLogin = async (e) => {
//     const { userId, token, userCredentials } = e;

//     // store email in supabase
//     // await generalFunction.supabase_addData("users", userCredentials);

//     if (userId && token) {
//       localStorage.setItem("questUserId", userId);
//       localStorage.setItem("questUserToken", token);
//       localStorage.setItem(
//         "questUserCredentials",
//         JSON.stringify(userCredentials)
//       );

//       if (refQuery) {
//         // let request = generalFunction.createUrl(`api/entities/${mainConfig.QUEST_ENTITY_ID}/quests/${appConfig.QUEST_REFERRAL_CAMPAIGN_ID}/claim`);
//         let request = generalFunction.createUrl(
//           `api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${appConfig.QUEST_REFERRAL_CAMPAIGN_ID}/claim`
//         );
//         await fetch(request.url, {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             apikey: mainConfig.QUEST_API_KEY,
//             userId: userId,
//             token: token,
//           },
//           body: JSON.stringify({
//             userId: userId,
//             referralCode: refQuery,
//             // campaignVariationId: "cv-8d3c0e83-4bec-4354-bd9b-8faf11fbf238"
//           }),
//         });
//       }

//       let claimedStatus = false;
//       // let request = generalFunction.createUrl(`api/entities/${mainConfig.QUEST_ENTITY_ID}/quests/${appConfig.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}?userId=${userId}`);

//       let request = generalFunction.createUrl(
//         `api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${appConfig.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}?userId=${userId}`
//       );

//       await fetch(request.url, {
//         method: "GET",
//         headers: {
//           "content-type": "application/json",
//           apikey: mainConfig.QUEST_API_KEY,
//           userId: userId,
//           token: token,
//         },
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           // claimedStatus = res.claimStatus;
//           claimedStatus = res?.data?.isClaimed;
//         });

//       if (!claimedStatus) {
//         navigate("/onboarding");
//       } else {
//         navigate("/getstarted");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-full">
//       <QuestLogin
//         googleClientId={mainConfig?.GOOGLE_CLIENT_ID}
//         textColor=""
//         btnTextColor=""
//         backgroundColor="white"
//         btnColor=""
//         redirectUri={mainConfig?.GOOGLE_REDIRECT_URI}
//         // redirectURL= "http://localhost:5173/login"
//         google={true}
//         email={true}
//         onSubmit={(e) => completeLogin(e)}
//         onError={(e) => Toast.error({ text: e.error })}
//         googleButtonText="Continue with Google"
//         descriptionText={`Welcome to ${appConfig?.QUEST_ENTITY_NAME}`}
//         styleConfig={{
//           Form: {
//             boxShadow: "0px 0px 0px 0px",
//             borderRadius: "0px",
//           },
//           Heading: {
//             color: bgColors[`${theme}-color-premitive-grey-7`],
//             textAlign: "center",
//             fontFamily: "Figtree",
//             fontSize: "24px",
//             fontStyle: "normal",
//             fontWeight: "600",
//             lineHeight: "32px",
//             letterSpacing: "-0.48px",
//           },
//           Description: {
//             color: "var(--Neutral-Grey-200, #AFAFAF)",
//             textAlign: "center",
//             fontFamily: "Figtree",
//             fontSize: "14px",
//             fontStyle: "normal",
//             fontWeight: "400",
//             lineHeight: "20px",
//           },
//           Label: {
//             color: bgColors[`${theme}-color-premitive-grey-8`],
//             fontFamily: "Figtree",
//             fontSize: "14px",
//             fontStyle: "normal",
//             fontWeight: "400",
//             lineHeight: "16px",
//           },
//           Input: {
//             color: bgColors[`${theme}-color-premitive-grey-7`],
//             fontFamily: "Figtree",
//             fontSize: "14px",
//             fontStyle: "normal",
//             fontWeight: "400",
//             lineHeight: "20px",
//             border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
//             height: "40px",
//           },
//           OtpInput: {
//             color: bgColors[`${theme}-color-premitive-grey-7`],
//             textAlign: "center",
//             fontFamily: "Figtree",
//             fontSize: "14px",
//             fontStyle: "normal",
//             fontWeight: "400",
//             lineHeight: "20px",
//             border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
//           },
//           IconStyle: {
//             Background: bgColors[`${theme}-primary-bg-color-0`],
//             BorderColor: bgColors[`${theme}-primary-bg-color-0`],
//           },
//           PrimaryButton: {
//             border: "none",
//             background:
//               "linear-gradient(89deg, #6820ED 12.11%, #B20FD0 40.47%, #EF5B77 100%)",
//           },
//           SecondaryButton: {
//             background: "transparent",
//             border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
//             color: bgColors[`${theme}-color-premitive-grey-8`],
//           },
//         }}
//         showFooter={false}
//       />
//     </div>
//   );
// }

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { userId, userCredentials, token } = e;

    if (userId && token) {
      const existingUserId = localStorage.getItem("userId");
      if (existingUserId && existingUserId !== userId) {
        localStorage.removeItem("UserAnswers");
      }
      localStorage.setItem("userId", userId);
      localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
      localStorage.setItem("token", token);
    }
    
    console.log("from login", userId);
    let claimedStatus = false;
    let url = `https://staging.questprotocol.xyz/api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${mainConfig.QUEST_ID}?userId=${userId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          apikey: mainConfig.QUEST_API_KEY,
          userId: userId,
          token: token,
        },
      });
      console.log(response);
      console.log(response.data.isClaimed);
      claimedStatus = response.data?.data?.isClaimed;
      console.log(claimedStatus);
    } catch (error) {
      console.error("Error fetching claimed status:", error);
    }

    if (!claimedStatus) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col flex-1 h-full justify-center items-center">
        <QuestProvider
          apiKey={mainConfig.QUEST_API_KEY}
          entityId={mainConfig.QUEST_ENTITY_ID}
          themeConfig={{
            backgroundColor: "white",
            borderColor: "",
            buttonColor: "linear-gradient(89deg, #6820ED 12.11%, #B20FD0 40.47%, #EF5B77 100%)",
            primaryColor: "",
            secondaryColor: "",
            fontFamily: "",
          }}
          apiType="STAGING"
        >
          <QuestLogin
            // googleClientId="103575086200-2gijbo8rldrv5sg60u0u1rl4cmldhm8a.apps.googleusercontent.com "
            google={true}
            email={true}
            redirectUri="http://localhost:3000"
            redirectURL="http://localhost:3000/onboarding"
            styleConfig={{
              Heading: {
                fontSize: "24px",
                color: "#252525",
                lineHeight: "32px",
              },
              Description: {},
              Input: {},
              Label: {},
              TextArea: {},
              PrimaryButton: {},
              SecondaryButton: {},
              Form: { boxShadow: "none" },
              Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
              IconStyle: { BorderColor: "", Background: "", color: "" },
            }}
            showFooter={false}
            descriptionText="Welcome to Quest"
            onSubmit={handleSubmit}
            onError={(e) => Toast.error({ text: e.error })}
          />
        </QuestProvider>
      </div>
    </div>
  );
};

export default Login;
