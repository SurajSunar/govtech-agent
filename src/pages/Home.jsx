import { useState } from "react";
import { Link } from "react-router-dom";

const MENU_LIST = [
  {
    appName: "RCSC",
    route: "rcsc",
  },
  {
    appName: "MOICE",
    route: "moice",
  },
  {
    appName: "MOFAET",
    route: "mofaet",
  },
  {
    appName: "NLCS",
    route: "/app/nlcs",
  },
  {
    appName: "MOH",
    route: "/app/nlcs",
  },
  {
    appName: "MOIT",
    route: "/app/moit",
  },
  {
    appName: "MOHA",
    route: "/app/moha",
  },
  {
    appName: "NSB",
    route: "/app/nsb",
  },
  {
    appName: "MOE",
    route: "/app/moe",
  },
  // {
  //   appName: "MOE",
  //   route: "/app/moe",
  // },
  // {
  //   appName: "MOE",
  //   route: "/app/moe",
  // },
  // {
  //   appName: "MOE",
  //   route: "/app/moe",
  // },
];

function Home() {
  const [message, setMessage] = useState(
    "Welcome to the RAG Agent for Gov Agencies.",
  );
  return (
    <div className="bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 w-full h-60 rounded-lg p-2">
      <nav className="flex flex-wrap justify-center font-semibold text-amber-700 mt-2 gap-y-2 text-center">
        {MENU_LIST.map((menu, index) => (
          <>
            <Link
              to={menu.route}
              className={`py-1 px-4 hover:underline cursor-pointer border-r border-r-amber-400 ${index === MENU_LIST.length - 1 && "border-r-0"}`}
            >
              {menu.appName}
            </Link>
          </>
        ))}
      </nav>
      <div className="h-1/2 flex justify-center items-center">
        <h1 className="text-2xl md:text-4xl text-amber-800">{message}</h1>
      </div>
    </div>
  );
}

export default Home;
