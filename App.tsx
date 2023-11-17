/* eslint-disable space-before-function-paren */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-tabs */
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
import { AppRegistry } from "react-native";
import { AuthProvider } from "./src/infrastructure/service/authentication/context/auth.context";
import { ValetProvider } from "./src/infrastructure/service/valet/context/valet.context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocketLink } from "apollo-link-ws";
import { DriverProvider } from "./src/infrastructure/service/driver/context/driver.context";
// import { DriverProfileProvider } from "./src/infrastructure/service/driver/context/driver.profile.context";
import { ConfirmationProvider } from "./src/infrastructure/service/confirmation/context/confirmation.context";
import { OrdersProvider } from "./src/infrastructure/service/orders/context/orders.context";
// import { SERVER_URL } from "@env";

// AsyncStorage.clear();
const tunnel = true;

const wsLink: any = new GraphQLWsLink(
  createClient({
    url: tunnel
      ? "ws://178.128.224.133/graphql/"
      : "ws://172.20.10.2:8000/graphql/",
    on: {
      connected: () => console.log("ws connected"),
      error: (e) => console.log("ws error", e),
      closed: () => console.log("ws closed"),
      connecting: () => console.log("ws connecting"),
      ping: () => console.log("ws ping"),
      pong: () => console.log("ws pong"),
    },
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("token");
      return {
        Authorization: token ? `JWT ${token}` : "",
      };
    },
    shouldRetry: (error) => {
      console.log("ws shouldRetry", error);
      return true;
    },
  })
);

const httpLink = createHttpLink({
  uri: tunnel
    ? "http://178.128.224.133/graphql/"
    : "http://172.20.10.2:8000/graphql/",
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

  if (!loaded) {
    return null;
  }

  if (wsLink.subscriptionClient?.client?.readyState === WebSocket.OPEN) {
    console.log("WebSocket is connected");
  } else {
    console.log("WebSocket is not connected");
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SafeAreaComponent>
          <AuthProvider>
            <DriverProvider>
              {/* <DriverProfileProvider> */}
              <ConfirmationProvider>
                <OrdersProvider>
                  <ValetProvider>
                    <Navigator />
                  </ValetProvider>
                </OrdersProvider>
              </ConfirmationProvider>
              {/* </DriverProfileProvider> */}
            </DriverProvider>
          </AuthProvider>
        </SafeAreaComponent>
      </ThemeProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
