const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // If authHeader, retrieve the token from it
    // Send header with a value Bearer <token_here>
    // Token is in the second index of the split().
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      // if there is a token, use jsonwebtoken to verify that the token matches with the secret key
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorisation header must be provided");
};
