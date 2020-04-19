import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';
import 'react-toastify/dist/ReactToastify.css';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const Wrapper = styled.div`
  height: 100%;
  background: #7e40e8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-height: 420px;
  max-width: 350px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 40px 25px;

  img {
    width: 260px;
    height: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      display: flex;
      font-weight: bold;
      padding: 10px 0;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      background: transparent;
      border: 2px solid #f4f4f4;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #797979;
      margin: 0 0 10px;

      &::placeholder {
        color: #d8d8d8;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7e40e8;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: 0.4s;

      &:hover {
        background: ${darken(0.09, '#7e40e8')};
      }

      .loading-icon {
        animation: ${rotate} 2s infinite;
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      transition: 0.4s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
