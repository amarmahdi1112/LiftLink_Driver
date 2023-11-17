import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "./../../features/main/screen/splash.screen";
import { MainNavigator } from "./main.navigation";
import { AuthScreen } from "../../features/signin/auth.screen";

type StackNavigatorParams = {
  Splash: any;
  MainNavigation: any;
  Auth: any;
};

const Stack = createStackNavigator<StackNavigatorParams>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};
