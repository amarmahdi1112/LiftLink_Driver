import React, { createContext, FC, useState } from "react";

interface ImageObject {
  [key: string]: any;
}

interface ImageContainerContextProps {
  imageObject: ImageObject;
  setImageObject: any;
  clearImageObject: () => void;
  frontImage?: string;
  setFrontImage?: React.Dispatch<React.SetStateAction<any>>;
  backImage?: string;
  setBackImage?: React.Dispatch<React.SetStateAction<any>>;
  expirationDate?: string;
  setExpirationDate?:React.Dispatch<React.SetStateAction<any>>;
  expirationDateError?: boolean;
  setExpirationDateError?: React.Dispatch<React.SetStateAction<any>>;
  licenseState?: string;
  setLicenseState?:React.Dispatch<React.SetStateAction<any>>;
  licenseStateError?: boolean;
  setLicenseStateError?: React.Dispatch<React.SetStateAction<any>>;
  licenseNumber?: string;
  setLicenseNumber?:React.Dispatch<React.SetStateAction<any>>;
  licenseNumberError?: boolean;
  setLicenseNumberError?: React.Dispatch<React.SetStateAction<any>>;
}

export const ImageContainerContext = createContext<ImageContainerContextProps>({} as any);

interface ImageContainerProviderProps {
  children: React.ReactNode;
}

export const ImageContainerProvider: FC<ImageContainerProviderProps> = ({
  children,
}) => {
  const [imageObject, setImageObject] = useState<ImageObject>({});
  const [frontImage, setFrontImage] = useState<any>(null);
  const [backImage, setBackImage] = useState<any>(null);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [expirationDateError, setExpirationDateError] =
    useState<boolean>(false);
  const [licenseState, setLicenseState] = useState<string>("");
  const [licenseStateError, setLicenseStateError] = useState<boolean>(false);
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [licenseNumberError, setLicenseNumberError] = useState<boolean>(false);

  const clearImageObject = () => {
    setImageObject({});
  };

  return (
    <ImageContainerContext.Provider
      value={{
        imageObject,
        setImageObject,
        clearImageObject,
        frontImage,
        setFrontImage,
        backImage,
        setBackImage,
        expirationDate,
        setExpirationDate,
        expirationDateError,
        setExpirationDateError,
        licenseState,
        setLicenseState,
        licenseStateError,
        setLicenseStateError,
        licenseNumber,
        setLicenseNumber,
        licenseNumberError,
        setLicenseNumberError,
      }}
    >
      {children}
    </ImageContainerContext.Provider>
  );
};
