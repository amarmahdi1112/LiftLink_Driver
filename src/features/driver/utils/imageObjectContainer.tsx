import React, { createContext, FC, useState } from "react";

interface ImageObject {
  [key: string]: any; // Replace 'any' with the type of your image object
}

interface ImageContainerContextProps {
  imageObject: ImageObject;
  setImageObject: React.Dispatch<React.SetStateAction<ImageObject>>;
  clearImageObject: () => void;
}

export const ImageContainerContext = createContext<ImageContainerContextProps>(null as any);

interface ImageContainerProviderProps {
  children: React.ReactNode;
}

export const ImageContainerProvider: FC<ImageContainerProviderProps> = ({ children }) => {
  const [imageObject, setImageObject] = useState<ImageObject>({});

  const clearImageObject = () => {
    setImageObject({});
  };

  return (
    <ImageContainerContext.Provider
      value={{ imageObject, setImageObject, clearImageObject }}
    >
      {children}
    </ImageContainerContext.Provider>
  );
};