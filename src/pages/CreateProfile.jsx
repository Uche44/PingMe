import { useReducer, useState } from "react";
import ProfileOne from "../components/ProfFormOne";
import ProfileTwo from "../components/ProfileTwo";
import { useAuth } from "../contexts/Auth";
import { useProfile } from "../contexts/ProfileContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadImage } from "../lib/imageUpload";

const initialState = { firstPage: true, secondPage: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return { firstPage: false, secondPage: true };
    case "PREV_PAGE":
      return { firstPage: true, secondPage: false };
    default:
      return state;
  }
};

const CreateProfile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { curUser, isLoading, setIsLoading } = useAuth();
  const { profileData, setProfileData } = useProfile();
  // console.log(curUser);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pfp" && files.length > 0) {
      setProfileData((prev) => ({ ...prev, pfp: files[0] }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!/^\d{11}$/.test(profileData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 11 digits.";
    }

    if (!["male", "female"].includes(profileData.gender.toLowerCase())) {
      newErrors.gender = "Gender must be either 'male' or 'female'.";
    }

    const dob = new Date(profileData.dob);
    const today = new Date();
    if (isNaN(dob.getTime()) || dob >= today) {
      newErrors.dob = "Enter a valid date of birth (past date only).";
    }

    if (!profileData.pfp) {
      newErrors.pfp = "Profile picture is required.";
    } else {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(profileData.pfp)) {
        newErrors.pfp = "Only JPG and PNG formats are allowed.";
      }
    }

    if (
      !profileData.bio ||
      profileData.bio.length < 10 ||
      profileData.bio.length > 300
    ) {
      newErrors.bio = "Bio must be between 10 and 300 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    if (!validateForm(e)) return;
    setIsLoading(true);
    try {
      let imageUrl = "";
      if (profileData.pfp) {
        imageUrl = await uploadImage(profileData.pfp);
      }
      const profile = await updateDoc(doc(db, "users", curUser.id), {
        ...profileData,
        pfp: imageUrl,
      });

      if (profile) {
        console.log(profile);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-white px-[1.2rem] relative">
      {state.firstPage && (
        <h2 className="text-3xl font-bold text-purple-700 my-[3rem]">
          Create your Profile
        </h2>
      )}
      <form
        onSubmit={handleCreateProfile}
        className="w-full h-[67%] mt-10"
      >
        {state.firstPage && (
          <ProfileOne
            profileData={profileData}
            // setProfileData={setProfileData}
            errors={errors}
            setErrors={setErrors}
            handleChange={handleChange}
          />
        )}
        {state.secondPage && (
          <ProfileTwo
            profileData={profileData}
            // setProfileData={setProfileData}
            errors={errors}
            setErrors={setErrors}
            handleChange={handleChange}
          />
        )}

        {state.firstPage && (
          <button
            onClick={() => dispatch({ type: "NEXT_PAGE" })}
            className="bg-purple-700 cursor-pointer font-bold px-8 py-2 mt-4 text-white rounded-[5px] absolute right-[1rem]"
          >
            Next
          </button>
        )}

        {state.secondPage && (
          <button
            onClick={() => dispatch({ type: "PREV_PAGE" })}
            className="bg-gray-500 cursor-pointer font-bold px-4 py-2 mt-4 text-white ml-2"
          >
            Back
          </button>
        )}

        {state.secondPage && (
          <button
            type="submit"
            className="bg-purple-700 cursor-pointer font-bold px-8 py-2 mt-4 text-white rounded-[5px] absolute right-[1rem]"
          >
            Create Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateProfile;
