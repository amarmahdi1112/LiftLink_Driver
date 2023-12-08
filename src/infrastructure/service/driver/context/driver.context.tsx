import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  PropsWithChildren,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../query";
import { isObjEmpty } from "../../../../features/main/screen/main.screen";
import { ErrorContext } from "../../error/error.context";

export interface DriverContextProps {
  profile: any; // Replace 'any' with the type of your profile
  setProfile: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the type of your profile
  loading: boolean;
  onGetUserData: () => Promise<void>;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  resetAllDriver: () => void;
}

export const DriverContext = createContext<DriverContextProps>(null as any);

export const screens = {
  profile: "profile",
  license: "license",
  names: "names",
};

export const DriverProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [screen, setScreen] = useState("license");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const getUserData = useQuery(GET_USER_INFO, {
    fetchPolicy: "network-only",
  });
  const { error, setError } = useContext(ErrorContext);

  // const importUserData = async () => {
  //   if (!loadingDriver && data) {
  //     const profilePicture =
  //       Object.keys(data.getUserInfo.profilePicture).length > 0
  //         ? data.getUserInfo.profilePicture[0]
  //         : {};
  //     console.log(data);
  //     data.getUserInfo.car ?? (data.getUserInfo.car = {});
  //     const modifiedUserInfo = { ...data.getUserInfo, profilePicture };
  //     setProfile(modifiedUserInfo);
  //   }
  // };

  const onGetUserData = async () => {
    setLoading(true);
    try {
      const { data: {
        getUserInfo
      } } = await getUserData.refetch();
      if (!isObjEmpty(getUserInfo)) {
        setProfile(getUserInfo);
      } else {
        throw new Error("No user data found");
      }
    } catch (error: any) {
      setError(`Failed to fetch user data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetAllDriver = () => {
    setProfile({});
    setLoading(true);
    setError(null);
  };

  // useEffect(() => {
  //   if (data) {
  //     importUserData();
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (errorDriver) {
  //     // console.error(errorDriver);
  //   }
  // }, [errorDriver]);

  // useEffect(() => {
  //   setLoading(loadingDriver);
  // }, [loadingDriver]);

  return (
    <DriverContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        onGetUserData,
        screen,
        setScreen,
        resetAllDriver,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
