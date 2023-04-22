import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { Note, Score, Skill, WilderBody } from "../interfaces-types/interfaces";
import formCSS from "../components/CSS-Components/formulaire.module.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { WILDER_BY_ID } from "../graphql/wilders.query";
import {
  WILDER_ASSIGN_SCORE,
  WILDER_CREATE,
  WILDER_UPDATE,
} from "../graphql/wilders.mutation";

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
  const [FindWilder] = useLazyQuery(WILDER_BY_ID);
  const [WilderCreate] = useMutation(WILDER_CREATE, {
    onCompleted: (data) => {
      console.log("data", data);
    },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  const [WilderUpdate] = useMutation(WILDER_UPDATE);

  const [AssignScore] = useMutation(WILDER_ASSIGN_SCORE);

  useEffect(() => {
    const id = searchParams.get("id");
    const getWilder = async (id: string): Promise<void> => {
      FindWilder({
        onCompleted: (data) => {
          console.log("data", data);
          const { WilderById } = data;
          setFormState(WilderById);
          let notesToSet: Note[] = [];
          WilderById.scores.forEach((score: Score) =>
            notesToSet.push({
              skillId: score.skill.id,
              skillLabel: score.skill.name,
              value: score.value,
            })
          );
          setNotes(notesToSet);
          let selectedSkillsToSet: Skill[] = [];
          WilderById.scores.forEach((score: Score) =>
            selectedSkillsToSet.push({
              id: score.skill.id,
              name: score.skill.name,
            })
          );
          setSelectedSkills(selectedSkillsToSet);
        },
        variables: { wilderByIdId: id },
      });
    };
    id ? getWilder(id) : setFormState(initialFormState);
    id ? setId(id) : setId("");
  }, [searchParams, initialFormState, FindWilder]);

  useEffect(() => {
    let scores = [];
    notes.map((note) => scores.push({}));
  }, [notes]);

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
      const wilderResult = await WilderCreate({
        variables: {
          wilderCreate: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
          },
        },
      });
      const assignScore = async () =>
        notes.forEach((note) => {
          AssignScore({
            variables: {
              assignInput: {
                value: note.value,
                skillId: note.skillId,
                wilderId: wilderResult.data.WilderCreate.id,
              },
            },
          });
        });
      await assignScore;
      navigate("/");
    } else {
      await WilderUpdate({
        variables: {
          updateWilder: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            id: id,
          },
        },
      });
      const assignScore = async () =>
        notes.forEach((note) => {
          AssignScore({
            variables: {
              assignInput: {
                value: note.value,
                skillId: note.skillId,
                wilderId: id,
              },
            },
          });
        });
      await assignScore();
      navigate("/");
    }
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
