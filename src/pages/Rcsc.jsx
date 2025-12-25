import { BubbleChat } from "flowise-embed-react";

const Rcsc = () => {
  return (
    <div className="bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 w-full h-60 rounded-lg">
      <div className="h-full flex justify-center items-center">
        <h1 className="text-4xl text-amber-700">
          Welcome to the RAG Agent for RCSC
        </h1>
      </div>
      <BubbleChat
        chatflowid="fb1cd705-76ed-4db5-9baa-dc3dfa7b4e80"
        apiHost="https://chatbot.tech.gov.bt"
      />
    </div>
  );
};

export default Rcsc;
