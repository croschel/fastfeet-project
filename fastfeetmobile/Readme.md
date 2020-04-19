# Mobile-App

## Instructions

**This Application was only tested on Android**
- The App was made for transporters from anywhere that want to work for fastfeet;
- Open the App and you will can sign In with a id of valid transporter
- If everything the transporter exists you will get on Dashboard with some options;

## Bottom Navigation

### Entregas 

- Always when you press here you will go to Dashboard;

### Meu Perfil

- You will see some data from this logged transporter

## Dashboard

- It is the heart of this application where you can see a list of all pending or delivered orders for logged transporter and you can press details for more options.

## Detalhes da Encomenda

- Here you will see two boxes with some instructions like recipient data and status order;
- If the order that you pressed it is pending you will see an options inside of `situação de entrega` and if you press, mean that you withdrew the product that corresponding of this order. If you already have done this, the button will disappear;
- In the bottom of Content you will see three buttons with some options:
  - Inform Problem;
  - Visualize Problem;
  - Confirm Delivery.]

## Informar Problema

- You can add a problem for this order

## Visualizar Problemas

- You will see the product name on top and a list of problems that maybe exist for this order. Obs: Transporters can be changed in process.

## Confirmar Entrega

- The first time that you open this Application the operational system will ask you if you agree about using your camera to take photos, you have to press `OK`;
- After this you will use your camera to take the photo of signature of client. Obs: Don't worry about the orientation `react-native-camera` will put all the pictures in one pattern.
- After you have taken the photo you will press `enviar` and finally finish the process. The application will send you to Dashboard with a success message.