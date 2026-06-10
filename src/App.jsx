import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Rcsc from "./pages/Rcsc";
import Moice from "./pages/Moice";
import Mofaet from "./pages/Mofae";
import Home from "./pages/Home";
import Floatchat from "./pages/Floatchat";
import Rcsc2 from "./pages/Rcsc2";
import Pos from "./pages/Pos";
import ScannerPage from "./pages/Scanner";

function App() {
  return (
    <div className="bg-amber-50">
      <div className="flex flex- mx-auto h-screen w-full md:w-3/4 items-center justify-center p-4 md:p-0">
        <HashRouter>
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/pos" Component={Pos}></Route>
            <Route path="/scanner" Component={ScannerPage}></Route>

            <Route path="/rcsc" Component={Rcsc}></Route>
            <Route path="/rcsc-v2" Component={Rcsc2}></Route>

            <Route path="/moice" Component={Moice}></Route>
            <Route path="/mofaet" Component={Mofaet}></Route>

            <Route path="/app/:appName" element={<Floatchat />} />

            {/* This is not required for now */}
            {/* <Route path="/nlcs" Component={Nlcs}></Route>
            <Route path="/moh" Component={Moh}></Route>
            <Route path="/moit" Component={Moit}></Route>

            <Route path="/moha" Component={Moha}></Route>
            <Route path="/nsb" Component={Nsb}></Route>
            <Route path="/moe" Component={Moe}></Route> */}
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
