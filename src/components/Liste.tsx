import WilderCard from "./WilderCard";
import CardCSS from "./CSS-Components/wilderCard.module.css";
import { Link } from "react-router-dom";
import { Wilder } from "../interfaces-types/interfaces";
import { useQuery } from "@apollo/client";
import { WILDERS_LIST } from "../graphql/wilders.query";
import { useEffect } from "react";
function Liste(): JSX.Element {
  const { data, refetch } = useQuery(WILDERS_LIST);
  console.log("data", data);

  useEffect(() => {
    refetch();
  }, []);

  if (!data) return <div>Chargement...</div>;

  return (
    <>
      <div>Liste</div>
      <div className={CardCSS.cardContainer}>
        {data.WilderList.map((wilder: Wilder) => (
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
