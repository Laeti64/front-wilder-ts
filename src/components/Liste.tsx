import { useEffect, useState } from "react";
import WilderCard from "./WilderCard";
import CardCSS from "./CSS-Components/wilderCard.module.css";
import { Link } from "react-router-dom";
import { Wilder } from "../interfaces-types/interfaces";
import axios from "axios";

function Liste(): JSX.Element {
  const [wilders, setWilders] = useState<Wilder[]>([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_URL}/wilder/`).then((res) => {
      setWilders(res.data);
    });
  }, []);

  console.log("wilders", wilders);
  return (
    <>
      <div>Liste</div>
      <div className={CardCSS.cardContainer}>
        {wilders.map((wilder) => (
          <WilderCard wilder={wilder} key={wilder.id} toDelete={false} />
        ))}
      </div>
      <Link to="/create-or-edit">
        <button>Create a Wilder</button>
      </Link>
    </>
  );
}

export default Liste;
