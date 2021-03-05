import React, { useContext } from "react";

import { AuthContext } from "../context/auth";
import AuthHome from "../components/home/AuthHome";
import UnauthHome from "../components/home/UnauthHome";

const Home = () => {
  const { user } = useContext(AuthContext);

  const content = user ? <AuthHome user={user} /> : <UnauthHome />;
  return content;
};

export default Home;
