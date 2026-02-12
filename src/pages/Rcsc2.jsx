import { BubbleChat } from "flowise-embed-react";
import { useEffect } from "react";

const Rcsc2 = () => {
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
        "Kuzuzangpo la! 👋 I am RCSC AI Assistant. How can I help you today?",
      showTitle: true,
      title: "RCSC AI Chatbot",
      titleAvatarSrc: "https://tech.gov.bt/wp-content/uploads/2025/09/logo.png",
      botMessage: {
        showAvatar: true,
        avatarSrc:
          "https://rcsc.gov.bt/wp-content/uploads/2024/11/RCSC-logo-1.png",
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
        <h1 className="text-4xl text-amber-800">
          Welcome to the RAG Agent for RCSC Version 2.0
        </h1>
      </div>
      <BubbleChat
        chatflowid="501f1a3d-4b6c-45f7-923a-b8d2e01cc978"
        apiHost="https://chatbot.tech.gov.bt"
        theme={{ ...theme }}
        observersConfig={{
          // The bot message stack has changed
          observeLoading: (loading) => {
            if (!loading) {
              setTimeout(() => {
                const chatbotHost = document.querySelector("flowise-chatbot");

                if (chatbotHost && chatbotHost.shadowRoot) {
                  const shadowRoot = chatbotHost.shadowRoot;
                  const list = shadowRoot.querySelector(".chatbot-container");
                  const chatView =
                    shadowRoot.querySelector(".chatbot-chat-view");
                  const warningDiv =
                    shadowRoot.querySelector(".warning-message");

                  if (!warningDiv) {
                    const newDivHtml = `<div class="warning-message flex flex-row items-center w-full top-0 left-0 font-bold absolute" style="z-index:20; margin-top:50px;background:#f7f8ff;padding: 16px;">AI-generated content may be inaccurate. Please validate before making decisions.</div>`;

                    list?.insertAdjacentHTML("afterbegin", newDivHtml);
                    chatView.style.paddingTop = "140px";
                  }
                }
              }, 400);
            }
          },
        }}
      />
    </div>
  );
};

export default Rcsc2;
