import React from 'react';
import { Heading } from '../component/header';
import { SubHeading } from '../component/subheading';
import { Inputmain } from '../component/input'
import { Bottom } from '../component/bottom';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '../component/Button';
import { useNavigate } from "react-router-dom"
export function Signin(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="outline-none p-7 bg-white rounded shadow-lg rounded-lg">
        <Heading label="Sign-In" />
        <SubHeading label="Enter your information to excess your account" />
        <Inputmain onChange={e => setUsername(e.target.value)} label="Email" placeholder="roshansingh@gmail.com" type="text"/>
        <Inputmain onChange={e => setPassword(e.target.value)} label="password" placeholder="roshan@1234" type="password"/>
        <div className="pt-7">
          <Button
        onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign In"} />
            </div>
        <Bottom label={"Don't have an account?"} Text={"Sign up"} to="/signup" />
      </div>
    </div>
    )
}