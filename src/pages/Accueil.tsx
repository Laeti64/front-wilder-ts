import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";

function Accueil(): JSX.Element {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
}

export default Accueil;
