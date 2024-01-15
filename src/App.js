import {BrowserRouter,Route,Routes } from "react-router-dom";
import Upload from "./Pages/Upload_CSV_By_Id";
import AddRules from "./Pages/AddRules";
import SaveData from "./Pages/SaveData";
import Report from "./Pages/Report";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload/>}/>
        <Route path="/add-rules" element={<AddRules/>}/>
        <Route path="/save-data" element={<SaveData/>}/>
        <Route path="/view-report" element={<Report/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
