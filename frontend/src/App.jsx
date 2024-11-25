import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Owner } from "./components/Owner";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Vehicles } from "./components/Vehicles";

function App() {
  return (
    <main className="bg-gray-800 h-screen w-full">
      <div className="w-4/5 m-auto pt-8">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proprietarios" element={<Owner />} />
            <Route path="/veiculos" element={<Vehicles />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
