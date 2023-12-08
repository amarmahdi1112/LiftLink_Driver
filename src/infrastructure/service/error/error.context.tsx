import React, { createContext, useEffect, useState } from "react";

interface ErrorContextProps {
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
}

export const ErrorContext = createContext<ErrorContextProps>(null as any);

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState<any>("");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
      console.log(error);
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
