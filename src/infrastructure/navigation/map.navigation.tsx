import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../../features/navigation_service/map.screen";

type StackNavigatorParams = {
  MapScreen: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export const MapNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
