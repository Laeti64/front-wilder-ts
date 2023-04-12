import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigateFunction,
  Navigation,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import WilderCard from "../components/WilderCard";
import { Wilder } from "../interfaces-types/interfaces";

function Delete() {
  const [wilder, setWilder] = useState<Wilder>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    scores: [],
  });
  const { id } = useParams<Readonly<Params<string>>>();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/wilder/${id}`)
      .then((data) => setWilder(data.data));
  }, [id]);

  const handleClick = () => {
    console.log("click");

    axios
      .delete(`${process.env.REACT_APP_BACK_URL}/wilder/delete/${id}`)
      .then(() => navigate("/"));
  };
  return (
    <div>
      <h1>Are you sure you want to delete this wilder</h1>
      <WilderCard wilder={wilder} toDelete={true} />
      <button onClick={handleClick}>Yes</button>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </div>
  );
}

export default Delete;
