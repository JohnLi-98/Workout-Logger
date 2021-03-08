import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOG_SET = gql`
  mutation logSet(
    $exerciseName: String!
    $weight: Float
    $reps: Int
    $notes: String
  ) {
    logSet(
      logSetInput: {
        exerciseName: $exerciseName
        weight: $weight
        reps: $reps
        notes: $notes
      }
    ) {
      weight
      reps
      notes
      createdAt
    }
  }
`;
