import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ValetScreen } from "../../features/valet/screens/valet.screen";
import { HomeScreen } from "../../features/main/screen/home.screen";

type StackNavigatorParams = {
  ValetScreen: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export const ValetNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ValetScreen" component={ValetScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
