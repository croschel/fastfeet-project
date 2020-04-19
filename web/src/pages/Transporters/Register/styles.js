import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  margin: 0 auto;
  width: 50%;
  padding: 20px;
`;

export const HeadButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  > div {
    display: flex;
    flex-direction: row;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 6px;
      width: 120px;
      border: none;
      color: #fff;
    }

    #back-button {
      background: #cccccc;
      margin-right: 15px;
    }
    #done-button {
      background: #7e40e9;
    }
  }
`;

export const Content = styled.div`
  background: transparent;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const FormRegister = styled.div`
  background: #fff;
  padding: 15px;
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const AvatarInput = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px dashed #c1c1c1;
      background: transparent;
    }
    input {
      display: none;
    }
  }
`;

export const InputForm = styled.div`
  div {
    display: flex;
    flex-direction: column;

    &:first-child {
      margin-bottom: 20px;
    }

    label {
      font-weight: bold;
      padding: 10px 0;
    }

    input {
      height: 36px;
      border: 1px solid #d6d6d6;
      padding: 5px;
      border-radius: 4px;

      &:last-of-type {
        margin-bottom: 10px;
      }
    }
  }
`;
