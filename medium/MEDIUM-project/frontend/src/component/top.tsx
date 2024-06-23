import { SignIpInput, SignupInput } from "@vanshnpm/medium-commonn";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Top = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput | SignIpInput>(
    type === "signup"
      ? { name: "", username: "", password: "" }
      : { username: "", password: "" }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  async function sendresponse() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error in Signin/Signup")
      console.error("Error during sign up/sign in:", e);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">
            {type === "signup" ? "Create an account" : "Sign in to your account"}
          </div>
          <div className="text-slate-400">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
          <div className="mt-4">
            {type === "signup" && (
              <LabelInput
                label="Name"
                name="name"
                placeholder="jethalal"
                onChange={handleChange}
              />
            )}
            <div className="pt-5">
              <LabelInput
                label="Username"
                name="username"
                type="email"
                placeholder="jethalal@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="pt-5">
              <LabelInput
                label="Password"
                name="password"
                type="password"
                placeholder="jetha@1234"
                onChange={handleChange}
              />
            </div>
            <div className="pt-5">
              <button
                onClick={sendresponse}
                type="button"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-5 py-2.5 mt-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelInputProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelInput = ({ label, name, placeholder, onChange, type = "text" }: LabelInputProps) => {
  return (
    <div className="pt-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black font-bold text-base"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
