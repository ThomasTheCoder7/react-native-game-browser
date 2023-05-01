import { View } from "react-native";
import Login from "./profileComponents/Login";
import Signup from "./profileComponents/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useEffect } from "react";

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 2000,
    damping: 1800,
    mass: 5,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.1,

  },
};



export default () => {

  return (

      <Stack.Navigator initialRouteName="Login" theme={DarkTheme} screenOptions={{ headerShown: false, detachPreviousScreen: false }} >
        <Stack.Screen name="Login" component={Login} options={{
          cardStyle: { backgroundColor: '#181920' },
          presentation: 'modal'
        }}
        />
        <Stack.Screen name="Signup" component={Signup} options={{
          transitionSpec: {
            open: config, close: config
          },
          cardStyle: { backgroundColor: '#181920' },
          presentation: 'modal'
        }} />
      </Stack.Navigator>

  );
};
