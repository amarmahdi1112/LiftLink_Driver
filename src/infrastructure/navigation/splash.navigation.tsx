import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { AuthNavigator } from "./signin.navigation";
import { MainNavigator } from "./main.navigation";
import { Splash } from "../../features/main/screen/splash.screen";

type StackNavigatorParams = {
  Splash: undefined;
  MainNavigation: undefined;
  AuthNavigation: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

export const SplashNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
      {/* <Stack.Screen name="AuthNavigation" component={AuthNavigator} /> */}
    </Stack.Navigator>
  );
};