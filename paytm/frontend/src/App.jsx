import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./allpage/Signuppage";
import { Signin } from "./allpage/Signinpage";
import { Dashboard } from "./allpage/dashboard";
import { SendMoney } from "./allpage/transfer";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
