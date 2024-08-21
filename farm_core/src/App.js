import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";

function App() {
  return (
    // <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          {/* <Route path="new" element={<New />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    // Final Project!
    // </div>
  );
}

export default App;
