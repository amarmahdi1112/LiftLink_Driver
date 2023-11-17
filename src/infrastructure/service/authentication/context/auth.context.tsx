import React, { useState, createContext, useEffect, FC } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Login, Logout, Signup, UPDATE_PHONE } from "../../mutation";
import { IS_AUTHENTICATED } from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  // Define the properties of the User object here
}

interface AuthContextProps {
  loading: boolean;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<any | null>>;
  user: User | null;
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  usernameError: boolean;
  setUsernameError: React.Dispatch<React.SetStateAction<boolean>>;
  passwordError: boolean;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: boolean;
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  phoneError: boolean;
  setPhoneError: React.Dispatch<React.SetStateAction<boolean>>;
  onSignup: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  firstName: string;
  setfirstName: React.Dispatch<React.SetStateAction<string>>;
  firstNameError: boolean;
  setfirstNameError: React.Dispatch<React.SetStateAction<boolean>>;
  lastName: string;
  setlastName: React.Dispatch<React.SetStateAction<string>>;
  lastNameError: boolean;
  setlastNameError: React.Dispatch<React.SetStateAction<boolean>>;
  updatePhoneMutation: (phone: string) => Promise<void>;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [login, { loading: loginLoading }] = useMutation(Login);
  const isAuthenticatedQuery = useQuery(IS_AUTHENTICATED);
  const [updatePhone] = useMutation(UPDATE_PHONE);
  const [logout] = useMutation(Logout);
  const [signup] = useMutation(Signup);
  const [screen, setScreen] = useState("signin");

  // Signup/Signin states and functions
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  // names
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState(false);

  const onLogin = async (username: string, password: string) => {
    if (usernameError || passwordError) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await login({ variables: { username, password } });
      setUser(data.login.user);
      await AsyncStorage.setItem("token", data.login.token);
      setIsAuthenticated(true);
      setLoading(loginLoading);
      return data;
    } catch (error: any) {
      setError(error);
      setLoading(false);
      console.log("error", error.message);
      throw error;
    }
  };

  const onSignup = async (
    username: string,
    password: string,
    email: string
  ) => {
    console.log({ username: username, password: password, email: email });
    if (usernameError || passwordError || emailError) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await signup({
        variables: {
          input: { username, password, email, accountType: "driver" },
        },
      });
      setUser(data.register.user);
      await AsyncStorage.setItem("token", data.register.token);
      setIsAuthenticated(true);
      setLoading(loginLoading);
      return data;
    } catch (error: any) {
      setError(error);
      setLoading(false);
      console.log("error", error.message);
    }
  };

  const onLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const {
          data: { isLoggedIn },
          error,
        } = await isAuthenticatedQuery.refetch();
        if (isLoggedIn) {
          setIsAuthenticated(true);
          setError(null);
        } else {
          setIsAuthenticated(false);
          setError(null);
          AsyncStorage.clear();
        }
        console.log("isLoggedIn######", isLoggedIn);
        if (error) {
          setIsAuthenticated(false);
          setError(error as any);
          console.log("error from auth", error.message);
        }
      }
    } catch (error: any) {
      setIsAuthenticated(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePhoneMutation = async (phone: string) => {
    try {
      const { data } = await updatePhone({
        variables: { phoneNumber: phone },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        setError,
        user,
        isAuthenticated,
        onLogin,
        onLogout,
        screen,
        setScreen,
        username,
        setUsername,
        password,
        setPassword,
        usernameError,
        setUsernameError,
        passwordError,
        setPasswordError,
        email,
        setEmail,
        emailError,
        setEmailError,
        phone,
        setPhone,
        phoneError,
        setPhoneError,
        onSignup,
        firstName,
        setfirstName,
        firstNameError,
        setfirstNameError,
        lastName,
        setlastName,
        lastNameError,
        setlastNameError,
        updatePhoneMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
