import React, {
  createContext,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
  useContext,
} from "react";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { GET_REQUESTS } from "../../query";
import { ACCEPT_REQUEST, REJECT_REQUEST } from "../../mutation";
import { GET_DEALERSHIP_REQUESTS } from "../../subscription";
import { ErrorContext } from "../../error/error.context";

interface ConfirmationContextProps {
  loading: boolean;
  confirmation: any; // Replace 'any' with the type of your confirmation
  setConfirmation: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the type of your confirmation
  rejectRequest: (args: { variables: { confirmationId: string } }) => Promise<any>;
  acceptRequest: (args: { variables: { confirmationId: string } }) => Promise<any>;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  resetAllConfirmation: () => void;
}

export const ConfirmationContext = createContext<
  Partial<ConfirmationContextProps>
>({});

export const ConfirmationProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const getRequests = useQuery(GET_REQUESTS, {
    fetchPolicy: "network-only",
  });
  const { data: { notifyDriver } = {} } = useSubscription(
    GET_DEALERSHIP_REQUESTS
  );
  const [loading, setLoading] = useState(false);
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [rejectRequest] = useMutation(REJECT_REQUEST);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { error, setError } = useContext(ErrorContext);

  const onRefresh = async () => {
    setConfirmation(null);
    setError(null);
    setLoading(true);
    try {
      setRefreshing(true);
      const {
        data: { getConfirmation },
      } = await getRequests.refetch();
      setConfirmation(getConfirmation);
    } catch (error: any) {
      setError(error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const resetAllConfirmation = () => {
    setConfirmation(null);
    setError(null);
    setLoading(false);
  }

  return (
    <ConfirmationContext.Provider
      value={{
        loading,
        confirmation,
        setConfirmation,
        acceptRequest: acceptRequest as any,
        rejectRequest: rejectRequest as any,
        refreshing,
        onRefresh,
        resetAllConfirmation,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
};
