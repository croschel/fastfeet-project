import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`;


export const Image = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-bottom: 50px;
`;

export const Content = styled.View`
  align-self:stretch;
`;

export const Info = styled.View`
  margin-bottom: 15px;
`;

export const TextLabel = styled.Text`
  color: rgba(100,100,100,0.8);
`;

export const Text = styled.Text`
  font-size: 26px;
  font-weight: bold;
`;

export const LogoutButton = styled(Button)`
  align-self: stretch;
  background: red;
  margin-top: 20px;
`;