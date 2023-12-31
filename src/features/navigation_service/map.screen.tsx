import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import SlideButton from "rn-slide-button";
import SlidingUpPanel from "rn-sliding-up-panel";
import {
  ValetContext,
  ValetStatus,
} from "../../infrastructure/service/valet/context/valet.context";
import { colors } from "../../infrastructure/theme/colors";
import SliderIcon from "../../../assets/svgs/slider_icon";
import DestinationIcon from "../../../assets/svgs/destinationIcon";
import CalendarIcon from "../../../assets/svgs/calendar2";
import { LabelComponent } from "../../components/typography";
import { Spacer } from "../../components/utils/spacer.component";
import MapView, { Marker, Polyline } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import * as Location from "expo-location";
import CurrentLocationMarker from "../../../assets/svgs/current_marker";
import DestinationMarker from "../../../assets/svgs/destination_marker";
import { Alert } from "react-native";
import { isObjEmpty } from "../../features/main/screen/main.screen";
import { OverlayComponent } from "../../components/overlay.component";
// import LogoSvg from "../../../assets/svgs/logoLoadingIndicator";
import { format } from "date-fns";
import MapViewDirections from "react-native-maps-directions";
import set from "date-fns/fp/set/index.js";
import { DriverContext } from "../../infrastructure/service/driver/context/driver.context";
import { theme } from "../../infrastructure/theme";
import { ErrorContext } from "../../infrastructure/service/error/error.context";
import { ErrorComponent } from "../../components/error.component";
import { useFocusEffect } from "@react-navigation/native";

const BottomOverflowContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 45px;
  flex-direction: column;
  position: relative;
`;

const PositionedBgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize-mode: cover;
  border-radius: 45px;
`;

const SliderContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 20px;
  left: 0;
  padding-left: 20px;
  padding-right: 20px;
`;

const BarContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Bar = styled.View`
  width: 120px;
  height: 7px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 10px;
`;
const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props: any) => props.justifyContent || "flex-start"};
  align-items: center;
`;

const ContentView = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props: any) => props.alignItems || "flex-start"};
  align-self: flex-start;
`;

const DataContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  margin-top: 70px;
`;

const UserInfoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100px;
`;

const UserProfileContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Chip = styled.View`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  dipaly: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: rgba(99, 163, 117, 0.36);
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Avatar = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

const AvatarImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 20px;
`;

const pCoords =
  "isxeIpdjtTm@A?qD?qD?mDfHEjBA?aM?aG@mODop@CmCD[CsBGyBMcAs@kEa@wBq@}GGwC?kCBqAEc@ZkHBgAAkBCs@KkAEc@aBoIc@eCIcAIsCEsBBa@GkEAiDGaCKgP@cB?}@Ia@AwMCs^BoOAyHDyHEsRFeMBaKA_GAqDd@E`A?lBAp@_Df@yBJa@Ba@Ek@AqHf@oGv@iIF}@?eAA{U@oJCqD?cHJ_@@m@AkJAcAKS@yH?wCmB?AxD?pDnBBA`BGX?D";

interface MapScreenProps {
  navigation: any;
}

export const MapScreen: FC<MapScreenProps> = ({ navigation }) => {
  let _panel: any = useRef(null);
  const {
    screen,
    setScreen,
    selectedValet,
    setSelectedValet,
    startedValet,
    setStartedValet,
    valetData,
    userType,
    setUserType,
    onStartValet,
    onChangeLocation,
  } = useContext(ValetContext);
  const { profile } = useContext(DriverContext);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [swipeText, setSwipeText] = useState("Swipe up to view details");
  const [viewData, setViewData] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({});
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [destinationLocation, setDestinationLocation] = useState("");
  const [destinationCoords, setDestinationCoords] = useState({});
  const [polylineCoords, setPolylineCoords] = useState([]);
  const mapRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState<{
    center: { latitude: number; longitude: number };
    pitch: number;
    heading: number;
    zoom: number;
    altitude: number;
  } | null>(null);
  const [currentLocationTracker, setCurrentLocationTracker] = useState<any>({});
  const [loaded, setLoaded] = useState(false);
  const [customerProfilePicture, setCustomerProfilePicture] = useState("");
  const { error, setError } = useContext(ErrorContext);
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerAccountType, setCustomerAccountType] = useState("");
  const [customerUID, setCustomerUID] = useState("");
  const [serviceDeliveryDate, setServiceDeliveryDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [type, setType] = useState("");

  const decodePolyline = (pl: any) => {
    const decoded = decode(pl);
    return decoded.map((d: any) => {
      return {
        latitude: d[0] || 0,
        longitude: d[1] || 0,
      };
    });
  };

  const setPoly = async () => {
    const decoded = decodePolyline(pCoords);
    setPolylineCoords(decoded as any);
  };

  const changeCurrentLocation = async (curLoc: any) => {
    setCurrentLocationTracker(curLoc);
  };

  const isFocused = navigation.isFocused();

  useEffect(() => {
    setLoading(true);
    setPoly();
    // if (!isObjEmpty(valetData)) {
    //   if (
    //     valetData.valetStatus ===
    //       ValetStatus.CUSTOMER_TO_DEALERSHIP_COMPLETED.valueOf() ||
    //     valetData.valetStatus === ValetStatus.CUSTOMER_RETURN_STARTED.valueOf()
    //   ) {
    //     setType("return");
    //   }
    // }
    // Define a helper function to get the first valid customer from selectedValet, startedValet, or valetData
    const getCustomer = () => {
      const valets = [selectedValet, startedValet, valetData];
      for (const valet of valets) {
        if (valet && valet.customer) {
          return valet.customer;
        }
      }
      return null;
    };

    // Define a helper function to get the first valid order from selectedValet, startedValet, or valetData
    const getOrder = () => {
      const valets = [selectedValet, startedValet, valetData];
      for (const valet of valets) {
        if (valet && valet.order) {
          return Array.isArray(valet.order) ? valet.order[0] : valet.order;
        }
      }
      return null;
    };

    // Use the helper functions to get the customer and order
    const customer = getCustomer();
    const order = getOrder();

    // Set the customer profile picture
    if (customer && customer.profilePicture) {
      const profilePicture = Array.isArray(customer.profilePicture)
        ? customer.profilePicture[0]
        : customer.profilePicture;
      setCustomerProfilePicture(profilePicture.pictureLink);
    }

    // Set the customer first name, last name, and account type
    if (customer) {
      if (customer.firstName) {
        setCustomerFirstName(customer.firstName);
      }
      if (customer.lastName) {
        setCustomerLastName(customer.lastName);
      }
      if (customer.accountType) {
        setCustomerAccountType(customer.accountType);
      }
    }

    // Set the service delivery date and pickup location
    if (order) {
      if (order.orderDeliveryDate) {
        setServiceDeliveryDate(order.orderDeliveryDate);
      }
      if (order.pickupLocation) {
        setPickupLocation(order.pickupLocation);
      }
      if (order.orderStatus === "RETURN_ACCEPTED") {
        setType("return");
      }
    }
    setLoading(false);
  }, []);

  const mapCamView = async (coords: any) => {
    if (
      mapRef.current &&
      currentLocation &&
      destinationCoords &&
      !loadingLocation
    ) {
      await (mapRef.current as any).fitToCoordinates(coords, {
        edgePadding: {
          top: 100,
          right: 30,
          bottom: 300,
          left: 30,
        },
        animated: true,
        tilt: 45,
      });
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationErrMsg("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setCurrentLocationTracker({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        onChangeLocation({
          valetId: selectedValet.valetId || valetData.valetId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );

    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    if (loaded)
      await (mapRef.current as any).setCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        pitch: 45,
        heading: 90,
        altitude: 1000,
      });

    return location;
  };

  useEffect(() => {
    // Check which is not empty and select the existing one and check what the valet status in valet data or selected valet is and set the user type accordingly
    if (!isObjEmpty(selectedValet)) {
      if (
        selectedValet.valetStatus === ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED
      ) {
        setUserType("dealership");
      } else if (
        selectedValet.valetStatus ===
        ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED ||
        selectedValet.valetStatus === ValetStatus.CUSTOMER_VEHICLE_PICK_UP
      ) {
        setUserType("customer");
      }
    } else if (!isObjEmpty(valetData)) {
      setSelectedValet(valetData);
      if (
        valetData.valetStatus === ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED
      ) {
        setUserType("dealership");
      } else if (
        valetData.valetStatus === ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED
      ) {
        setUserType("customer");
      }
    }

    if (isObjEmpty(currentLocation)) {
      getLocation();
    }
    if (userType === "dealership")
      setDestinationLocation(
        Array.isArray(selectedValet.order)
          ? (selectedValet as any).order[0].pickupLocation
          : selectedValet.order.pickupLocation + ", Edmonton"
      );
    else if (userType === "customer")
      setDestinationLocation(selectedValet.dealership.dealershipAddress);
    else setError("Invalid user type");
  }, [isFocused]);

  useEffect(() => {
    if (!isObjEmpty(currentLocation)) {
      setLoadingLocation(false);
    }
  }, [currentLocation]);

  const onSlideFinish = async () => {
    const startDealershipToCustomer = async () => {
      try {
        await onStartValet(
          ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED,
          selectedValet.valetId || valetData.valetId
        );
        setStarted(true);
        return true;
      } catch (error) {
        return false;
      }
    };

    const completeDealershipToCustomer = async () => {
      try {
        await onStartValet(
          ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED,
          selectedValet.valetId || valetData.valetId
        );
        setUserType("customer");
        setStarted(false);
        setScreen("details");
        return true;
      } catch (error) {
        return false;
      }
    };

    const startCustomerToDealership = async () => {
      try {
        await onStartValet(
          ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED,
          selectedValet.valetId || valetData.valetId
        );
        setStarted(true);
        return true;
      } catch (error) {
        return false;
      }
    };

    const completeCustomerToDealership = async () => {
      try {
        await onStartValet(
          ValetStatus.CUSTOMER_TO_DEALERSHIP_COMPLETED,
          selectedValet.valetId || valetData.valetId
        );
        setUserType("confirm_completion");
        setStarted(false);
        setScreen("details");
        return true;
      } catch (error) {
        return false;
      }
    };

    const startReturnVehicle = async () => {
      try {
        await onStartValet(
          ValetStatus.CUSTOMER_RETURN_STARTED,
          selectedValet.valetId || valetData.valetId
        );
        setStarted(true);
        return true;
      } catch (error) {
        return false;
      }
    };

    const endReturnVehicle = async () => {
      try {
        await onStartValet(
          ValetStatus.CUSTOMER_RETURN_COMPLETED,
          selectedValet.valetId || valetData.valetId
        );
        setUserType("confirm_completion");
        setStarted(false);
        setScreen("details");
        return true;
      } catch (error) {
        return false;
      }
    };

    if (userType === "dealership" && type !== "return") {
      if (!started) {
        await startDealershipToCustomer();
      } else {
        if (await completeDealershipToCustomer()) {
          onFinish();
        }
      }
    } else if (userType === "customer") {
      if (!started) {
        await startCustomerToDealership();
      } else {
        if (await completeCustomerToDealership()) {
          onFinish();
        }
      }
    } else {
      if (!started) {
        await startReturnVehicle();
      } else {
        if (await endReturnVehicle()) {
          onFinish();
        }
      }
    }
  };

  const onFinish = async () => {
    navigation.navigate("Valet");
  };

  useEffect(() => {
    if (
      !isObjEmpty(startedValet) &&
      (startedValet.valetStatus ===
        ValetStatus.DEALERSHIP_TO_CUSTOMER_STARTED ||
        startedValet.valetStatus ===
        ValetStatus.CUSTOMER_TO_DEALERSHIP_STARTED ||
        startedValet.valetStatus === ValetStatus.CUSTOMER_RETURN_STARTED)
    ) {
      setStarted(true);
    }
  }, []);

  return (
    <>
      {!loadingLocation ? (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={currentLocation as any}
          customMapStyle={theme.customMapStyle}
          provider="google"
        >
          {!loadingLocation && (
            <MapViewDirections
              apikey="AIzaSyCQ_V0ZfCs0h_ruPXAUhpkh8P-IK89P_LM"
              origin={currentLocation as any}
              destination={destinationLocation}
              strokeWidth={5}
              strokeColor={colors.buttonColors.quaternary}
              optimizeWaypoints={true}
              onReady={async (result: any) => {
                setLoaded(false);
                setCameraPosition({
                  center: {
                    latitude: result.coordinates[0].latitude,
                    longitude: result.coordinates[0].longitude,
                  },
                  pitch: 0,
                  heading: 0,
                  zoom: 10,
                  altitude: 0,
                });
                setPolylineCoords(result.coordinates);
                setDestinationCoords({
                  latitude:
                    result.coordinates[result.coordinates.length - 1].latitude,
                  longitude:
                    result.coordinates[result.coordinates.length - 1].longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
                await mapCamView(result.coordinates);
                setLoaded(true);
              }}
            />
          )}
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocationTracker.latitude || 0,
                longitude: currentLocationTracker.longitude || 0,
              }}
            >
              <CurrentLocationMarker width={40} height={40} />
            </Marker>
          )}
          {destinationCoords && (
            <Marker
              coordinate={{
                latitude: (destinationCoords as any).latitude || 0,
                longitude: (destinationCoords as any).longitude || 0,
              }}
            >
              <DestinationMarker width={40} height={40} />
            </Marker>
          )}
        </MapView>
      ) : (
        <>
          <OverlayComponent
            override={true}
            onCancel={() => console.log("canceled")}
            onConfirm={() => console.log("confirmed")}
          >
            {/* <LogoSvg width={100} height={120} /> */}
            <Spacer variant="top.large" />
          </OverlayComponent>
        </>
      )}
      <SlidingUpPanel
        ref={(c) => (_panel = c)}
        draggableRange={{
          top: 500,
          bottom: 180,
        }}
        backdropOpacity={0.2}
        snappingPoints={[470, 180]}
        onMomentumDragEnd={(position) => {
          if (position < 400) {
            setSwipeText("Swipe up to view details");
            setViewData(false);
          } else {
            setSwipeText("Swipe down to close");
            setViewData(true);
          }
        }}
      >
        <BottomOverflowContainer>
          <PositionedBgImage
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2FbackgroundPatterns.png?alt=media&token=ae22b591-86c1-4a10-b1d9-dae0e1075eba",
            }}
          />
          <BarContainer>
            <Bar />
            <LabelComponent inverted={true}>{swipeText}</LabelComponent>
          </BarContainer>
          {viewData && !loading && (
            <DataContainer>
              <AvatarContainer>
                <UserProfileContainer>
                  <Avatar>
                    <AvatarImage
                      source={{
                        uri: customerProfilePicture,
                      }}
                    />
                  </Avatar>
                  <Spacer variant="left.medium" />
                  <UserInfoContainer>
                    <LabelComponent inverted={true}>
                      {customerFirstName} {customerLastName}
                    </LabelComponent>
                    <Spacer variant="top.small" />
                    <Chip>
                      <LabelComponent
                        inverted={true}
                        styles={{
                          fontSize: 12,
                        }}
                        title2={true}
                      >
                        {customerAccountType.toUpperCase()}
                      </LabelComponent>
                    </Chip>
                  </UserInfoContainer>
                </UserProfileContainer>
                {/* <UserInfoContainer>
                  <LabelComponent
                    inverted={true}
                    styles={{
                      fontSize: 12,
                    }}
                    title2={true}
                  >
                    UID 112233
                  </LabelComponent>
                  <Spacer variant="left.medium" />
                  <LabelComponent
                    inverted={true}
                    styles={{
                      fontSize: 12,
                    }}
                    title2={true}
                  >
                    5 Reviews
                  </LabelComponent>
                </UserInfoContainer> */}
              </AvatarContainer>
              <Spacer variant="top.large" />
              <ContentContainer>
                <DestinationIcon width={36} height={36} />
                <ContentView>
                  <LabelComponent inverted={true}>
                    Pickup Location
                  </LabelComponent>
                  <Spacer variant="top.xsmall" />
                  <LabelComponent inverted={true} title2={true}>
                    {pickupLocation || "N/A"}
                  </LabelComponent>
                </ContentView>
              </ContentContainer>
              <Spacer variant="top.large" />
              <ContentContainer>
                <CalendarIcon width={36} height={36} />
                <ContentView>
                  <LabelComponent inverted={true}>
                    Service Delivery Date
                  </LabelComponent>
                  <Spacer variant="top.xsmall" />
                  <LabelComponent inverted={true} title2={true}>
                    {format(new Date(serviceDeliveryDate), "MM/dd/yyyy")}
                  </LabelComponent>
                </ContentView>
              </ContentContainer>
            </DataContainer>
          )}
        </BottomOverflowContainer>
      </SlidingUpPanel>
      {!loading && (
        <SliderContainer>
          <SlideButton
            title={started ? "Slide to finish" : "Slide to start"}
            borderRadius={20}
            padding={0}
            reverseSlideEnabled={true}
            containerStyle={{
              backgroundColor: started
                ? colors.buttonColors.error
                : colors.buttonColors.primary,
              padding: 0,
              margin: 0,
            }}
            underlayStyle={{
              backgroundColor: started
                ? colors.buttonColors.error
                : colors.buttonColors.primary,
              padding: 0,
              margin: 0,
            }}
            icon={<SliderIcon width={25} height={25} />}
            thumbStyle={{
              backgroundColor: started
                ? colors.buttonColors.error
                : colors.buttonColors.primary,
              padding: 0,
              margin: 0,
            }}
            onReachedToEnd={async () => {
              await onSlideFinish();
            }}
            autoReset={true}
          />
        </SliderContainer>
      )}
      {error && <ErrorComponent errorMessage={error} />}
    </>
  );
};
