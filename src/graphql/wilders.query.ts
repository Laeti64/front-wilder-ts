import { gql } from "@apollo/client";

export const WILDERS_LIST = gql`
  query WilderList {
    WilderList {
      email
      firstName
      id
      lastName
      scores {
        id
        skill {
          id
          name
        }
        value
      }
    }
  }
`;

export const WILDER_BY_ID = gql`
  query FindWilder($wilderByIdId: String!) {
    WilderById(id: $wilderByIdId) {
      id
      firstName
      lastName
      email
      scores {
        id
        value
        skill {
          id
          name
        }
      }
    }
  }
`;
