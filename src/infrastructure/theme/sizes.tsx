import { Dimensions } from "react-native";

export const sizes = ["8px", "16px", "32px", "64px", "128px"];
export const buttonSizes = {
  sm: {
    height: "32px",
    minWidth: "64px",
    fontSize: "14px",
  },
  md: {
    height: "40px",
    minWidth: "96px",
    fontSize: "16px",
  },
  lg: {
    height: "48px",
    minWidth: "128px",
    fontSize: "18px",
  },
  xl: {
    height: "56px",
    minWidth: "192px",
    fontSize: "20px",
  },
  screen: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
};

export const screenSizes = {
  sm: {
    height: Dimensions.get("window").height * 0.25,
    width: Dimensions.get("window").width * 0.25,
  },
  md: {
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width * 0.5,
  },
  lg: {
    height: Dimensions.get("window").height * 0.75,
    width: Dimensions.get("window").width * 0.75,
  },
  xl: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  original: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
};
