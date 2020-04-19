import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import Details from '~/pages/Details';
import CreateProblem from '~/pages/Problems/Create';
import VisualizeProblem from '~/pages/Problems/Visualize';
import Confirm from '~/pages/Problems/Confirm';
import Profile from '~/pages/Profile';

export default (signedIn = false) => createAppContainer(
  createSwitchNavigator({
    Sign: createSwitchNavigator({
      SignIn,
    }),
    App: createBottomTabNavigator(
      {
        Deliveries: {
          screen: createStackNavigator({
            Dashboard,
            Details,
            CreateProblem,
            VisualizeProblem,
            Confirm,
          },
            {
              defaultNavigationOptions: {

                headerLeftContainerStyle: {
                  marginLeft: 20,
                  alignContent: 'center',
                }
              }
            }
          ),
          navigationOptions: {
            tabBarVisible: true,
            tabBarLabel: 'Entregas',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="reorder" size={30} color={tintColor} />
            )
          }
        },
        Profile,
      },
      {
        resetOnBlur: true,
        tabBarOptions: {
          keyboardHidesTabBar: false,
          activeTintColor: '#7159c1',
          inactiveTintColor: 'rgba(100, 100, 100, 0.6)',
          style: {
            backgroundColor: '#FFF',
            height: 50,
            elevation: 1,
            padding: 5
          }
        }
      }
    )
  },
    {
      initialRouteName: signedIn ? 'App' : 'Sign'
    }
  )
)