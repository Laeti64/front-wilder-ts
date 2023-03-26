import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { WilderBody } from "../interfaces-types/interfaces";
import formCSS from "../components/CSS-Components/formulaire.module.css";

function Formulaire(): JSX.Element {
  const [searchParams] = useSearchParams();
  const initialFormState: WilderBody = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
    }),
    []
  );

  const [formState, setFormState] = useState<WilderBody>(initialFormState);

  useEffect(() => {
    const id = searchParams.get("id");
    id ? getWilder(id) : setFormState(initialFormState);
  }, [searchParams, initialFormState]);

  const getWilder = async (id: string): Promise<void> => {
    const wilder = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/wilder/${id}`
    );
    setFormState(wilder.data);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_BACK_URL}/wilder/create`, formState);
    setFormState(initialFormState);
  };

  return (
    <>
      <h1>Formulaire</h1>
      <form className={formCSS.form} onSubmit={handleSubmit}>
        <input
          className={formCSS.input}
          type="text"
          onChange={handleChange}
          placeholder="FirstName"
          name="firstName"
          value={formState.firstName}
        />
        <input
          className={formCSS.input}
          type="text"
          onChange={handleChange}
          placeholder="LastName"
          name="lastName"
          value={formState.lastName}
        />
        <input
          className={formCSS.input}
          type="text"
          onChange={handleChange}
          placeholder="Email"
          name="email"
          value={formState.email}
        />
        <button className={formCSS.button}>Create</button>
      </form>
      <NoteForm />
    </>
  );
}

export default Formulaire;
