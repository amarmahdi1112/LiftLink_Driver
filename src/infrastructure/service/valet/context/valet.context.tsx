import React, {
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CREATE_VALET, SEND_LOCATION, START_VALET } from "../../mutation";
import { VALET_EXISTS, GET_STARTED_VALET } from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isObjEmpty } from "../../../../features/main/screen/main.screen";

interface ValetContextProps {
  error: any | null;
  screen: string;
  exists: boolean;
  loading: boolean;
  userType: string;
  valetData: any; // Replace 'any' with the type of your valetData
  startedValet: any; // Replace 'any' with the type of your startedValet
  selectedValet: any; // Replace 'any' with the type of your selectedValet
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  valetExists: any; // Replace 'any' with the type of your valetExists
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  onStartValet: (state: string, valetId: string, inputs?: any) => Promise<void>; // Replace 'any' with the type of your inputs
  onCreateValet: (inputs: any) => Promise<void>; // Replace 'any' with the type of your inputs
  onValetExists: (orderId: string) => Promise<void>;
  setStartedValet: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the type of your startedValet
  onChangeLocation: ({
    valetId,
    latitude,
    longitude,
  }: {
    valetId: string;
    latitude: number;
    longitude: number;
  }) => Promise<void>;
  setSelectedValet: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the type of your selectedValet
  onGetStartedValet: () => Promise<void>;
  resetAllValet: () => void;
}

export enum ValetStatus {
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  CUSTOMER_VEHICLE_PICK_UP = "CUSTOMER_VEHICLE_PICK_UP",
  CUSTOMER_VEHICLE_DROP_OFF = "CUSTOMER_VEHICLE_DROP_OFF",
  VALET_VEHICLE_PICK_UP = "VALET_VEHICLE_PICK_UP",
  VALET_VEHICLE_DROP_OFF = "VALET_VEHICLE_DROP_OFF",
  DEALERSHIP_TO_CUSTOMER_STARTED = "DEALERSHIP_TO_CUSTOMER_STARTED",
  DEALERSHIP_TO_CUSTOMER_COMPLETED = "DEALERSHIP_TO_CUSTOMER_COMPLETED",
  CUSTOMER_TO_DEALERSHIP_STARTED = "CUSTOMER_TO_DEALERSHIP_STARTED",
  CUSTOMER_TO_DEALERSHIP_COMPLETED = "CUSTOMER_TO_DEALERSHIP_COMPLETED",
  CUSTOMER_RETURN_STARTED = "CUSTOMER_RETURN_STARTED",
  CUSTOMER_RETURN_COMPLETED = "CUSTOMER_RETURN_COMPLETED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const ValetContext = createContext<ValetContextProps>(null as any);

interface Location {
  valetId: string;
  latitude: number;
  longitude: number;
}

export const ValetProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [screen, setScreen] = useState("details");
  const [startedValet, setStartedValet] = useState({});
  const [startLoading, setStartLoading] = useState(false);
  const [selectedValet, setSelectedValet] = useState({});
  const [createValet, { loading }] = useMutation(CREATE_VALET);
  const [startValet, { data: startValetData }] = useMutation(START_VALET);
  const [sendLocation] = useMutation(SEND_LOCATION);
  const [valetData, setValetData] = useState({});
  const valetExists = useQuery(VALET_EXISTS);
  const [exists, setExists] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("dealership");
  const getAllStartedValets = useQuery(GET_STARTED_VALET, {
    fetchPolicy: "network-only",
  });

  const onValetExists = async (orderId: any) => {
    try {
      await valetExists.refetch({ orderId: orderId }).then(({ data }) => {
        setExists(data.valetExists);
      });
    } catch (error: any) {
      setError(error);
      throw error;
    }
  };

  const onCreateValet = async (inputs: any) => {
    inputs.userType = userType;
    try {
      await onValetExists(inputs.orderId);
      if (exists) {
        throw new Error("Valet already started");
      }
      const { data } = await createValet({ variables: { inputs: inputs } });
      setValetData(data.createValet);
      // await AsyncStorage.setItem("valet", JSON.stringify(valetData));
    } catch (error) {
      // console.log("error from start valet", error);
      throw error;
    }
  };

  const onStartValet = async (state: any, valetId: any, inputs = null) => {
    setStartLoading(true);
    try {
      const { data } = await startValet({
        variables: { state, valetId, inputs },
      });

      if (!isObjEmpty(data) && !isObjEmpty(data.updateValet)) {
        setStartedValet(data.updateValet);
      } else {
        throw new Error("No valet data found");
      }
    } catch (error: any) {
      throw error;
    } finally {
      setStartLoading(false);
    }
  };

  const onGetStartedValet = async () => {
    try {
      const {
        data: { getAllStartedDriverValets },
      } = await getAllStartedValets.refetch();
      if (
        !isObjEmpty(getAllStartedDriverValets) &&
        getAllStartedDriverValets.length > 0
      ) {
        setStartedValet(getAllStartedDriverValets[0]);
      } else {
        throw new Error("No started valets found");
      }
    } catch (error: any) {
      setError(`Failed to fetch started valets: ${error.message}`);
    }
  };

  const onChangeLocation = async ({
    valetId,
    latitude,
    longitude,
  }: Location) => {
    try {
      await sendLocation({
        variables: {
          valetId: valetId,
          latitude: latitude,
          longitude: longitude,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const resetAllValet = () => {
    setScreen("details");
    setStartedValet({});
    setSelectedValet({});
    setValetData({});
    setExists(false);
    setError("");
    setUserType("dealership");
  };
  
  return (
    <ValetContext.Provider
      value={{
        error,
        screen,
        exists,
        loading,
        userType,
        valetData,
        startedValet,
        selectedValet,
        setScreen,
        valetExists,
        setUserType,
        onStartValet,
        onCreateValet,
        onValetExists,
        setStartedValet,
        onChangeLocation,
        setSelectedValet,
        onGetStartedValet,
        resetAllValet,
      }}
    >
      {children}
    </ValetContext.Provider>
  );
};
