import React, { useState } from "react";

import { useLogin } from "../../hooks/useLogin";
import "./login.css";
import { useSignup } from "../../hooks/useSignup"

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {login, loginError, loginIsLoading} = useLogin()
  const {signup, signupIsLoading, signupError} = useSignup()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    await signup(username, password, email, userType)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const LoginForm = () => {
    return (
      <form onSubmit={handleLoginSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text" 
          placeholder="Username" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password" 
          placeholder="Password" />
        <button disabled={loginIsLoading} type="submit">Login</button>
        {loginError && <div className="error">{loginError}</div>}
      </form>
    );
  };

  const SignUpForm = () => {
    return (
      <form onSubmit={handleSignupSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text" 
          placeholder="Username" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password" 
          placeholder="Password" />
        <input 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email" 
          placeholder="Email" />
        <select
          onChange={(e) => {setUserType(e.target.value)}}
          value={userType}
        >
          <option value=""></option>
          <option value="landlord">Landlord</option>
          <option value="tenant">Tenant</option>
        </select>
        <button type="submit">Sign Up</button>
        {signupError && <div className="error">{signupError}</div>}
      </form>
    );
  };

  return (
    <div>
      <div>
        <button
          onClick={() => handleTabChange("login")}
          className={activeTab === "login" ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => handleTabChange("signup")}
          className={activeTab === "signup" ? "active" : ""}
        >
          Sign Up
        </button>
      </div>

      <div>{activeTab === "login" ? LoginForm() : SignUpForm()}</div>
    </div>
  );
};

export default LoginSignUp;
