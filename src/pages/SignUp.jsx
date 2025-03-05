// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";

// import { useAuth } from "../contexts/Auth";

// const SignUpPage = () => {
//   const [userData, setUserData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const { signUp } = useAuth();

//   const validateForm = (e) => {
//     let newErrors = {};

//     e.preventDefault();

//     if (!userData.firstname.trim()) {
//        newErrors.firstname = "Enter your Name";
//     }

//     if (!userData.lastname.trim()) {
//        newErrors.lastname = "Enter your Last Name";
//     }
//     if (!userData.email.includes("@")) {
//       newErrors.email = "Enter valid Email";
//     }
//     if (userData.password < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     if (!validateForm(e)) return;

//     try {
//       signUp(
//         userData.firstname,
//         userData.lastname,
//         userData.email,
//         userData.password
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-full h-[100vh] bg-white px-[1.2rem]">
//       <h2 className="text-2xl font-bold text-purple-700 mt-[3rem] text-center">
//         Let&apos;s Get Your Account Setup!
//       </h2>
//       <form
//         onSubmit={handleSignUp}
//         className="w-full h-[67%] mt-10"
//       >
//         <div className=" h-[6rem] w-full flex items-start gap-2">
//           {/* first name */}
//           <div className="name">
//             <label
//               htmlFor="firstname"
//               className="font-semibold text-xl"
//             >
//               First Name
//             </label>
//             <input
//               onChange={handleChange}
//               value={userData.firstname}
//               type="text"
//               name="firstname"
//               id="firstname"
//               className="w-full focus:outline-none border-b-2 h-[3.5rem] active:border-b-purple-400 px-2"
//               required
//             />

//             {errors.firstname && (
//               <p className="text-red-600 font-semibold">{errors.firstname}</p>
//             )}
//           </div>

//           {/* last name */}
//           <div className="name">
//             <label
//               htmlFor="lastname"
//               className="font-semibold text-xl"
//             >
//               Last Name
//             </label>
//             <input
//               onChange={handleChange}
//               value={userData.lastname}
//               type="text"
//               name="lastname"
//               id="lastname"
//               className="w-full border-b-2 focus:outline-none h-[3.5rem] active:border-b-purple-400 px-2"
//               required
//             />
//             {errors.lastname && (
//               <p className="text-red-600 font-semibold">{errors.lastname}</p>
//             )}
//           </div>
//         </div>

//         <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
//           <label
//             htmlFor="email"
//             className="font-semibold text-xl"
//           >
//             Email
//           </label>
//           <input
//             onChange={handleChange}
//             value={userData.email}
//             type="email"
//             name="email"
//             id="email"
//             className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
//             required
//           />

//           {errors.email && (
//             <p className="text-red-600 font-semibold">{errors.email}</p>
//           )}
//         </div>
//         <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
//           <label
//             htmlFor="password"
//             className="font-semibold text-xl"
//           >
//             Password
//           </label>
//           <input
//             onChange={handleChange}
//             value={userData.password}
//             type="password"
//             id="password"
//             name="password"
//             className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
//             required
//           />

//           {errors.password && (
//             <p className="text-red-600 font-semibold">{errors.password}</p>
//           )}
//         </div>
//         <div className="mt-2 w-fit flex gap-3 justify-center">
//           <input
//             type="checkbox"
//             className="h-[24px] w-[24px]"
//             required
//           />
//           <p className="text-[1rem]">I agree to the terms and conditions</p>
//         </div>
//         <button
//           // onClick={handleSignUp}
//           className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[16px] hover:brightness-125 cursor-pointer"
//         >
//           Sign Up
//         </button>
//       </form>

//       <div className="mt-8 h-[8rem] flex flex-col items-center">
//         <p className="text-[1rem]">
//           Already have an account?
//           <span className="font-semibold cursor-pointer hover:font-bold">
//             Log In
//           </span>
//         </p>

//         <p className="m-3 text-[1.1rem]">OR</p>
//         <div className="flex w-full justify-center items-center gap-2">
//           <p className="text-[1rem] cursor-pointer hover:font-bold">
//             Continue with Google
//           </p>
//           <FcGoogle className="text-2xl" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";
import { toast } from "react-hot-toast";
import ErrorBoundary from "../ErrorBoundary";

const SignUpPage = () => {
  const [errors, setErrors] = useState({});
  const { userData, setUserData, signUp } = useAuth();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!userData.firstname.trim()) {
      newErrors.firstname = "Enter your Name";
    }
    if (!userData.lastname.trim()) {
      newErrors.lastname = "Enter your Last Name";
    }
    if (!userData.email.includes("@")) {
      newErrors.email = "Enter valid Email";
    }
    if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    if (!validateForm(e)) return;

    e.preventDefault();

    try {
      const userCredential = await signUp(
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.password
      );

      if (userCredential && userCredential.user) {
        toast.success("Signup successful!");
        // navigate("/create-profile");
      }
      else {
        toast.error("Signup failed");
      }
    } catch (error) {
      // toast.error(error);
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-white px-[1.2rem]">
      <h2 className="text-2xl font-bold text-purple-700 mt-[3rem] text-center">
        Let&apos;s Get Your Account Setup!
      </h2>
      <ErrorBoundary>
        <form
          onSubmit={handleSignUp}
          className="w-full h-[67%] mt-10"
        >
          <div className="h-[6rem] w-full flex items-start gap-2">
            {/* First Name */}
            <div className="name">
              <label
                htmlFor="firstname"
                className="font-semibold text-xl"
              >
                First Name
              </label>
              <input
                onChange={handleChange}
                value={userData.firstname}
                type="text"
                name="firstname"
                id="firstname"
                className="w-full focus:outline-none border-b-2 h-[3.5rem] active:border-b-purple-400 px-2"
                required
              />
              {errors.firstname && (
                <p className="text-red-600 font-semibold">{errors.firstname}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="name">
              <label
                htmlFor="lastname"
                className="font-semibold text-xl"
              >
                Last Name
              </label>
              <input
                onChange={handleChange}
                value={userData.lastname}
                type="text"
                name="lastname"
                id="lastname"
                className="w-full border-b-2 focus:outline-none h-[3.5rem] active:border-b-purple-400 px-2"
                required
              />
              {errors.lastname && (
                <p className="text-red-600 font-semibold">{errors.lastname}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
            <label
              htmlFor="email"
              className="font-semibold text-xl"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              value={userData.email}
              type="email"
              name="email"
              id="email"
              className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-red-600 font-semibold">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
            <label
              htmlFor="password"
              className="font-semibold text-xl"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={userData.password}
              type="password"
              id="password"
              name="password"
              className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
              required
            />
            {errors.password && (
              <p className="text-red-600 font-semibold">{errors.password}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="mt-2 w-fit flex gap-3 justify-center">
            <input
              type="checkbox"
              className="h-[24px] w-[24px]"
              required
            />
            <p className="text-[1rem]">I agree to the terms and conditions</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[16px] hover:brightness-125 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </ErrorBoundary>

      <div className="mt-8 h-[8rem] flex flex-col items-center">
        <p className="text-[1rem]">
          Already have an account?
          <span className="font-semibold cursor-pointer hover:font-bold">
            {" "}
            Log In
          </span>
        </p>
        <p className="m-3 text-[1.1rem]">OR</p>
        <div className="flex w-full justify-center items-center gap-2">
          <p className="text-[1rem] cursor-pointer hover:font-bold">
            Continue with Google
          </p>
          <FcGoogle className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
