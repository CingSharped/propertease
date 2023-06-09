import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import "./login.css";
import { useSignup } from "../../hooks/useSignup"

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [userType, setUserType] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  

  const {login, loginError, loginIsLoading} = useLogin()
  const {signup, signupIsLoading, signupError} = useSignup()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)

    const user = JSON.parse(localStorage.getItem("user"));
    let userID
    try {
      userID = user.user_type
    } catch (error) {
      console.log("no user id")
    }

    userID ? navigate (`/${userID}`) : "" 
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    await signup(username, password, userType)

    const user = JSON.parse(localStorage.getItem("user"));
    let userID
    try {
      userID = user._id
    } catch (error) {
      console.log("no user id")
    }

    userID ? navigate (`/${userID}`) : "" 
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const LoginForm = () => {
    return (
      <>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-item-container">
          <div className="form-items">
            <input
              id="signupUsername"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text" 
              // placeholder="Username" 
              required/>
            <label className="input-label" htmlFor="signupUsername">Username</label>
          </div>
          <div className="form-items">
            <input
              id="signupPassword"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password" 
              // placeholder="Password" 
              required/>
            <label className="input-label" htmlFor="signupPassword">Password</label>
          </div>
        </div>
        <div className="sumbit-button">
          <button disabled={signupIsLoading} type="submit">Login</button>
        </div>
      </form>
        {!loginError && <div className="error"><br /></div>}
        {loginError && <div className="error">{loginError}</div>}
      </>
    );
  };

  const SignUpForm = () => {
    return (
      <>
      <form onSubmit={handleSignupSubmit}>
        <div className="form-item-container">
          <div className="form-items">
            <input
              id="signupUsername"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text" 
              // placeholder="Username" 
              required/>
              <span></span>
            <label className="input-label" htmlFor="signupUsername">Username</label>
          </div>
          <div className="form-items">
            <input
              id="signupPassword"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password" 
              // placeholder="Password" 
              required/>
              <span></span>
            <label className="input-label" htmlFor="signupPassword">Password</label>
          </div>
          <div className="form-items-select">
            <label htmlFor="signupUserType">User type   </label>
            <select
              id="signupUserType"
              onChange={(e) => {setUserType(e.target.value)}}
              value={userType}
              required
            >
              <option value=""></option>
              <option value="Landlord">Landlord</option>
              <option value="Tenant">Tenant</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>
        <div className="sumbit-button">
          <button disabled={signupIsLoading} type="submit">Sign Up</button>
        </div>
      </form>
        {!signupError && <div className="error"><br /></div>}
        {signupError && <div className="error">{signupError}</div>}
      </>
    );
  };

  return (
    <div className="login-signup">
      <div className="tab-container">
        <button
          onClick={() => handleTabChange("login")}
          className={activeTab === "login" ? "active-tab-buttons" : "tab-buttons"}
        >
          Login
        </button>
        <button
          // className="tab-buttons"
          onClick={() => handleTabChange("signup")}
          className={activeTab === "signup" ? "active-tab-buttons" : "tab-buttons"}
        >
          Sign Up
        </button>
      </div>
      {activeTab === "login" ? LoginForm() : SignUpForm()}
    </div>
  );
};

export default LoginSignUp;
