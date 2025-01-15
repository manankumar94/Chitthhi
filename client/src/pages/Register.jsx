import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes.js';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    style: {
      backgroundColor: '#2e3440',
      color: '#d08770',
      padding: '10px',
      borderRadius: '10px',
    },
    progressStyle: {
      background: '#bf616a',
    },
  };

  useEffect(() => {
    if (localStorage.getItem('Chitthi-User')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem('Chitthi-User', JSON.stringify(data.newUser));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const { username, password, confirmPassword, email } = values;
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password should match.', toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error('Username must be longer than 3 characters.', toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error('Password must be longer than 4 characters.', toastOptions);
      return false;
    } else if (email === "") {
      toast.error('Email is Required', toastOptions);
      return false;
    } 
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Container>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <img src={Logo} alt="Logo" />
              <h1>Chitthi</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <button type="submit">Register</button>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </FormContainer>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #131324; /* Matches the background from Login */
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(19, 19, 36, 0.9); /* Semi-transparent dark color */
  border-radius: 1.5rem;
  padding: 2rem 6rem;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      img {
        height: 10rem;
        width: 10rem;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 6px 15px rgba(255, 255, 255, 0.2); /* Soft glow around logo */
      }

      h1 {
        color: #ffffff; /* White text to match the dark theme */
        font-size: 2rem;
        text-transform: capitalize;
        margin: 0;
        font-family: 'Chitthi', sans-serif;
        font-weight: 600;
      }
    }

    input {
      background-color: #262636; /* Slightly lighter than background */
      color: #ffffff;
      padding: 1rem ;
      border: 0.1rem solid #4e4e7e; /* Subtle border */
      border-radius: 0.7rem;
      font-size: 1rem;
      transition: 0.3s ease;

      &::placeholder {
        color: #a3a3bf; /* Muted text for placeholders */
      }

      &:focus {
        border-color: #6c63ff; /* Accent color for focus */
        outline: none;
        box-shadow: 0 0 5px #6c63ff;
      }
    }

    button {
      background-color: #6c63ff;
      color: white;
      padding: 1rem;
      border: none;
      font-weight: bold;
      font-size: 1rem;
      border-radius: 0.7rem;
      text-transform: uppercase;
      transition: 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: #504ed7; /* Slightly darker on hover */
      }
    }

    span {
      text-align: center;
      font-size: 1rem;
      color: #ffffff; /* Matches the overall theme */

      a {
        color: #6c63ff; /* Accent color for links */
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Register;
