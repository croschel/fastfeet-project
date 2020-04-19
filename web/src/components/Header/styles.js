import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
`;

export const Content = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px;
  max-width: 1180px;

  .selected-page {
    color: #000;
    text-shadow: 1px 2px 20px #000000;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 230px;
      height: 40px;
      padding-right: 15px;
      border-right: 1px solid #e9e9e9;
    }

    a {
      padding: 10px;
      font-weight: bold;
      color: #a9a9a9;

      &:first-of-type {
        margin-left: 15px;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    strong {
      color: #797979;
      margin-bottom: 5px;
      font-size: 16px;
    }
    button {
      color: #ff0f10;
      font-size: 14px;
      background: transparent;
      border: none;
    }
  }
`;
