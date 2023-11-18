import React, {
  createContext,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { GET_ORDERS } from "../../query";
import { GET_ASSIGNED_ORDERS } from "../../subscription";

interface OrdersContextProps {
  error: Error | null;
  orders: any[]; // Replace 'any' with the type of your orders
  setOrders: React.Dispatch<React.SetStateAction<any[]>>; // Replace 'any' with the type of your orders
  refreshing: boolean;
  getAllOrders: () => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<any | null>>;
  onRemoveOrder: (orderId: string) => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextProps>(null as any);

export const OrdersProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // const [getOrders, { data, loading, error: err }] = useLazyQuery(GET_ORDERS);
  const [orders, setOrders] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { data: assignedOrderSubscription } =
    useSubscription(GET_ASSIGNED_ORDERS);
  const orderData = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });

  const getAllOrders = async () => {
    setOrders([]);
    console.log("get all orders");
    try {
      setRefreshing(true);
      await orderData.refetch();
      const orderD = await orderData.data.getUnconfirmedOrders;
      console.log("order data", orderD);
      const orders = orderD.map((order: any) => {
        const orderObj = order.order[0];
        order = { ...order, order: orderObj };
        return order;
      });
      setOrders(orders);
      setError(null);
    } catch (err: any) {
      console.log("error##########??????", err.message);
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
    console.log("order data", orders);
  }, [orders]);

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
        error,
        orders,
        setOrders,
        refreshing,
        getAllOrders,
        setError,
        onRemoveOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
