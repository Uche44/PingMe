import { createContext, useContext, useState } from "react";
// import { useAuth } from "./Auth";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // const { curUser } = useAuth();

  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    phone: "",
    gender: "",
    dob: "",
    pfp: "",
    bio: "",
  });

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
