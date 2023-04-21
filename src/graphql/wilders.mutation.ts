import { gql } from "@apollo/client";

export const WILDER_CREATE = gql`
  mutation WilderCreate($wilderCreate: WilderInput!) {
    WilderCreate(wilderCreate: $wilderCreate) {
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
