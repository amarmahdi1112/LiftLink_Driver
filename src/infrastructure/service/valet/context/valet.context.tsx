import React, {
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
  useContext,
} from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  CREATE_VALET,
  REQUEST_MEMBERSHIP,
  SEND_LOCATION,
  START_VALET,
} from "../../mutation";
import {
  VALET_EXISTS,
  GET_STARTED_VALET,
  FIND_DEALERSHIP,
  GET_PENDING_CONFIRMATION,
} from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isObjEmpty } from "../../../../features/main/screen/main.screen";
import { ErrorContext } from "../../error/error.context";

interface ValetContextProps {
  screen: string;
  exists: boolean;
  loading: boolean;
  userType: string;
  valetData: any;
  startedValet: any;
  selectedValet: any;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  valetExists: any;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  onStartValet: (state: string, valetId: string, inputs?: any) => Promise<any>;
  onCreateValet: (inputs: any) => Promise<any>;
  onValetExists: (orderId: string) => Promise<void>;
  setStartedValet: React.Dispatch<React.SetStateAction<any>>;
  onChangeLocation: ({
    valetId,
    latitude,
    longitude,
  }: {
    valetId: string;
    latitude: number;
    longitude: number;
  }) => Promise<void>;
  setSelectedValet: React.Dispatch<React.SetStateAction<any>>;
  onGetStartedValet: () => Promise<void>;
  resetAllValet: () => void;
  onSearchDealership: (searchTerm: string) => Promise<void>;
  searchResults: any[];
  selectedDealership: any;
  setSelectedDealership: React.Dispatch<React.SetStateAction<any>>;
  onRequestMembership: (dealershipName: string) => Promise<void>;
  onGetPendingConfirmation: () => Promise<void>;
  pendingConfirmations: any[];
  setPendingConfirmations: React.Dispatch<React.SetStateAction<any[]>>;
  selectedPendingConfirmation: any;
  setSelectedPendingConfirmation: React.Dispatch<React.SetStateAction<any>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [startValet] = useMutation(START_VALET);
  const findDealerships = useQuery(FIND_DEALERSHIP);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDealership, setSelectedDealership] = useState({} as any);
  const [requestMembership] = useMutation(REQUEST_MEMBERSHIP);
  const [sendLocation] = useMutation(SEND_LOCATION);
  const [valetData, setValetData] = useState({});
  const valetExists = useQuery(VALET_EXISTS);
  const [exists, setExists] = useState(false);
  const [isError, setIsError] = useState(false);
  const { error, setError } = useContext(ErrorContext);
  const [userType, setUserType] = useState("dealership");
  const getPendingConfirmation = useQuery(GET_PENDING_CONFIRMATION);
  const [pendingConfirmations, setPendingConfirmations] = useState<any>([]);
  const [selectedPendingConfirmation, setSelectedPendingConfirmation] =
    useState<any>({});

  const getAllStartedValets = useQuery(GET_STARTED_VALET, {
    fetchPolicy: "network-only",
  });

  const onValetExists = async (orderId: any) => {
    try {
      await valetExists.refetch({ orderId: orderId }).then(({ data }) => {
        setExists(data.valetExists);
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onCreateValet = async (inputs: any) => {
    isError && setIsError(false);
    try {
      await onValetExists(inputs.orderId);
      if (exists) {
        setError("Valet already exists");
        return;
      }
      const { data } = await createValet({ variables: { inputs: inputs } });
      setValetData(data.createValet);
      return data;
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setIsError(true);
    }
  };

  const onStartValet = async (state: any, valetId: any, inputs: any) => {
    setStartLoading(true);
    isError && setIsError(false);
    try {
      const { data } = await startValet({
        variables: { state, valetId, inputs },
      });

      if (!isObjEmpty(data) && !isObjEmpty(data.updateValet)) {
        setStartedValet(data.updateValet);
      }
      return data;
    } catch (error: any) {
      setError(error.message);
      setIsError(true);
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
        setError("No started valets found");
      }
    } catch (error: any) {
      setError(`Failed to fetch started valets: ${error.message}`);
    }
  };

  const onSearchDealership = async (searchTerm: any) => {
    try {
      const { data } = await findDealerships.refetch({
        searchTerm: searchTerm,
      });
      setSearchResults(data.findDealerships);
    } catch (error: any) {
      setError(error.message);
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
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onRequestMembership = async (dealershipName: string) => {
    try {
      await requestMembership({
        variables: {
          dealershipName,
        },
      });
      const filteredResults = searchResults.filter(
        (result: any) => result.dealershipName !== dealershipName
      );
      setSearchResults(filteredResults);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onGetPendingConfirmation = async () => {
    try {
      const { data, error } = await getPendingConfirmation.refetch();
      setPendingConfirmations(data.getPendingConfirmations);
      if (error) {
        setError(error.message);
      }
    } catch (error: any) {
      setError(error.message);
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
        screen,
        exists,
        loading,
        isError,
        userType,
        valetData,
        valetExists,
        startedValet,
        selectedValet,
        searchResults,
        selectedDealership,
        pendingConfirmations,
        selectedPendingConfirmation,
        setScreen,
        setIsError,
        setUserType,
        onStartValet,
        onCreateValet,
        onValetExists,
        resetAllValet,
        setStartedValet,
        onChangeLocation,
        setSelectedValet,
        onGetStartedValet,
        onSearchDealership,
        onRequestMembership,
        setSelectedDealership,
        setPendingConfirmations,
        onGetPendingConfirmation,
        setSelectedPendingConfirmation,
      }}
    >
      {children}
    </ValetContext.Provider>
  );
};
