import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Note, Skill } from "../interfaces-types/interfaces";
import noteFormCSS from "./CSS-Components/noteForm.module.css";
interface Iprops {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  selectedSkills: Skill[];
  setSelectedSkills: Dispatch<SetStateAction<Skill[]>>;
}
export default function NoteForm({
  notes,
  setNotes,
  selectedSkills,
  setSelectedSkills,
}: Iprops): JSX.Element {
  const [initialSkills, setInitialSkills] = useState<Skill[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [showAddButton, setShowAddButton] = useState<boolean>(true);

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
    // setSelectedSkills([...selectedSkills, { id: "", name: "" }]);
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const oldNotes = [...notes];
    oldNotes[index] = {
      ...oldNotes[index],
      value: Number(e.target.value),
    };
    setNotes(oldNotes);
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
    setNotes(oldNotes);
  };

  const getFilteredSkills = (note: Note): Skill[] => {
    console.log("note", note);
    let listSkills = [...skills];
    console.log("selectedSkills92", selectedSkills);
    console.log("listSkills", listSkills);
    let filteredSkills = listSkills.filter((skill) => {
      console.log("skill", skill);
      return !selectedSkills.some((s) => s.name === skill.name);
    });
    filteredSkills.push({ id: note.skillId, name: note.skillLabel });
    console.log("filteredSkills", filteredSkills);
    return filteredSkills;
  };

  useEffect(() => {
    if (notes.length < initialSkills.length) {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }
  }, [initialSkills.length, notes.length]);

  console.log("notes", notes);
  console.log("selectedSkills", selectedSkills);
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
            <input
              placeholder="value"
              onChange={(e) => handleChangeValue(e, index)}
              value={note.value}
            />
            <select
              onChange={(e) => handleChangeSkills(e, index)}
              value={note.skillLabel}
            >
              <option>...</option>
              {skills &&
                getFilteredSkills(note).map((skill, index) => (
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
