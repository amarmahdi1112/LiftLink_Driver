import React, { FC, createContext, useState } from "react";

interface ImageContainerContextProps {
  front: any;
  setFront: any;
  clearfront: any;
  back: any;
  setBack: any;
  clearback: any;
  left: any;
  setLeft: any;
  clearleft: any;
  right: any;
  setRight: any;
  clearright: any;
  clearall: any;
}

export const ImageContainerContext = createContext<ImageContainerContextProps>(
  null as any
);

interface ImageContainerProviderProps {
  children: React.ReactNode;
}

export const ImageContainerProvider: FC<ImageContainerProviderProps> = ({
  children,
}) => {
  const [front, setFront] = useState({});
  const [back, setBack] = useState({});
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});

  const clearfront = () => {
    setFront({});
  };

  const clearback = () => {
    setBack({});
  };

  const clearleft = () => {
    setLeft({});
  };

  const clearright = () => {
    setRight({});
  };

  const clearall = () => {
    setFront({});
    setBack({});
    setLeft({});
    setRight({});
  };

  return (
    <ImageContainerContext.Provider
      value={{
        front,
        setFront,
        clearfront,
        back,
        setBack,
        clearback,
        left,
        setLeft,
        clearleft,
        right,
        setRight,
        clearright,
        clearall,
      }}
    >
      {children}
    </ImageContainerContext.Provider>
  );
};
