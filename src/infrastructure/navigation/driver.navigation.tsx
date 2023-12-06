import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DriverScreen } from "../../features/driver/driver.screen";

type StackNavigatorParams = {
  DriverProfile: any;
  MainNavigation: any;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export const DriverNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="DriverProfile" component={DriverScreen as any} />
    </Stack.Navigator>
  );
};