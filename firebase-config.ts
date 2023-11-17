import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import {
  PhoneAuthProvider,
  getAuth,
  Auth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { getStorage, FirebaseStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
//   FIREBASE_MEASUREMENT_ID,
// } from "@env";

const keys = {
  FIREBASE_API_KEY: "AIzaSyAj-DNqDw7aAgQ3cU2dFtzXdM2pZKRUKkQ",
  FIREBASE_AUTH_DOMAIN: "ll-v2-4a68f.firebaseapp.com",
  FIREBASE_DATABASE_URL: "SOMETOKEN",
  FIREBASE_PROJECT_ID: "ll-v2-4a68f",
  FIREBASE_STORAGE_BUCKET: "ll-v2-4a68f.appspot.com",
  FIREBASE_MESSAGING_SENDER_ID: "534665301461",
  FIREBASE_APP_ID: "1:534665301461:web:1d700423fa92d1a629c15c",
  FIREBASE_MEASUREMENT_ID: "G-VN97050FP7",
};

// Initialize Firebase
export const firebaseConfig = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: keys.FIREBASE_AUTH_DOMAIN,
  projectId: keys.FIREBASE_PROJECT_ID,
  storageBucket: keys.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: keys.FIREBASE_MESSAGING_SENDER_ID,
  appId: keys.FIREBASE_APP_ID,
  measurementId: keys.FIREBASE_MEASUREMENT_ID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp: FirebaseApp = getApp();
initializeAuth(fbApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage: FirebaseStorage = getStorage();
const fbAuth: Auth = getAuth(fbApp);

const uploadToFirebase = async (
  blob: string,
  path: string,
  onProgress: (progress: number) => void
) => {
  const response = await fetch(blob);
  const blobData = await response.blob();
  console.log("Uploading file to Firebase:", blobData);

  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, blobData);

  return new Promise<{ url: string; metadata: UploadTaskSnapshot }>(
    (resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          onProgress && onProgress(progress);
        },
        (error) => {
          // console.error("Error uploading file to Firebase:", error);
          reject(error);
        },
        async () => {
          console.log("File uploaded to Firebase successfully!");
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url,
            metadata: uploadTask.snapshot,
          });
        }
      );
    }
  );
};

const fbOtp = async (phone: string, recaptchaVerifier: { current: any }) => {
  const phoneProvider = new PhoneAuthProvider(fbAuth);
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phone,
    recaptchaVerifier.current
  );
  return verificationId;
};

export { storage, fbApp, uploadToFirebase, fbAuth, fbOtp };
