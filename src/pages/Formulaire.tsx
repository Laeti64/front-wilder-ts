import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { Note, Score, Skill, WilderBody } from "../interfaces-types/interfaces";
import formCSS from "../components/CSS-Components/formulaire.module.css";

function Formulaire(): JSX.Element {
  const [searchParams] = useSearchParams();
  const initialFormState: WilderBody = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      scores: [],
    }),
    []
  );
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [formState, setFormState] = useState<WilderBody>(initialFormState);
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = searchParams.get("id");
    id ? getWilder(id) : setFormState(initialFormState);
    id ? setId(id) : setId("");
  }, [searchParams, initialFormState]);

  const getWilder = async (id: string): Promise<void> => {
    const wilder = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/wilder/${id}`
    );
    console.log("data", wilder.data);
    setFormState(wilder.data);
    let notesToSet: Note[] = [];
    wilder.data.scores.forEach((score: Score) =>
      notesToSet.push({
        skillId: score.skill.id,
        skillLabel: score.skill.name,
        value: score.value,
      })
    );
    setNotes(notesToSet);
    let selectedSkillsToSet: Skill[] = [];
    wilder.data.scores.forEach((score: Score) =>
      selectedSkillsToSet.push({ id: score.skill.id, name: score.skill.name })
    );
    setSelectedSkills(selectedSkillsToSet);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!id) {
      await axios
        .post(`${process.env.REACT_APP_BACK_URL}/wilder/create`, formState)
        .then((res) =>
          notes.forEach((note) =>
            axios.post(
              `${process.env.REACT_APP_BACK_URL}/wilder/assign/score`,
              {
                wilderId: res.data.id,
                skillId: note.skillId,
                value: note.value,
              }
            )
          )
        );
    } else {
      await axios
        .patch(
          `${process.env.REACT_APP_BACK_URL}/wilder/update/partial/${id}`,
          formState
        )
        .then((res) =>
          notes.forEach((note) =>
            axios.post(
              `${process.env.REACT_APP_BACK_URL}/wilder/assign/score`,
              {
                wilderId: id,
                skillId: note.skillId,
                value: note.value,
              }
            )
          )
        );
    }
    navigate("/");
  };
  console.log(formState);
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
        {id ? (
          <button className={formCSS.button}>Edit</button>
        ) : (
          <button className={formCSS.button}>Create</button>
        )}
      </form>
      <NoteForm
        notes={notes}
        selectedSkills={selectedSkills}
        setNotes={setNotes}
        setSelectedSkills={setSelectedSkills}
      />
    </>
  );
}

export default Formulaire;
