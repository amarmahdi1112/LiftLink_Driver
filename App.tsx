import 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { ThemeProvider } from "styled-components";
import { Navigator } from "./src/infrastructure/navigation/index.navigation";
import { theme } from "./src/infrastructure/theme";
import { useFonts } from "expo-font";
import { SafeAreaComponent } from "./src/components/utils/safearea.component";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppRegistry, View } from "react-native";
import { AuthProvider } from "./src/infrastructure/service/authentication/context/auth.context";
import { ValetProvider } from "./src/infrastructure/service/valet/context/valet.context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { DriverProvider } from "./src/infrastructure/service/driver/context/driver.context";
import { ConfirmationProvider } from "./src/infrastructure/service/confirmation/context/confirmation.context";
import { OrdersProvider } from "./src/infrastructure/service/orders/context/orders.context";
import { useCallback } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";

const tunnel = false;

const wsLink: any = new GraphQLWsLink(
  createClient({
    url: tunnel
      ? "ws://178.128.224.133/graphql/"
      : "ws://213c-2001-56a-f994-2300-c181-a2c5-b9a3-5496.ngrok-free.app/graphql",
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("token");
      return {
        Authorization: token ? `JWT ${token}` : "",
      };
    },
    shouldRetry: (error) => {
      return true;
    },
  })
);

const httpLink = createHttpLink({
  uri: tunnel
    ? "http://178.128.224.133/graphql/"
    : "https://213c-2001-56a-f994-2300-c181-a2c5-b9a3-5496.ngrok-free.app/graphql/",
});

const authLink = setContext(async (request, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  credentials: "include",
});

export default function App() {
  const [loaded] = useFonts({
    "PPAgrandir-Regular": require("./assets/fonts/Agrandir/PPAgrandir-Regular.otf"),
    "PPAgrandir-WideLight": require("./assets/fonts/Agrandir/PPAgrandir-WideLight.otf"),
    "PPAgrandir-GrandHeavy": require("./assets/fonts/Agrandir/PPAgrandir-GrandHeavy.otf"),
    "PPMori-ExtraLight": require("./assets/fonts/PPMori/PPMori-Extralight.otf"),
    "PPMori-SemiBold": require("./assets/fonts/PPMori/PPMori-SemiBold.otf"),
    "PPMori-Regular": require("./assets/fonts/PPMori/PPMori-Regular.otf"),
    "Neue-bold": require("./assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayBold.ttf"),
    "Neue-medium": require("./assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayMediu.ttf"),
    "Neue-black": require("./assets/fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayBlack.ttf"),
  });

  const onLayout = useCallback(async () => {
    if (loaded) {

      await ExpoSplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <SafeAreaComponent>
            <AuthProvider>
              <DriverProvider>
                <ConfirmationProvider>
                  <OrdersProvider>
                    <ValetProvider>
                      <GestureHandlerRootView style={{ flex: 1 }}>
                        <Navigator />
                      </GestureHandlerRootView>
                    </ValetProvider>
                  </OrdersProvider>
                </ConfirmationProvider>
              </DriverProvider>
            </AuthProvider>
          </SafeAreaComponent>
        </ThemeProvider>
      </ApolloProvider >
    </View >
  );
}

AppRegistry.registerComponent("App", () => App);
