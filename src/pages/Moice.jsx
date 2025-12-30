import { BubbleChat } from "flowise-embed-react";
import { useEffect } from "react";

const Moice = () => {
  const theme = {
    disclaimer: {
      title: "Disclaimer",
      message: `<p style="text-align:justify">Responses are generated automatically by AI based on your input, and we cannot guarantee that the information will be complete, accurate, or up-to-date.
        <br/>Accordingly, the information provided by the Chatbot should not be considered as a basis for production workloads.
        <br/>You are solely responsible for the interactions and reliance on the information provided by the Chatbot, as well as for any actions taken or not taken.
        <br/><b>AI-generated content may be inaccurate. Please validate before making decisions.</b></p>`,
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
      welcomeMessage:
        "Kuzuzangpo la! I am AI Assistant of the Ministry of Industry, Commerce and Employment. How can I help you today?",
      showTitle: true,
      title: "MoICE Chatbot",
      titleAvatarSrc: "https://tech.gov.bt/wp-content/uploads/2025/09/logo.png",
      botMessage: {
        showAvatar: true,
        avatarSrc:
          "https://tech.gov.bt/wp-content/uploads/2025/09/bot-avatar.png",
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

  return (
    <div className="bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 w-full h-60 rounded-lg">
      <div className="h-full flex justify-center items-center">
        <h1 className="text-4xl text-amber-700">
          Welcome to the AI Chatbot for MoICE
        </h1>
      </div>
      <BubbleChat
        chatflowid="0e67c7ea-0dfb-487a-8476-1c028d9f84dd"
        apiHost="https://chatbot.tech.gov.bt"
        theme={{ ...theme }}
      />
    </div>
  );
};

export default Moice;
