import "./App.css";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Formulaire from "./pages/Formulaire";
import Liste from "./components/Liste";
import Delete from "./pages/Delete";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Accueil />}>
          <Route path="/" element={<Liste />} />
          <Route path="/create-or-edit" element={<Formulaire />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
