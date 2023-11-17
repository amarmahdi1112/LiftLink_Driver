import React from "react";
import { AppNavigator } from "./app.navigation";
import { NavigationContainer } from "@react-navigation/native";

export const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};