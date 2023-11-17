import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen } from "../../features/navigation_service/map.screen";

type StackNavigatorParams = {
  MapScreen: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

export const MapNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
