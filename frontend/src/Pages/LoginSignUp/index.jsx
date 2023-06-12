import React, { useState } from 'react';
import './login.css'

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const LoginForm = () => {
    return (
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    );
  };

  const SignUpForm = () => {
    return (
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="email" placeholder="Email" />
        <button type="submit">Sign Up</button>
      </form>
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange('login')} className={activeTab === 'login' ? 'active' : ''}>
          Login
        </button>
        <button onClick={() => handleTabChange('signup')} className={activeTab === 'signup' ? 'active' : ''}>
          Sign Up
        </button>
      </div>

      <div>
        {activeTab === 'login' ? LoginForm() : SignUpForm()}
      </div>
    </div>
  );
};

export default LoginSignUp;