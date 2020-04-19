import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const PurpleBox = styled.View`
  background: #7159c1;
  height: 120px;
  width: 100%;
`;

export const BackGroundImage = styled.Image`
  border-radius: 8px;
  position: absolute;
  top: 30px;
  right: 20px;
  width: 90%;
`;

export const SubmitButton = styled(Button)`

  /* position: absolute;
  top: 560px;
  width: 90%;
  right: 20px; */
  margin: 10px 20px;
  background: #7159c1;
`;

export const CameraBox = styled.View`
    background: black;
    margin: 10px auto;
    width: 90%;
    border-radius: 4px;
    height: 44%;
`;

