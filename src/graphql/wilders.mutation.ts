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

export const WILDER_ASSIGN_SCORE = gql`
  mutation AssignScore($assignInput: AssignInput!) {
    WilderAssignNote(assignInput: $assignInput) {
      id
      value
      skill {
        id
        name
      }
    }
  }
`;

export const WILDER_DELETE = gql`
  mutation WilderDelete($wilderDeleteId: String!) {
    WilderDelete(id: $wilderDeleteId) {
      success
      message
    }
  }
`;

export const WILDER_UPDATE = gql`
  mutation WilderUpdate($updateWilder: UpdateWilderInput!) {
    WilderUpdate(updateWilder: $updateWilder) {
      success
      message
    }
  }
`;
