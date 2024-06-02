import React, { useState } from 'react';
import axios from 'axios';
import { Heading } from '../component/header';
import { SubHeading } from '../component/subheading';
import { Inputmain } from '../component/input';
import { Button } from '../component/Button';
import { useNavigate } from "react-router-dom"
import { Bottom } from '../component/bottom';
export function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="outline-none p-7 bg-white rounded shadow-lg rounded-lg">
        <Heading label="Sign-Up" />
        <SubHeading label="Enter your information to create account" />
        <Inputmain onChange={e => setFirstName(e.target.value)} label="First Name" placeholder="Roshan" type="text" />
        <Inputmain onChange={e => setLastName(e.target.value)} label="Last Name" placeholder="Sodhi" type="text" />
        <Inputmain onChange={e => setUsername(e.target.value)} label="Username" placeholder="roshan_singh" type="text" />
        <Inputmain onChange={e => setPassword(e.target.value)} label="Password" placeholder="roshan@1234" type="password" />
        <div className="pt-7">
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign up"} />
        </div>
        <Bottom label={"Already have an account?"} Text={"Sign In"} to="/signIn" />
      </div>
    </div>
  );
}
