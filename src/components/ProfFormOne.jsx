const ProfileOne = () => {

    return (
      <div className="w-full h-[100vh] bg-white px-[1.2rem]">
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
              //   onChange={handleChange}
              //   value={formData.firstname}
              type="text"
              name="firstname"
              id="firstname"
              className="w-full focus:outline-none border-b-2 h-[3.5rem] active:border-b-purple-400 px-2"
              required
            />
            {/* {errors.firstname && (
                  <p className="text-red-600 font-semibold">
                    {errors.firstname}
                  </p>
                )} */}
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
              //   onChange={handleChange}
              //   value={formData.lastname}
              type="text"
              name="lastname"
              id="lastname"
              className="w-full border-b-2 focus:outline-none h-[3.5rem] active:border-b-purple-400 px-2"
              required
            />
            {/* {errors.lastname && (
                  <p className="text-red-600 font-semibold">
                    {errors.lastname}
                  </p>
                )} */}
          </div>
        </div>

        {/* Email */}
        <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
          <label
            htmlFor="phone"
            className="font-semibold text-xl"
          >
            Phone
          </label>
          <input
            // onChange={handleChange}
            // value={formData.email}
            type="phone"
            name="phone"
            id="phone"
            className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
            required
          />
          {/* {errors.email && (
                <p className="text-red-600 font-semibold">{errors.email}</p>
              )} */}
        </div>

        {/* Password */}
        <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
          <label
            htmlFor="gender"
            className="font-semibold text-xl"
          >
            Gender
          </label>
          <select
            // value={formData.gender}
            // onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
           
          </select>
          {/* {errors.password && (
                <p className="text-red-600 font-semibold">{errors.password}</p>
              )} */}
        </div>
      </div>
    );
};

export default ProfileOne;
