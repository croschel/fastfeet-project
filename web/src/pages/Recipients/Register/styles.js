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

export const InputForm = styled.div`
  .first-line-input {
    display: grid;
    grid-template-columns: 1fr;
  }

  .second-line-input {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    grid-column-gap: 20px;
  }

  .third-line-input {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
  }
  div {
    display: grid;

    label {
      font-weight: bold;
      padding: 10px 0 5px 0;
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
