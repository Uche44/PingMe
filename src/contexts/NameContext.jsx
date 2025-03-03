import { createContext, useContext, useState } from "react";

const NameContext = createContext();

const NameProvider = ({ children }) => {



  const [userName, setUserName] = useState({
    firstname: "",
    lastname: "",
  });

  return <NameContext.Provider>{children}</NameContext.Provider>;
};



export { NameProvider };
