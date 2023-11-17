import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DriverScreen } from "../../features/driver/driver.screen";

type StackNavigatorParams = {
  DriverProfile: any;
  MainNavigation: any;
};

const Stack = createStackNavigator<StackNavigatorParams>();

export const DriverNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverProfile" component={DriverScreen as any} />
    </Stack.Navigator>
  );
};