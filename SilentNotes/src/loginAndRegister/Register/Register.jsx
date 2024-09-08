import React, { useCallback, useEffect, useState } from "react";
import "../CustomInputField/CustomInputPlaceholderStyle.css";
import "../../animations.css";
import axios from "axios";
import debounce from "lodash.debounce";
import UsernameInputComponent from "./UsernameInputComponent";
import { toast } from "react-toastify";
import CollegeDetailsInput from "./CollegeDetailsInput";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsPasswordFieldActive }) => {
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [email, setEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [isValidCollegeEmail, setisValidCollegeEmail] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(-2); //-1 = not available, 1 means available, -2 means username not entered and 0 means loading
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordActive, setPasswordActive] = useState(false);
  const [confirmPasswordActive, setConfirmPasswordActive] = useState(false);
  const [loadingCollege, setCollegeLoading] = useState(false);
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();

  const getCollegeDetails = useCallback(
    debounce((collegeName) => {
      setCollegeLoading(true);
      axios({
        url:
          import.meta.env.VITE_BACKEND +
          "/colleges/" +
          collegeName.split(" ").join("+"),
      })
        .then((res) => {
          setCollegeDetails(res.data);
        })
        .then((res) => setCollegeLoading(false))
        .catch((err) => setCollegeLoading(false));
    }, 500),
    []
  );

  const checkIfUsernameIsAvailable = useCallback(
    debounce((username) => {
      if (username.length >= 3) {
        axios({
          url: import.meta.env.VITE_BACKEND + "/user/isAvailable/" + username,
        })
          .then((res) => {
            setIsUsernameAvailable(res.data.isAvailable ? 1 : -1);
          })
          .catch((e) => setIsUsernameAvailable(false));
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (collegeName.trim().length > 3) {
      getCollegeDetails(collegeName.trim());
    } else setCollegeDetails(null);
  }, [collegeName]);

  useEffect(() => {
    if (username.trim()) {
      setIsUsernameAvailable(0);
      checkIfUsernameIsAvailable(username.trim());
    } else setIsUsernameAvailable(-2);
  }, [username]);

  useEffect(() => {
    setIsPasswordFieldActive(false);
  }, []);

  useEffect(() => {
    setIsPasswordFieldActive(passwordActive || confirmPasswordActive);
  }, [passwordActive, confirmPasswordActive]);

  return (
    <>
      {!isValidCollegeEmail && (
        <CollegeDetailsInput
          goToNext={() => {
            if (!collegeDetails) {
              toast.error("Please select a valid college.");
              return;
            }
            let isValidEmail = false;
            collegeDetails.forEach((details) => {
              details.domains.forEach((domain) => {
                if (email.endsWith(domain)) {
                  isValidEmail = true;
                  setCollegeName(details.name);
                }
              });
            });
            if (isValidEmail) setisValidCollegeEmail(true);
            else toast.error("Invalid email Id.");
          }}
          setCollegeDetails={setCollegeDetails}
          collegeName={collegeName}
          setCollegeName={setCollegeName}
          email={email}
          setEmail={setEmail}
          collegeDetails={collegeDetails}
          loading={loadingCollege}
        />
      )}

      {isValidCollegeEmail && !showPasswordPage && (
        <UsernameInputComponent
          goToNext={() => {
            if (isUsernameAvailable) {
              setShowPasswordPage(true);
            } else toast.error("Please choose an unique username.");
          }}
          isUsernameAvailable={isUsernameAvailable}
          avatar={avatar}
          setAvatar={setAvatar}
          username={username}
          setUsername={setUsername}
        />
      )}

      {showPasswordPage && (
        <PasswordInput
          register={() => {
            if (!password || !confirmPassword) {
              toast.warn("Password and confirm password can't be empty.");
              return;
            }
            if (password !== confirmPassword) {
              toast.warn("Password and confirm password do not match.");
              return;
            }
            setRegistering(true);
            axios({
              url: import.meta.env.VITE_BACKEND + "/user/register",
              withCredentials: true,
              method: "POST",
              "Content-type": "application/json",
              data: {
                username: username,
                password: password,
                college: collegeName.trim(),
                avatar: avatar.trim(),
                email: email.trim().toLowerCase(),
              },
            })
              .then(({ data }) => {
                toast.success(data.message);
                navigate("/");
                window.location.reload();
                setRegistering(false);
              })
              .catch(({ response }) => {
                setRegistering(false);
                toast.error(response.data.error || "Something went wrong.");
              });
          }}
          registering={registering}
          setPasswordActive={setPasswordActive}
          setConfirmPasswordActive={setConfirmPasswordActive}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
    </>
  );
};

export default Register;
