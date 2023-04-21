import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import WilderCard from "../components/WilderCard";
import { Wilder } from "../interfaces-types/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { WILDER_DELETE } from "../graphql/wilders.mutation";
import { WILDER_BY_ID } from "../graphql/wilders.query";

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
  const [WilderDelete] = useMutation(WILDER_DELETE);
  const [FindWilder] = useLazyQuery(WILDER_BY_ID);

  useEffect(() => {
    FindWilder({
      variables: { wilderByIdId: id },
      onCompleted: (data) => {
        setWilder(data.WilderById);
      },
    });
  }, [id]);

  const handleClick = async () => {
    console.log("click");
    if (id)
      await WilderDelete({
        variables: { wilderDeleteId: id },
      });
    navigate("/");
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
