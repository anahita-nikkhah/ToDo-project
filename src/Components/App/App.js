import Header from "../Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import CreateTask from "../Task/CreateTask";
import Delete from "../Task/Delete";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateTask" element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
