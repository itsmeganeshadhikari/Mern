import styled from 'styled-components'

export const LoginWrap = styled.div`
  height: 100vh;
  background-color: aliceblue;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: black;
    text-align: center;
    font-weight: 500;
  }
  .form {
    border: none;
    background-color: #fff;
    padding: 3rem 3rem 3rem;
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    width: 20%;

    @media (max-width: 500px) {
      width: 60%;
    }

    .form-control {
      /* width: 100%; */
      padding: 1rem;
      border-radius: 5px;
      .input-field {
        width: 100%;
      }
    }
    #login-btn {
      margin-top: 1rem;
      width: 100%;
      margin-top: 5px;
      padding: 1rem;
    }
  }
`
