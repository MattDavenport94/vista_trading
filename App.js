import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SearchScreen from './src/screens/SearchScreen';
import SignalScreen from './src/screens/SignalScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './src/context/authContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExampleScreen from './src/screens/ExampleScreen';


const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen
    }),
    mainFlow: createBottomTabNavigator({
      Home: HomeScreen,
      Signal: SignalScreen,
      Search: SearchScreen,
      Settings: SettingsScreen,
    })
});
//const Tab = createBottomTabNavigator();

//export default function App() {
  //return (
    //<NavigationContainer>
      //<Tab.Navigator>
        //<Tab.Screen name="Home" component={HomeScreen} />
        //<Tab.Screen name="Signal" component={SignalScreen} />
        //<Tab.Screen name="Search" component={SearchScreen} />
        //<Tab.Screen name="Settings" component={SettingsScreen} />
      //</Tab.Navigator>
    //</NavigationContainer>
  //);
//}

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  );
};