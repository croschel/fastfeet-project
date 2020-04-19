import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const PurpleBox = styled.View`
  background: #7159c1;
  height: 120px;
`;

export const ProblemDescription = styled.TextInput`
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  padding: 10px;
  margin: 0 20px;
  height: 400px;
  background: #fff;
  position: absolute;
  top: 20px;
  right: 2px;
  width: 90%;
`;
export const SubmitButton = styled(Button)`
  background: #7159c1;
  margin: 0 30px;
  position: absolute;
  top: 440px;
  width: 90%;
  right: -8px;
`;
