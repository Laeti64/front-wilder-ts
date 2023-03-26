import CardCSS from "./CSS-Components/wilderCard.module.css";
import profilImg from "../../src/images/profil.jpg";
import WilderSkills from "./WilderSkills";
import { Wilder } from "../interfaces-types/interfaces";
import { Link } from "react-router-dom";

function WilderCard({
  wilder,
  toDelete,
}: {
  wilder: Wilder;
  toDelete: Boolean;
}): JSX.Element {
  return (
    <div className={CardCSS.card}>
      <img className={CardCSS.image} src={profilImg} alt="logo profil" />
      <div className={CardCSS.title}>
        {wilder.firstName} {wilder.lastName}
      </div>
      <WilderSkills wilder={wilder} />
      {!toDelete && (
        <>
          <Link to={`/delete/${wilder.id}`}>
            <button>Delete</button>
          </Link>
          <Link to={`/create-or-edit?id=${wilder.id}`}>
            <button>Edit</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default WilderCard;
