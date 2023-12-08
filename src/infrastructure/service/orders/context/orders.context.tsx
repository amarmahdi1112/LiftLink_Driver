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
import { GET_ORDERS } from "../../query";
import { GET_ASSIGNED_ORDERS } from "../../subscription";
import { ErrorContext } from "../../error/error.context";

interface OrdersContextProps {
  orders: any[]; // Replace 'any' with the type of your orders
  setOrders: React.Dispatch<React.SetStateAction<any[]>>; // Replace 'any' with the type of your orders
  refreshing: boolean;
  getAllOrders: () => Promise<void>;
  onRemoveOrder: (orderId: string) => Promise<void>;
  resetAllOrders: () => void;
}

export const OrdersContext = createContext<OrdersContextProps>(null as any);

export const OrdersProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // const [getOrders, { data, loading, error: err }] = useLazyQuery(GET_ORDERS);
  const [orders, setOrders] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { data: assignedOrderSubscription } =
    useSubscription(GET_ASSIGNED_ORDERS);
  const orderData = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });
  const { error, setError } = useContext(ErrorContext);

  const getAllOrders = async () => {
    setOrders([]);
    try {
      setRefreshing(true);
      await orderData.refetch();
      const orderD = await orderData.data.getUnconfirmedOrders;
      const orders = orderD.map((order: any) => {
        const orderObj = order.order[0];
        order = { ...order, order: orderObj };
        return order;
      });
      setOrders(orders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const onRemoveOrder = async (orderId: any) => {
    const newOrders = orders.filter((order: any) => {
      return order.order.orderId !== orderId;
    });
    setOrders(newOrders);
  };

  useEffect(() => {
    if (assignedOrderSubscription) {
      const order = assignedOrderSubscription.orderAssigned.order[0];
      const orderObj = {
        ...assignedOrderSubscription.orderAssigned,
        order,
      } as never;
      setOrders([orderObj, ...orders]);
    }
  }, [assignedOrderSubscription]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        refreshing,
        getAllOrders,
        onRemoveOrder,
        resetAllOrders: () => {
          setOrders([]);
        },
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
