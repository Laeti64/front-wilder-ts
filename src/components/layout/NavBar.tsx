import { Link } from "react-router-dom";
import CSSNav from "../CSS-Components/Navbar.module.css";

function NavBar(): JSX.Element {
  return (
    <div className={CSSNav.navbar}>
      <Link to="/" className={CSSNav.links}>
        Accueil
      </Link>
      <Link to="/create-or-edit" className={CSSNav.links}>
        Formulaire
      </Link>
    </div>
  );
}

export default NavBar;
