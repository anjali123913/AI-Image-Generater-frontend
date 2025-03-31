import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import History from "./component/History";
export default function App() {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/generate-image" element={<Home />} />
          <Route path="/" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}