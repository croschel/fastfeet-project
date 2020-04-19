import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Crimson+Text&display=swap');

  background: transparent;
  max-width: 910px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 30px 0;
    font-size: 22px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    color: #707070;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
    height: 25px;

    &::placeholder {
      color: #bfbfbf;
      padding: 5px;
      text-align: center;
    }
  }
  button {
    background: #7d5ce8;
    border-radius: 4px;
    height: 25px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${darken(0.04, '#7d5ce8')};
    color: #ffffff;
    font-weight: bold;

    #addButton {
      margin-right: 3px;
    }
  }
`;
export const OrdersTable = styled.table`
  background: transparent;
  border-collapse: collapse;

  #options-size {
    width: 150px;
  }

  tbody {
    font-family: 'Crimson Text', serif;
    tr {
      background: #fff;
      border-radius: 40px;
      border: 2px solid #f5f5f5;
      border-bottom-width: 10px;

      &:first-child {
        border-top-width: 15px;
      }

      td {
        padding: 15px 0;
        text-align: center;

        p {
          display: flex;
          border-radius: 40%;
          justify-content: center;
          align-items: center;
          width: 110px;
          height: 20px;
          margin: auto auto;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
`;

export const OrderView = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #fff;
  width: 500px;

  padding: 20px;
  border-radius: 4px;
  top: 30%;
  right: 40%;
  box-shadow: 0px 0px 0px 99999px rgba(0, 0, 0, 0.75);

  label {
    font-weight: bold;
  }

  .date-label {
    margin-top: 10px;
  }

  .info-box {
    display: flex;
    flex-direction: column;
    position: relative;

    padding: 10px 0;

    p {
      padding: 2px 0;
    }
  }
`;
