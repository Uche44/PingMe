const ProfileTwo = ({ formData, setFormData, errors, setErrors }) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-purple-700 mt-[3rem] mb-[2rem]">
        Upload Image
      </h2>
      <div className="h-fit mt-2 w-full flex flex-col items-start gap-2">
        <label
          htmlFor="pfp"
          className="font-semibold text-xl"
        >
          Profile Image
        </label>
        <input
          // onChange={handleChange}
          value={formData.pfp}
          type="file"
          name="pfp"
          id="pfp"
          className="w-full h-[7rem] border-2 px-2 focus:outline-none"
          required
        />
        {errors.pfp && (
          <p className="text-red-600 font-semibold">{errors.pfp}</p>
        )}
      </div>

      <div className="h-fit w-full flex flex-col items-start gap-2 mt-4">
        <label
          htmlFor="bio"
          className="font-semibold text-xl"
        >
          Bio
        </label>
        <textarea
          //   onChange={handleChange}
          value={formData.bio}
          type="text"
          name="bio"
          id="bio"
          className="w-full focus:outline-none border-b-2 h-[3.5rem] active:border-b-purple-400 px-2"
          required
        ></textarea>
      </div>
    </>
  );
};

export default ProfileTwo;
