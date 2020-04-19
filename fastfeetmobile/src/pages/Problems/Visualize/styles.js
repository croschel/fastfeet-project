import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Title = styled.Text`
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  background: #7159c1;
  color: #fff;
  text-align: center;
`;

export const ProblemList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  position: absolute;
  top: 70px;
  width: 100%;
`;

export const Problem = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  padding: 5px;
  margin: 10px 20px;
  background: #fff;
  min-height: 60px;
`;

export const TextProblem = styled.Text`
  justify-content: flex-end;
  color: rgba(80,80,80,0.6);
  font-size: 16px;
  width: 78%;
  text-align: justify;
`;

export const DateProblem = styled.Text`
  font-size: 12px;
  color: rgba(120,120,120,0.4);
  margin: 5px;
  
`;

export const BoxPurple = styled.View`
  background: #7159c1;
  height: 40px;
`;