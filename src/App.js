import "./App.css";
import Main from "./Component/SpinMain/Main";
import FormSection from "./Component/SpinMain/Form/Form";
import SpinWheel from "./Component/SpinMain/SpinWheel/index";
import Calculator from "./Component/SpinMain/Calculator/Calculator";
import { Routes, Route } from "react-router-dom";
import Certificate from "./Component/Certification/Certificate";
import Thanks from './Component/SpinMain/SpinWheel/Thanks';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<FormSection />} />
      <Route path="/spin" element={<SpinWheel />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </div>
  );
}

export default App;
