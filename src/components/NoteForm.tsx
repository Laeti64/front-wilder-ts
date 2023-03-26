import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Note, Skill } from "../interfaces-types/interfaces";
import noteFormCSS from "./CSS-Components/noteForm.module.css";

export default function NoteForm() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showAddButton, setShowAddButton] = useState<boolean>(true);

  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (): void => {
    setNotes([...notes, { skillId: "", skillLabel: "", value: 0 }]);
    setSelectedSkills([...selectedSkills, { id: "", name: "" }]);
  };

  const handleChangeSkills = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    console.log(e.target.value, index);
    const oldSkills = [...selectedSkills];
    const oldNotes = [...notes];
    const skill = skills.find((skill) => skill.name === e.target.value);
    if (skill) {
      oldSkills[index] = skill;
      oldNotes[index] = {
        ...oldNotes[index],
        skillId: skill.id,
        skillLabel: skill.name,
      };
    }
    setSelectedSkills(oldSkills);
    setNotes(oldNotes);
  };

  const handleDeleteSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const oldSkills = [...selectedSkills];
    oldSkills.splice(index, 1);
    setSelectedSkills(oldSkills);

    const oldNotes = [...notes];
    oldNotes.splice(index, 1);
    console.log(oldNotes.splice(index, 1));
    setNotes(oldNotes);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_URL}/skill/`).then((res) => {
      setSkills(res.data);
    });
  }, []);

  useEffect(() => {
    if (notes.length <= skills.length) {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }
  }, [skills.length, notes.length]);
  console.log(skills, selectedSkills, notes);

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
              value={notes[index].skillLabel}
            >
              <option>...</option>
              {skills.map((skill, index) => (
                <option key={index}>{skill.name}</option>
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
