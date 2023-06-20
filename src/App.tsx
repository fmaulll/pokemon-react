import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import PokemonProvider from "./context/PokemonContext";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <PokemonProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Layout>
      </PokemonProvider>
    </BrowserRouter>
  );
}

export default App;