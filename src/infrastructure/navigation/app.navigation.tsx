import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from './../../features/main/screen/splash.screen';
import { MainNavigator } from './main.navigation';
import { AuthScreen } from '../../features/signin/auth.screen';
import { AuthContext } from '../service/authentication/context/auth.context';

type AuthStackParams = {
  Splash: undefined;
  Auth: undefined;
};

type MainStackParams = {
  MainNavigation: undefined;
};

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  // Replace these with actual loading and auth status
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Splash navigation={null} />;
  }

  return (
    <>
      {isAuthenticated ? (
        <MainStack.Navigator initialRouteName='MainNavigation' screenOptions={{
          headerShown: false
        }}>
          <MainStack.Screen name="MainNavigation" component={MainNavigator} />
          <AuthStack.Screen name="Auth" component={AuthScreen} />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName='Auth' screenOptions={{
          headerShown: false
        }}>
          <AuthStack.Screen name="Auth" component={AuthScreen} />
        </AuthStack.Navigator>
      )}
    </>
  );
};