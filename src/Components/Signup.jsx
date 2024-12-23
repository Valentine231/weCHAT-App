import React, { useState } from 'react';
import supabase from '../SupabaseClient';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        
      });
      console.log(data, error);

      if (error) {
        console.error('Error signing up:', error.message);
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Signup successful! Check your email for a confirmation link.');
        navigate('/login'); // Redirect to login after successful signup
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handlesignup}
          className="p-6 rounded-lg shadow-lg bg-white w-96"
        >
          <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default Signup;
