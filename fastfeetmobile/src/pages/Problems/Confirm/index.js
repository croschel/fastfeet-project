import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, Text, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';
import api from '~/services/api';
import { Container, PurpleBox, SubmitButton, CameraBox } from './styles';

export default function Confirm({ navigation }) {
  // States
  const [signature, setSignature] = useState();

  // get order from Details
  const order = navigation.getParam('order');

  // Take Picture and Save on Server
  async function takePicture(camera) {
    const options = {
      quality: 0.5,
      base64: true,
      pauseAfterCapture: true,
      forceUpOrientation: true,
      fixOrientation: true,
    };
    if (order.start_date === null) {
      Alert.alert("Erro operacional", "Retire essa encomenda na Fastfeet")
      return;
    }
    const data = await camera.takePictureAsync(options);

    // Catch file from camera
    const formData = new FormData();
    formData.append('file', {
      uri: data.uri,
      type: 'image/jpg',
      name: data.uri,
    });
    const signature = await api.post('signatures', formData);
    setSignature(signature.data.id);
  };

  // Finish the order updating end_date
  async function handleSubmit() {
    try {
      if (order.start_date === null) {
        Alert.alert("Erro operacional", "Retire essa encomenda na Fastfeet")
        return;
      }
      await api.put(`/transporter/${order.transporter_id}/ordered/${order.id}`, { signature_id: signature });
      Alert.alert("Pedido Entregue com sucesso");
      navigation.navigate("Dashboard");
    } catch (err) {
      Alert.alert("Erro operacional", "Assinatura não cadastrada")
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <PurpleBox />
      <CameraBox>
        <RNCamera
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') {
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'lightgreen',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>Waiting</Text>
                </View>);
            }
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => takePicture(camera)} >
                  <Icon name="camera-alt" size={50} color="#000" />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </CameraBox>
      {/* <BackGroundImage onPress={() => { }} source={backImage} /> */}
      <SubmitButton onPress={() => handleSubmit()}><Text>Enviar</Text></SubmitButton>
    </Container>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
  headerTintColor: "#FFF",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: '#7159c1',
    elevation: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#FFF" />
    </TouchableOpacity>
  ),
})
