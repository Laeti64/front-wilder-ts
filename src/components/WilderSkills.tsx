import React, { useEffect, useState } from "react";
import CSSCard from "./CSS-Components/wilderCard.module.css";
import { Score, Wilder } from "../interfaces-types/interfaces";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { SCORES_LIST } from "../graphql/scores.query";

function WilderSkills({ wilder }: { wilder: Wilder }) {
  const [scores, setScores] = useState<Score[]>([]);

  const { data, refetch } = useQuery(SCORES_LIST, {
    onCompleted: (data) => {
      setScores(data.ScoreList);
    },
  });
  console.log("data", data);
  useEffect(() => {
    refetch();
  }, [data]);

  const filteredScores: Score[] = scores.filter(
    (score) => score.wilder.id === wilder.id
  );

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
