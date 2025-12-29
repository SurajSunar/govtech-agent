import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Rcsc from "./pages/Rcsc";
import Moice from "./pages/Moice";
import Mofaet from "./pages/Mofae";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-amber-50 backdrop-blur-sm">
      <div className="flex flex-col mx-auto h-screen w-1/2 items-center justify-center">
        <HashRouter>
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/rcsc" Component={Rcsc}></Route>
            <Route path="/moice" Component={Moice}></Route>
            <Route path="/mofaet" Component={Mofaet}></Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
