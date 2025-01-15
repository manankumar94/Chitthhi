import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {BiPowerOff} from 'react-icons/bi';

function Logout() {
    const navigate= useNavigate();
    const handleClick= async () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}

export default Logout

const Button= styled.button `
background-color: #ff4d4d;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #e60000;
  }

  svg {
    font-size: 1 rem;
  }
`;