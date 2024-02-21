/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from 'react';
import PropTypes from 'prop-types';
import './../index.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const loginEndpoint = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login';

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      const userData = await response.json();
      onLogin(userData);
    } catch (error) {
      console.error(error.message);
      // Handle login error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginFormSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;