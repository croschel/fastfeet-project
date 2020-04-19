import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';


export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background: #7e40e8;
`;


export const Form = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 20px
`;

export const SubmitButton = styled(Button)`
  background: #83bf18;
`;
