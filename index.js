/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation-stack';

import {name as appName} from './app.json';
import {SplashScreen, HomeScreen} from './screens';

const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appName, () => App);
