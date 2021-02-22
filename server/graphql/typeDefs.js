const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: Float!
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
  type Query {
    helloWorld: String
  }
  type Mutation {
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
  }
`;
