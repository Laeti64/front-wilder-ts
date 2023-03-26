import React, { useEffect, useState } from "react";
import CSSCard from "./CSS-Components/wilderCard.module.css";
import { Score, Wilder } from "../interfaces-types/interfaces";
import axios from "axios";

function WilderSkills({ wilder }: { wilder: Wilder }) {
  const [scores, setScores] = useState<Score[]>([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_URL}/score`).then((res) => {
      setScores(res.data);
    });
  }, []);

  const filteredScores: Score[] = scores.filter(
    (score) => score.wilder.id === wilder.id
  );

  console.log(scores, wilder, filteredScores);

  return (
    <div className={CSSCard.scoresContainer}>
      {filteredScores.map((score) => (
        <div className={CSSCard.scores} key={score.id}>
          {score.skill.name} - {score.value}
        </div>
      ))}
    </div>
  );
}

export default WilderSkills;
