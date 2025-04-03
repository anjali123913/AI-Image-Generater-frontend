import Header from "./component/Header";
import {lazy, Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./component/Loder";
const Home = lazy(()=>import  ("./component/Home"));
const History = lazy(()=>import("./component/History"));
export default function App() {

  return (
    <div>
      <Router>
        <Suspense fallback={<Loader/>}>

          <Header />
        <Routes>
          <Route path="/generate-image" element={<Home />} />
          <Route path="/" element={<History />} />
        </Routes>
        </Suspense>

      </Router>
    </div>
  );
}