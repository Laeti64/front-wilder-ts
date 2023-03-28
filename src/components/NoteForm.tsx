import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Note, Skill } from "../interfaces-types/interfaces";
import noteFormCSS from "./CSS-Components/noteForm.module.css";

export default function NoteForm() {
  const [initialSkills, setInitialSkills] = useState<Skill[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showAddButton, setShowAddButton] = useState<boolean>(true);

  const [notes, setNotes] = useState<Note[]>([]);

  const getSkills = useCallback(async (): Promise<void> => {
    let response = await axios.get(`${process.env.REACT_APP_BACK_URL}/skill`);
    if (response.data) {
      setInitialSkills(response.data);
      setSkills(response.data);
    }
  }, []);

  useEffect(() => {
    getSkills();
  }, []);

  const addNote = (): void => {
    setNotes([...notes, { skillId: "", skillLabel: "", value: 0 }]);
    setSelectedSkills([...selectedSkills, { id: "", name: "" }]);
  };

  const handleChangeSkills = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const oldSelectedSkills = [...selectedSkills];
    const oldNotes = [...notes];
    const skill = initialSkills.find((skill) => skill.name === e.target.value);
    if (skill) {
      oldSelectedSkills[index] = skill;
      oldNotes[index] = {
        ...oldNotes[index],
        skillId: skill.id,
        skillLabel: skill.name,
      };
    }
    setSelectedSkills(oldSelectedSkills);
    setNotes(oldNotes);
  };

  const handleDeleteSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const oldSelectedSkills = [...selectedSkills];
    oldSelectedSkills.splice(index, 1);
    setSelectedSkills(oldSelectedSkills);

    const oldNotes = [...notes];
    oldNotes.splice(index, 1);
    console.log(oldNotes.splice(index, 1));
    setNotes(oldNotes);
  };

  useEffect(() => {
    if (notes.length < initialSkills.length) {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }
  }, [initialSkills.length, notes.length]);
  console.log("skills", skills);
  console.log("initialSkills", initialSkills);
  console.log("selectedSkills", selectedSkills);
  console.log("notes", notes);

  return (
    <div className={noteFormCSS.container}>
      {showAddButton && (
        <button className={noteFormCSS.button} onClick={addNote}>
          Add a note
        </button>
      )}
      {notes.map((note, index) => (
        <div className={noteFormCSS.inputBox} key={index}>
          <div className={noteFormCSS.inputBox}>
            <input placeholder="value" />
            <select
              onChange={(e) => handleChangeSkills(e, index)}
              value={note.skillLabel}
            >
              <option>...</option>
              {skills
                .filter((skill) => !selectedSkills.includes(skill))
                .map((skill, index) => (
                  <option key={index} value={skill.name}>
                    {skill.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            className={noteFormCSS.button}
            onClick={(e) => handleDeleteSkill(e, index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
