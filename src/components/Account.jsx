/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useState, useEffect } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';

const Account = ({ onLogin }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authenticatedUser) {
        try {
          const userResponse = await fetch('/api/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authenticatedUser.token}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await userResponse.json();
          setAuthenticatedUser({ ...authenticatedUser, ...userData });

          const checkedOutResponse = await fetch(`/api/user/${authenticatedUser.id}/checked-out`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authenticatedUser.token}`,
            },
          });

          if (!checkedOutResponse.ok) {
            throw new Error('Failed to fetch checked-out books');
          }

          const checkedOutData = await checkedOutResponse.json();
          setCheckedOutBooks(checkedOutData);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchUserData();
  }, [authenticatedUser]);

  const handleLogin = (userData) => {
    setAuthenticatedUser(userData);
    if (onLogin) {
      onLogin(userData);
    }
  };

  const handleCheckout = async () => {
    try {
      // Simulate a successful response for demonstration purposes
      const fakeSuccessfulResponse = { ok: true };
      if (!fakeSuccessfulResponse.ok) {
        throw new Error('Failed to checkout the book');
      }

      // Update checked-out books after successful checkout
      const checkedOutResponse = await fetch(`/api/user/${authenticatedUser.id}/checked-out`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authenticatedUser.token}`,
        },
      });

      if (!checkedOutResponse.ok) {
        throw new Error('Failed to fetch checked-out books');
      }

      const checkedOutData = await checkedOutResponse.json();
      setCheckedOutBooks(checkedOutData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReturn = async () => {
    try {
      // Simulate a successful response for demonstration purposes
      const fakeSuccessfulResponse = { ok: true };
      if (!fakeSuccessfulResponse.ok) {
        throw new Error('Failed to return the book');
      }

      // Update checked-out books after successful return
      const checkedOutResponse = await fetch(`/api/user/${authenticatedUser.id}/checked-out`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authenticatedUser.token}`,
        },
      });

      if (!checkedOutResponse.ok) {
        throw new Error('Failed to fetch checked-out books');
      }

      const checkedOutData = await checkedOutResponse.json();
      setCheckedOutBooks(checkedOutData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="account-container">
      {authenticatedUser ? (
        <div>
          <h2 className="account-header">Welcome, {authenticatedUser.username}!</h2>
          <div className="checked-out-container">
            <h3 className="account-header">Checked Out Books</h3>
            {checkedOutBooks.length === 0 ? (
              <p>No books currently checked out.</p>
            ) : (
              <ul className="checked-out-list">
                {checkedOutBooks.map((book) => (
                  <li key={book.id} className="checked-out-item">
                    <div className="checked-out-title">
                      {book.title} - {book.author}
                    </div>
                    <button className="return-button" onClick={handleReturn}>
                      Return
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="checkout-container">
            <h3 className="account-header">Checkout a Book</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout Book 1
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="account-info">
            Please log in or create an account to view your account details.
          </p>
          <Login onLogin={handleLogin} />
          <p className="account-info">
            Do not have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      )}
    </div>
  );
};

Account.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Account;