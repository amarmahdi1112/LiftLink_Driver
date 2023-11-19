import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  FC,
  PropsWithChildren,
} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CONFIRM_ORDER, REJECT_ORDER } from "../../mutation";
import { GET_CONFIRMED_ORDERS, GET_STARTED_VALET } from "../../query";
// import { ValetContext } from "../../valet/context/valet.context";

export interface OrderConfirmationContextProps {
  order: any; // Replace 'any' with the type of your order
  selectedOrder: any; // Replace 'any' with the type of your selectedOrder
  setSelectedOrder: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the type of your selectedOrder
  onConfirmOrder: (assignId: string) => Promise<any>; // Replace 'any' with the type of the return value of onConfirmOrder
  onDeclineOrder: (assignId: string) => Promise<any>; // Replace 'any' with the type of the return value of onDeclineOrder
  onGetConfirmedOrders: () => Promise<void>;
  confirmedOrders: any[]; // Replace 'any' with the type of your confirmedOrders
  loading: boolean;
  incrementPage: () => void;
  error: Error | null;
  // onRefresh: () => Promise<void>;
}

export const OrderConfirmationContext =
  createContext<OrderConfirmationContextProps>(null as any);

export const OrderConfirmationProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [confirmOrder, { loading: confirmOrderLoading }] =
    useMutation(CONFIRM_ORDER);
  const [declineOrder, { loading: declineOrderLoading }] =
    useMutation(REJECT_ORDER);
  const getConfrmedOrders = useQuery(GET_CONFIRMED_ORDERS, {
    fetchPolicy: "network-only",
  });
  const [order, setOrder] = useState(null);
  const [confirmedOrders, setConfirmedOrders] = useState<
    { order: any; assignId: any }[]
  >([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 3,
  });
  const [error, setError] = useState(null);
  // const { setselectedValet } = useContext(ValetContext);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const onConfirmOrder = async (assignId: any) => {
    setLoading(true);
    try {
      const { data } = await confirmOrder({
        variables: { assignId },
      });
      setOrder(data.confirmOrder);
      setLoading(confirmOrderLoading);
      return data;
    } catch (error: any) {
      setError(error.message);
      return;
    }
  };

  const onDeclineOrder = async (assignId: any) => {
    setLoading(true);
    try {
      const { data } = await declineOrder({
        variables: { assignId },
      });
      setOrder(data.declineOrder);
      setLoading(declineOrderLoading);
      return data;
    } catch (error: any) {
      setError(error.message);
      return;
    }
  };

  const onGetConfirmedOrders = async () => {
    setLoading(true);
    if (confirmedOrders.length === 0) {
      setPagination({
        page: 1,
        perPage: 10,
      });
    }
    try {
      const { data, error } = await getConfrmedOrders.refetch({
        ...pagination,
      });
      if (data) {
        if (confirmedOrders.length > 0)
          setConfirmedOrders((prev) => {
            let newOrders: any[] = [];
            data.getConfirmedOrders.forEach(
              (newOrder: { order: any[]; assignId: any }) => {
                const odr = newOrder.order[0];
                newOrder.order = odr;
                if (
                  !prev.some(
                    (order) => (order as any).assignId === newOrder.assignId
                  )
                ) {
                  newOrders.push(newOrder);
                }
              }
            );
            return [...prev, ...newOrders];
          });
        else {
          const orders = data.getConfirmedOrders.map(
            (newOrder: { order: any[] }) => {
              const odr = newOrder.order[0];
              newOrder.order = odr;
              return newOrder;
            }
          );
          setConfirmedOrders(orders);
        }
        setLoading(false);
        return;
      }
      if (error) {
        if (error.message.includes("No assigned orders found")) {
          setCanLoadMore(false);
        }
        throw new Error(error.message);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      return;
    }
  };

  // const onRefresh = async () => {
  //   // setPagination({
  //   //   page: 1,
  //   //   perPage: 10,
  //   // });
  //   await refetch({
  //     page: 1,
  //     perPage: 10,
  //   }).then(({ data: { getConfirmedOrders } }) => {
  //     setConfirmedOrders(getConfirmedOrders);
  //   });
  // };

  useEffect(() => {
    if (error) {
      setError((error as any).message);
    }
  }, [error as any]);

  const incrementPage = () => {
    if (canLoadMore) {
      setPagination({
        page: pagination.page + 1,
        perPage: pagination.perPage,
      });
    }
  };

  return (
    <OrderConfirmationContext.Provider
      value={{
        order,
        selectedOrder,
        setSelectedOrder,
        onConfirmOrder,
        onDeclineOrder,
        onGetConfirmedOrders,
        confirmedOrders,
        loading,
        incrementPage,
        error,
        // onRefresh,
      }}
    >
      {children}
    </OrderConfirmationContext.Provider>
  );
};
