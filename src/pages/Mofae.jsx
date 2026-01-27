import { BubbleChat } from "flowise-embed-react";
import { useEffect, useState } from "react";

const Mofaet = () => {
  const [isLoading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(
    JSON.parse(localStorage.getItem("new_chat_mode")),
  );

  const btnClick = (flag) => {
    setLoading(true);
    localStorage.setItem("new_chat_mode", flag);
    window.location.reload();
    setLoading(false);
  };

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
      welcomeMessage: `Hello, I am Chidrel, the AI Assistant of the Ministry of Foreign Affairs and External Trade of Bhutan. I am continually learning, and your interactions help me improve. If you have any suggestion, 
        please <a href="https://forms.gle/UdNZJKw5gkgvb7qY8">click here</a> to submit`,
      showTitle: true,
      title: "Chidrel",
      titleAvatarSrc: "https://tech.gov.bt/wp-content/uploads/2025/09/logo.png",
      botMessage: {
        showAvatar: true,
        avatarSrc:
          "https://www.mfa.gov.bt/wp-content/uploads/2026/01/Screenshot-7.png",
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
      <div className="p-4 h-full flex justify-center items-center flex-col">
        <h1 className="md:text-4xl text-amber-700">
          Welcome to the AI Chatbot for MOFAET
        </h1>

        {isNew ? (
          <button
            className="bg-gray-200 rounded-lg py-2 px-4 mt-4 cursor-pointer"
            onClick={() => btnClick(false)}
          >
            Load Old Chat
          </button>
        ) : (
          <button
            className="bg-amber-500 rounded-lg py-2 px-4 mt-4 cursor-pointer"
            onClick={() => btnClick(true)}
          >
            Load New Chat
          </button>
        )}
      </div>
      {isNew ? (
        <BubbleChat
          //chatflowid="5f56cce0-73c4-440e-934d-6127e245865b"
          chatflowid="a9d6d456-4b27-4805-8f03-532560d9700c"
          apiHost="https://chatbot.tech.gov.bt"
          theme={{ ...theme }}
          observersConfig={{
            // The bot message stack has changed
            observeMessages: (messages) => {
              const messageIndex = messages.findIndex((msg) => msg.action);

              if (messageIndex > -1) {
                setTimeout(() => {
                  const chatbotHost = document.querySelector("flowise-chatbot");

                  if (chatbotHost && chatbotHost.shadowRoot) {
                    const shadowRoot = chatbotHost.shadowRoot;
                    const buttonNodes = shadowRoot.querySelectorAll("button");
                    const buttons = Array.from(buttonNodes);

                    if (buttons.length) {
                      buttons?.forEach((btn) => {
                        if (btn.innerText.includes("Proceed"))
                          btn.innerText = " Yes";
                        if (btn.innerText.includes("Reject"))
                          btn.innerText = " No";
                      });
                    }
                  }
                }, 400);
              }
            },
          }}
        />
      ) : (
        <BubbleChat
          chatflowid="5f56cce0-73c4-440e-934d-6127e245865b"
          //chatflowid="a9d6d456-4b27-4805-8f03-532560d9700c"
          apiHost="https://chatbot.tech.gov.bt"
          theme={{
            ...theme,
            chatWindow: { ...theme.chatWindow, title: "Old Chidrel" },
          }}
        />
      )}
    </div>
  );
};

export default Mofaet;
