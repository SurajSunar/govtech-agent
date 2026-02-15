import { BubbleChat } from "flowise-embed-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const APP_CONFIG = {
  moe: {
    appName: "MOE",
    key: import.meta.env.VITE_APP_ID_MOE,
    logo: "",
  },
  nlcs: {
    appName: "NLCS",
    key: import.meta.env.VITE_APP_ID_NLCS,
    logo: "",
  },
  moh: {
    appName: "MOH",
    key: import.meta.env.VITE_APP_ID_MOH,
    logo: "",
  },
  moit: {
    appName: "MOIT",
    key: import.meta.env.VITE_APP_ID_MOIT,
    logo: "",
  },
  moha: {
    appName: "MOHA",
    key: import.meta.env.VITE_APP_ID_MOHA,
    logo: "",
  },
  nsb: {
    appName: "NSB",
    key: import.meta.env.VITE_APP_ID_NSB,
    logo: "",
  },
  govtech: {
    appName: "GovTech",
    key: import.meta.env.VITE_APP_ID_GOVTECH,
    logo: "",
  },
  moal: {
    appName: "MOAL",
    key: import.meta.env.VITE_APP_ID_MOAL,
    logo: "",
  },
  moenr: {
    appName: "MOENR",
    key: import.meta.env.VITE_APP_ID_MOENR,
    logo: "",
  },
};

const Floatchat = () => {
  const { appName } = useParams();

  const config = APP_CONFIG[appName];

  const theme = {
    disclaimer: {
      title: "Disclaimer",
      message: `<p style="text-align:justify">Responses are generated automatically by AI based on your input, and we cannot guarantee that the information will be complete, accurate, or up-to-date.
        <br/>Accordingly, the information provided by the Chatbot should not be considered as a basis for production workloads.
        <br/>You are solely responsible for the interactions and reliance on the information provided by the Chatbot, as well as for any actions taken or not taken.
        <br/><b>AI-generated content may be for informational purpose. Please validate before making decisions.</b></p>`,
      textColor: "black",
      buttonColor: "#3b82f6",
      buttonText: "Start Chatting",
      buttonTextColor: "white",
      blurredBackgroundColor: "rgba(0, 0, 0, 0.4)", //The color of the blurred background that overlays the chat interface
      backgroundColor: "white",
      denyButtonText: "Cancel",
      denyButtonBgColor: "#ef4444",
    },
    chatWindow: {
      welcomeMessage: `Kuzuzangpo la! I am AI Assistant of the ${config?.appName}. How can I help you today?`,
      showTitle: true,
      title: `${config?.appName} Chatbot`,
      titleAvatarSrc: "https://tech.gov.bt/wp-content/uploads/2025/09/logo.png",
      botMessage: {
        showAvatar: true,
        avatarSrc:
          config?.logo ||
          "https://tech.gov.bt/wp-content/uploads/2025/09/logo.png",
      },
      footer: {
        textColor: "#303235",
        text: "Powered by",
        company: "Govtech Bhutan",
        companyLink: "https://tech.gov.bt",
      },
      renderHTML: true,
    },
  };

  useEffect(() => {
    document.cookie =
      "chatbotDisclaimer=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  }, []);

  if (!config) {
    return (
      <>
        <p className="text-2xl text-amber-800">No such Agency</p>
        <Link to={"/"} className="underline text-amber-600">
          Back to Home
        </Link>
      </>
    );
  }

  return (
    <div className="bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 w-full h-60 rounded-lg">
      <div className="h-full flex justify-center items-center">
        <h1 className="text-4xl text-amber-700">
          Welcome to the AI Chatbot for {config?.appName}
        </h1>
      </div>
      <BubbleChat
        chatflowid={config?.key}
        apiHost={import.meta.env.VITE_APP_HOST}
        theme={{ ...theme }}
      />
    </div>
  );
};

export default Floatchat;
