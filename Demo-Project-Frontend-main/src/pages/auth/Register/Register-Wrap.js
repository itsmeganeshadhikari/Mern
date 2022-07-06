import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
export const RegisterWrap = styled.div`
  height: 100vh;
  background: url('/images/vuexy-login-bg.jpg');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: black;
    text-align: center;
    font-weight: 500;
  }
  .error {
    color: red;
    font-size: 0.75rem;
    font-weight: lighter;
  }
  .form {
    border: none;
    background-color: #fff;
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);

    @media (max-width: 500px) {
      margin-top: 1rem;
      width: 80%;
    }
    @media (min-width: 760px) {
      width: 40%;
    }
    @media (min-width: 800px) {
      width: 25%;
    }
    .form-control {
      /* width: 100%; */
      padding: 1rem;
      border-radius: 5px;
      .input-field {
        width: 100%;
      }
      #role {
        padding: 1rem;
      }
    }
    #register-btn {
      margin-top: 1rem;
      width: 100%;
      margin-top: 5px;
      padding: 1rem;
    }
    .bottom-link {
      text-decoration: none;
    }
  }
`

export const BottomLink = styled(Link)`
  padding: 0.5rem;
  text-decoration: none;
  transition: 0.9s;
  border-radius: 5px;
  &:hover {
    text-decoration: underline;
  }
`
