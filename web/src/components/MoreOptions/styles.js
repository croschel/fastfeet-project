import styled from 'styled-components';

export const Container = styled.ul`
  padding: 5px;
  text-align: center;
  position: relative;
`;

export const MoreButton = styled.button`
  border: none;
  background: transparent;
  position: flex;
`;

export const MoreList = styled.div`
  z-index: 1;
  top: 35px;
  position: absolute;
  min-width: 110px;
  max-width: 500px;
  left: calc(50% - 60px);
  background: #fff;
  border: transparent;
  border-radius: 4px;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;

  box-shadow: -1px 0px 29px 5px rgba(0, 0, 0, 0.75);

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }
`;

export const Options = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  button {
    border: 0;
    background: none;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
    display: flex;
    svg {
      margin-right: 5px;
    }
    &:last-child {
      border-bottom: none;
    }
`;
