import { gql } from "@apollo/client";

export const SKILLS_LIST = gql`
  query SkillList {
    SkillList {
      id
      name
    }
  }
`;
