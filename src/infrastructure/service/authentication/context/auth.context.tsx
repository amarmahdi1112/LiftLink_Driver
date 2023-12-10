import React, {
  useState,
  createContext,
  useEffect,
  FC,
  useContext,
} from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADD_LICENSE,
  CHANGE_PASSWORD,
  Login,
  Logout,
  Signup,
  UPDATE_EMAIL,
  UPDATE_NAME,
  UPDATE_PHONE,
  UPDATE_USERNAME,
  UPLOAD_PROFILE_PICTURE,
} from "../../mutation";
import { IS_AUTHENTICATED } from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadToFirebase } from "../../../../../firebase-config";
import { DriverContext } from "../../driver/context/driver.context";
import { ErrorContext } from "../../error/error.context";
import { isObjEmpty } from "../../../../features/main/screen/main.screen";

interface User {
  // Define the properties of the User object here
}

interface AuthContextProps {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin: (username: string, password: string) => Promise<void>;
  onLogout: () => Promise<any>;
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  onChangeEmail: (email: string) => Promise<void>;
  onChangeUsername: (username: string) => Promise<void>;
  onUpdateProfilePicture: (pictureLink: string) => Promise<void>;
  updateNames: (firstName: any, lastName: any) => Promise<any>;
  addLicense: ({
    licenseImageBack,
    licenseImageFront,
    licenseExpiration,
    licenseState,
    licenseNumber,
  }: any) => Promise<any>;
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
  ) => Promise<any>;
  firstName: string;
  setfirstName: React.Dispatch<React.SetStateAction<string>>;
  firstNameError: boolean;
  setfirstNameError: React.Dispatch<React.SetStateAction<boolean>>;
  lastName: string;
  setlastName: React.Dispatch<React.SetStateAction<string>>;
  lastNameError: boolean;
  setlastNameError: React.Dispatch<React.SetStateAction<boolean>>;
  updatePhoneMutation: (phone: string) => Promise<void>;
  resetAll: () => void;
  logOutCalled: boolean;
  setLogOutCalled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<any>("");
  const [login, { loading: loginLoading }] = useMutation(Login);
  const isAuthenticatedQuery = useQuery(IS_AUTHENTICATED);
  const [updatePhone] = useMutation(UPDATE_PHONE);
  const [signup] = useMutation(Signup);
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const [changeEmail] = useMutation(UPDATE_EMAIL);
  const [changeUsername] = useMutation(UPDATE_USERNAME);
  const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE);
  const [createLicense] = useMutation(ADD_LICENSE);
  const [screen, setScreen] = useState("signin");
  const [progress, setProgress] = useState(0);

  // Signup/Signin states and functions
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [logOutCalled, setLogOutCalled] = useState(false);

  // names
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState(false);
  const [updateName] = useMutation(UPDATE_NAME);
  const { profile, setProfile, onGetUserData } = useContext(DriverContext);
  const { setError } = useContext(ErrorContext);

  const onLogin = async (username: string, password: string) => {
    if (usernameError || passwordError) {
      return;
    }
    setLoading(true);
    try {
      let _username;
      let _email;
      if (username!.includes("@")) {
        _email = username;
      } else {
        _username = username;
      }
      const { data } = await login({
        variables: {
          username: _username,
          email: _email,
          password,
        },
      });
      setUser(data.login.user);
      await AsyncStorage.setItem("token", data.login.token);
      setIsAuthenticated(true);
      setLoading(loginLoading);
      return data;
    } catch (error: any) {
      setError("Invalid username or password");
      setLoading(false);
      throw error;
    }
  };

  const onSignup = async (
    username: string,
    password: string,
    email: string
  ) => {
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
      setError("There was an error, please try again");
      setLoading(false);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      setIsAuthenticated(false);
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
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
          if (isObjEmpty(profile)) {
            await onGetUserData();
          }
          setError("");
        } else {
          setIsAuthenticated(false);
          setError("");
          AsyncStorage.clear();
        }
        if (error) {
          setIsAuthenticated(false);
          setError("There was an error, please try again");
        }
      }
    } catch (error: any) {
      setIsAuthenticated(false);
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const updatePhoneMutation = async (phone: string) => {
    setLoading(true);
    try {
      const { data } = await updatePhone({
        variables: { phoneNumber: phone },
      });
      return data;
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (oldPassword: string, newPassword: string) => {
    setLoading(true);
    try {
      const { data } = await changePassword({
        variables: { oldPassword, newPassword },
      });
      return data;
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const onChangeEmail = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await changeEmail({
        variables: { newEmail: email },
      });
      return data;
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const onChangeUsername = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await changeUsername({
        variables: { newUsername: username },
      });
      return data;
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const onUpdateProfilePicture = async (imageObject: any) => {
    setLoading(true);
    const imageKey = `object_${Object.keys(imageObject).length - 1}`;
    const fileName = imageObject.substring(imageObject.lastIndexOf("/") + 1);
    try {
      const data = await uploadToFirebase(
        imageObject,
        `profiles/${fileName}`,
        (progress: any) => {
          setProgress(progress);
        }
      );

      const {
        data: { updateProfilePicture },
      } = await uploadProfilePicture({
        variables: {
          pictureLink: data.url,
        },
      });
      await onGetUserData();
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const addLicense = async ({
    licenseImageBack,
    licenseImageFront,
    licenseExpiration,
    licenseState,
    licenseNumber,
  }: any) => {
    setLoading(true);
    try {
      const fileName = licenseImageFront.substring(
        licenseImageFront.lastIndexOf("/") + 1
      );
      const frontImg = await uploadToFirebase(
        licenseImageFront,
        `driverLicense/${fileName}`,
        (progress: any) => {
          setProgress(progress);
        }
      );

      const fileName2 = licenseImageBack.substring(
        licenseImageBack.lastIndexOf("/") + 1
      );

      const backImg = await uploadToFirebase(
        licenseImageBack,
        `driverLicense/${fileName2}`,
        (progress: any) => {
          setProgress(progress);
        }
      );

      const { data } = await createLicense({
        variables: {
          licenseImageBack: backImg.url,
          licenseImageFront: frontImg.url,
          licenseExpiration,
          licenseState,
          licenseNumber,
        },
      });
    } catch (error: any) {
      setError("There was an error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const updateNames = async (firstName: any, lastName: any) => {
    try {
      const { data } = await updateName({
        variables: { firstName, lastName },
      });
      let _profile = { ...profile } as any;
      _profile.firstName = firstName;
      _profile.lastName = lastName;
      setProfile(_profile);
      return data.updateName;
    } catch (error) {}
  };

  const resetAll = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setPhone("");
    setfirstName("");
    setlastName("");
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    setPhoneError(false);
    setfirstNameError(false);
    setlastNameError(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuthenticated,
        setIsAuthenticated,
        onLogin,
        onLogout,
        logOutCalled,
        setLogOutCalled,
        onChangePassword,
        onChangeEmail,
        onChangeUsername,
        onUpdateProfilePicture,
        updateNames,
        addLicense,
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
        resetAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
