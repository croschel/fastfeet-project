import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex:1;
  padding: 0 15px;
  background: #FFF;
`;

export const Header = styled.View`
  padding: 20px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 5px;
`;

export const LeftHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Welcome = styled.View`
  flex-direction: column;
  width: 67%;
`;

export const LogoutButton = styled(Button)`
  background: transparent;
  align-items: center;
`;

export const Text = styled.Text`
  color: rgba(100,100,100,0.8);
  font-size: 14px;
`;

export const TextName = styled.Text`
  font-size: 24px;
`;

export const TitleOptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const Options = styled.View`
  flex-direction: row;
`;

export const TextLink = styled.Text`
  font-size: 14px;
  color: rgba(100,100,100,0.8);
  font-weight: bold;
`;

export const Content = styled.ScrollView``;

export const Delivery = styled.View`
  border: 1px solid rgba(200,200,200,0.6);
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const TitleDelivery = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
`;

export const TextDelivery = styled.Text`
  font-size: 16px;
  color: #7159c1;
  font-weight: bold;
  margin-left: 10px;
`;

export const Status = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 0;
`;

export const StatusLine = styled.View`
  position: absolute;
  border: 1px solid #7159c1;
  width: 65%;
  left: 60px;
  top: 15px;
`;

export const StatusInfo = styled.Text`
  text-align: center;
  font-size: 10px;
  color: rgba(100,100,100,0.8);
`;

export const BallInfo = styled.View`
  width: 10px;
  height: 10px;
  border: 1px solid #7159c1;
  border-radius: 5px;
  background: ${props => props.done ? '#7159c1' : '#fff'};
`;

export const BottomInfo = styled.View`
  background: rgba(230,230,230,0.3);
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding: 15px 0;
`;

export const GroupInfo = styled.View``;

export const TextLabel = styled.Text`
  font-size: 12px;
  color: rgba(100,100,100,0.8);
`;

export const BottomInfoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Details = styled.Text`
  color: #7159c1;
  font-weight: bold;
  
`;