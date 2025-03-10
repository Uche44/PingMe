import { useReducer, useState } from "react";
import ProfileOne from "../components/ProfFormOne";
import ProfileTwo from "../components/ProfileTwo";
import { useAuth } from "../contexts/Auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
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
  console.log(curUser);
  const [formData, setFormData] = useState({
    firstname: curUser.firstname,
    lastname: curUser.lastname,
    phone: "",
    gender: "",
    dob: "",
    pfp: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 11 digits.";
    }

    if (!["male", "female"].includes(formData.gender.toLowerCase())) {
      newErrors.gender = "Gender must be either 'male' or 'female'.";
    }

    const dob = new Date(formData.dob);
    const today = new Date();
    if (isNaN(dob.getTime()) || dob >= today) {
      newErrors.dob = "Enter a valid date of birth (past date only).";
    }

    if (!formData.pfp) {
      newErrors.pfp = "Profile picture is required.";
    } else {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(formData.pfp)) {
        newErrors.pfp = "Only JPG and PNG formats are allowed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    if (!validateForm(e)) return;
    setIsLoading(true);
    try {
      const profile = await updateDoc(doc(db, "users", "user.uid"));

      if (profile) {
        console.log(profile);
      }
    } catch (error) {
      console.log(error);
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
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            handleChange={handleChange}
          />
        )}
        {state.secondPage && (
          <ProfileTwo
            formData={formData}
            setFormData={setFormData}
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
