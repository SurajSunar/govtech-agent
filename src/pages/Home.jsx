import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [message, setMessage] = useState(
    "Welcome to the RAG Agent for Gov Agencies.",
  );
  return (
    <div className="bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 w-full h-60 rounded-lg">
      <nav className=" flex justify-center font-semibold text-amber-700">
        <Link to={"rcsc"} className="p-4 hover:underline cursor-pointer">
          RCSC
        </Link>
        <Link to={"moice"} className="p-4 hover:underline cursor-pointer">
          MOICE
        </Link>
        <Link to={"mofaet"} className="p-4 hover:underline cursor-pointer">
          MOFAET
        </Link>
      </nav>
      <div className="h-1/2 flex justify-center items-center">
        <h1 className="text-4xl text-amber-800">{message}</h1>
      </div>
    </div>
  );
}

export default Home;
