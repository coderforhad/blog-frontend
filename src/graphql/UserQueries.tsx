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

export const DELETE_USER = gql`
  mutation RemovePerson($removePersonId: String!) {
    removePerson(id: $removePersonId) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdatePerson($updatePersonInput: UpdatePersonInput!) {
    updatePerson(updatePersonInput: $updatePersonInput) {
      _id
      name
      father
      mother
      email
      mobile
    }
  }
`;

export const GET_ONE_USER = gql`
  query PersonById($personByIdId: String!) {
    personById(id: $personByIdId) {
      _id
      name
      mother
      father
      email
      mobile
    }
  }
`;
