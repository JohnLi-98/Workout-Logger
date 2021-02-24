const userResolvers = require("./users");
const setResolvers = require("./set");

module.exports = {
  Mutation: {
    ...userResolvers.Mutation,
    ...setResolvers.Mutation,
  },
};
