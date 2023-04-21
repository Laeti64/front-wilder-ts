import { gql } from "@apollo/client";

export const SCORES_LIST = gql`
  query ScoreList {
    ScoreList {
      id
      value
      wilder {
        id
        firstName
        lastName
        email
      }
      skill {
        id
        name
      }
    }
  }
`;
