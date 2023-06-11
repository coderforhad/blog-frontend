import { gql } from "@apollo/client";

export const ALL_USER = gql`
  query GetAllPerson($limit: Int, $skip: Int) {
    getAllPerson(limit: $limit, skip: $skip) {
      person {
        _id
        name
        father
        mother
        email
        mobile
      }
      personCount
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreatePerson($createPersonInput: CreatePersonInput!) {
    createPerson(createPersonInput: $createPersonInput) {
      _id
      name
      father
      mother
      email
      mobile
    }
  }
`;
