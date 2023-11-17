import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import { OrderConfirmationProvider } from "../service/confirmation/context/order.confirmation.context";
import { HomeScreen } from "../../features/main/screen/home.screen";
import { DriverNavigation } from "./driver.navigation";
import { MainScreen } from "../../features/main/screen/main.screen";
import { ConfirmationScreen } from "../../features/main/screen/confirmation.screen";
import { OrderConfirmationScreen } from "../../features/main/screen/order.confirmation.screen";
import { ConfirmedOrdersScreen } from "../../features/main/screen/confirmed.orders.screen";
import { ValetNavigation } from "./valet.navigation";
import { MapNavigator } from "./map.navigation";

type StackNavigatorParams = {
  Main: any;
  Home: any;
  Profile: any;
  Confirm: any;
  ConfirmOrder: any;
  ConfirmedOrders: any;
  Valet: any;
  Map: any;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const Txt = styled.Text`
  color: red;
`;

export const MainNavigator: React.FC = () => {
  return (
    <OrderConfirmationProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={DriverNavigation} />
          <Stack.Screen name="Confirm" component={ConfirmationScreen} />
          <Stack.Screen
            name="ConfirmOrder"
            component={OrderConfirmationScreen}
          />
          <Stack.Screen
            name="ConfirmedOrders"
            component={ConfirmedOrdersScreen}
          />
          <Stack.Screen name="Valet" component={ValetNavigation} />
          <Stack.Screen name="Map" component={MapNavigator} />
        </>
      </Stack.Navigator>
    </OrderConfirmationProvider>
  );
};
