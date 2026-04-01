import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface SubscriptionsContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Subscription) => void;
}

const SubscriptionsContext = createContext<
  SubscriptionsContextType | undefined
>(undefined);

export const useSubscriptions = () => {
  const context = useContext(SubscriptionsContext);
  if (!context) {
    throw new Error(
      "useSubscriptions must be used within a SubscriptionsProvider",
    );
  }
  return context;
};

interface SubscriptionsProviderProps {
  children: ReactNode;
}

export const SubscriptionsProvider: React.FC<SubscriptionsProviderProps> = ({
  children,
}) => {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(HOME_SUBSCRIPTIONS);

  const addSubscription = (subscription: Subscription) => {
    setSubscriptions((current) => [subscription, ...current]);
  };

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, addSubscription }}>
      {children}
    </SubscriptionsContext.Provider>
  );
};
