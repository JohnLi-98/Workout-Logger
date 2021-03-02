const userResolvers = require("./users");
const setResolvers = require("./set");
const exerciseResolvers = require("./exercise");

module.exports = {
  Query: {
    ...exerciseResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...setResolvers.Mutation,
    ...exerciseResolvers.Mutation,
  },
};
