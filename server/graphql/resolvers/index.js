const usersResolver = require("./users");

module.exports = {
  Mutation: {
    ...usersResolver.Mutation,
  },
};
