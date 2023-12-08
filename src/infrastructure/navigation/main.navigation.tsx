import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { SettingsScreen } from "../../features/main/screen/settings.screen";
import { TermsScreen } from "../../features/main/screen/terms.screen";
import { SecurityScreen } from "../../features/main/screen/security.screen";
import { ProfileScreen } from "../../features/main/screen/profile.screen";
import { DealershipScreen } from "../../features/main/screen/dealership.screen";
import { PendingRequestDetails } from "../../features/main/screen/pending.request.details.screen";
import { PendingRequestsScreen } from "../../features/main/screen/pending.requests.screen";
import { AuthScreen } from "../../features/signin/auth.screen";

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

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
      <OrderConfirmationProvider>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
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
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Security" component={SecurityScreen} />
          <Stack.Screen name="ProfileSettings" component={ProfileScreen} />
          <Stack.Screen name="FindDealerships" component={DealershipScreen} />
          <Stack.Screen name="PendingRequests" component={PendingRequestsScreen} />
          <Stack.Screen name="PendingRequestDetails" component={PendingRequestDetails} />
          <Stack.Screen name="Auth" component={AuthScreen} />
        </>
      </Stack.Navigator>
    </OrderConfirmationProvider>
  );
};
