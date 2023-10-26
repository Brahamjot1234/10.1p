import React, { useState } from 'react';
import './bottom.css';

const BottomSection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const subscribe = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail.com$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please enter a valid Gmail address.');
      return;
    }

    fetch('http://localhost:4000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email }),
    })
      .then((response) => {
        if (response.ok) {
          setError('Email sent successfully');
          setEmail('');
        } else {
          setError('Email not sent');
          setEmail('');
        }
      })
      .catch((error) => {
        setError('Error occurred while sending email');
        console.error(error);
      });
  };

  return (
    <div className="signup">
      <p>Sign Up for Daily Insider</p>
      <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={subscribe}>SUBSCRIBE</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BottomSection;
