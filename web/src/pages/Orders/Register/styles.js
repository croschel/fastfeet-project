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

export const Selects = styled.div`
  display: flex;

  div {
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    &:first-of-type {
      margin-right: 30px;
    }

    label {
      display: flex;
      font-weight: bold;
      padding: 10px 0;
    }
    select {
      width: 100%;
      background: transparent;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
      color: #a1a1a1;
      height: 36px;
      padding: 5px;
    }
  }
`;

export const InputProduct = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;

  label {
    display: flex;
    font-weight: bold;
    padding: 10px 0;
  }

  input {
    height: 36px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    color: #a1a1a1;
    padding: 5px;
  }
`;

export const FormRegister = styled.div`
  background: #fff;
  padding: 15px;
  width: 100%;
  border-radius: 4px;
  margin: 0 auto;

  &:first-child {
    margin: 0 auto;
  }
`;
