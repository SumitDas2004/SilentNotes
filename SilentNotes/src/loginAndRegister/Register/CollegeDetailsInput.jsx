import React from "react";
import RippleButton from "../../RippleButton/RippleButton";
import CustomInputField from "../CustomInputField/CustomInputField"
import { ClipLoader } from "react-spinners";
const CollegeDetailsInput = ({ goToNext, email, setEmail, collegeName, setCollegeName, loading, collegeDetails }) => {
  return (
    <>
      <div className="h-max w-9/12 mb-5 relative">
        <span className="inline-block w-full relative">
          <input
            list="list"
            onChange={(e) => setCollegeName(e.target.value)}
            value={collegeName}
            required
            style={{ boxShadow: "0px 2px #E07A5F" }}
            type="text"
            className="text-base w-full pl-2 outline-none bg-transparent text-textcolor"
          />
          {loading && <span className="inline-block absolute -ml-4">
          <ClipLoader size="15px" color="gray"/></span>}
          <span className=" duration-300 transition-all placeholder px-3 left-0 absolute -z-10 text-gray-400">
            Enter college name
          </span>
        </span>
            <datalist id="list">
              {!loading && collegeDetails && collegeDetails.map((college, ind)=><option key={ind} value={college.name}>{college.name}</option>)}
            </datalist>
      </div>
      <CustomInputField
        placeholder={"College email"}
        setInputFieldState={setEmail}
        inputFieldState={email}
      />
      <RippleButton
        value={"Next"}
        onMouseDown={() => {
            goToNext()
        }}
      />
    </>
  );
};

export default CollegeDetailsInput;
