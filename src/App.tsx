import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { Navbar } from "./components/layouts/Navbar";
import ContactForm from "./components/ContactForm/ContactForm";
import HolyGrail from "./components/HolyGrail/HolyGrail";
import MortgageCalculator from "./components/MortgageCalculator/MortgageCalculator";
import Todo from "./components/Todo/Todo";
// import JobBoard from "./components/JobBoard/JobBoard";
import FileStructure from "./components/FileStructure/FileStructure";
import { root } from "./components/FileStructure/data";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contactform/" element={<ContactForm />} />
        <Route path="holygrail/" element={<HolyGrail />} />
        <Route path="mortgage/" element={<MortgageCalculator />} />
        <Route path="todo/" element={<Todo />} />
        {/* <Route path="jobboard/" element={<JobBoard />} /> */}
        <Route path="filestructure/" element={<FileStructure {...root} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
