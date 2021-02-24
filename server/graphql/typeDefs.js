const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: Float!
  }
  type Set {
    id: ID!
    weight: Float!
    reps: Int!
    createdAt: Float!
    notes: String
  }
  type Exercise {
    id: ID!
    exerciseName: String!
    username: String!
    sets: [Set]!
  }
  type Workout {
    id: ID!
    workoutName: String
    username: String!
    notes: String
    exercises: [Exercise]!
  }

  input LoginInput {
    username: String!
    password: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LogSetInput {
    exerciseName: String!
    weight: Float!
    reps: Int!
    notes: String!
  }

  type Query {
    helloWorld: String
  }
  type Mutation {
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
    logSet(logSetInput: LogSetInput): Set!
  }
`;
