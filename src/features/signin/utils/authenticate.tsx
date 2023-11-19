import AsyncStorage from "@react-native-async-storage/async-storage";

export const authenticate = async (token: any) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
  }
};
