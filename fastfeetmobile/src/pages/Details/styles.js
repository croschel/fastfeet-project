import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #FFF;
`;

export const Content = styled.View`
  flex: 1;
  background: #FFF;
  padding: 20px;
`;

export const PurpleBox = styled.View`
  background: #7159c1;
  height: 120px;
`;

export const DeliveryInformation = styled.View`
  border: 1px solid #FFF;
  border-radius: 4px;
  background: #FFF;
  padding: 5px 10px;
  right: 20px;
  position: absolute;
  top: -120px;
  width: 100%;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleLeft = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 5px;
  color: #7159c1;
`;

export const Information = styled.View`
  padding: 8px 0;
`;

export const TextLabel = styled.Text`
  margin-bottom: 2px;
  font-weight: bold;
  color: rgba(80,80,80,0.6);
`;

export const TextInfo = styled.Text`
  font-size: 16px;
  color: rgba(50,50,50,0.8);
`;

export const OrderStatus = styled.View`
  border: 1px solid #FFF;
  border-radius: 4px;
  background: #FFF;
  padding: 0 10px 5px 10px;
  margin-top: 15px;
  position: absolute;
  top: 115px;
  width: 100%;
  right: 20px;
`;

export const GetProduct = styled(RectButton)`
  flex-direction: column;
  align-items:center;
  margin: 5px 5px 0 0;
  display: ${props => props.visible ? 'flex' : 'none'};
`;

export const DateInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  position: absolute;
  top: 305px;
  right: 20px;
  border-radius: 4px;
`;

export const ButtonOption = styled.TouchableOpacity`
  border: 1px solid #f1f1f1;
  padding: 5px 10px ;
  align-items: center;
  width: 33.5%;
`;