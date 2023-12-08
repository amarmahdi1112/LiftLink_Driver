/* eslint-disable react/prop-types */
import React, { FC, useContext, useEffect, useState } from "react";
import { LabelComponent } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { ButtonComponent } from "../../../components/button.component";
import styled from "styled-components/native";
import {
  ValetContext,
  ValetStatus,
} from "../../../infrastructure/service/valet/context/valet.context";
// import { DriverProfileContext } from "../../../infrastructure/service/driver/context/driver.profile.context";
import { format } from "date-fns";
import ProceedSvg from "../../../../assets/svgs/proceed";
import { isObjEmpty } from "../../../features/main/screen/main.screen";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INFO_BY_ID } from "../../../infrastructure/service/query";
import { Alert } from "react-native";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

interface ValetInfoScreenProps {
  navigation: any;
}

export const ValetInfoScreen: FC<ValetInfoScreenProps> = ({ navigation }) => {
  const {
    selectedValet,
    setSelectedValet,
    setScreen,
    exists,
    onValetExists,
    userType,
    startedValet,
    setStartedValet,
  } = useContext(ValetContext);
  const { profile } = useContext(DriverContext);
  const [getCustomerInfo, { data, error: customerInfoError }] = useLazyQuery(
    GET_USER_INFO_BY_ID,
    {
      variables: {
        userId: selectedValet.customerId,
      },
    }
  );
  const [customerInfos, setCustomerInfos] = useState<any>({});
  const [customerInfoLoading, setCustomerInfoLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setCustomerInfos(data.getUserInfoById);
      setCustomerInfoLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (selectedValet) {
      getCustomerInfo();
    }
  }, [selectedValet]);

  useEffect(() => {
    onValetExists(Array.isArray(selectedValet.order) ? selectedValet.order[0].orderId : selectedValet.order.orderId);
  }, []);

  // const obj2 = {
  //   userType: "customer", //
  //   customerId: "6b4af2f9-ffc4-4109-a7bc-53ea3269b68f", //
  //   dealershipId: "15944960-31fc-42ef-b6e9-6244b128a264", //
  //   orderId: "f9c023e0-d166-48b5-a6a4-aea30bbf97b8", //
  //   //
  //   backImage:
  //     "https://media.istockphoto.com/id/854923054/photo/three-dimensional-modern-white-car.jpg?s=2048x2048&w=is&k=20&c=FIGHMkABg9xpB4vHMEOcCjVRZzw3ogGbLJVpSAryJmw=",
  //   //
  //   rightImage:
  //     "https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=2048x2048&w=is&k=20&c=u_vqLBX3koM67osQVXrWogzYtvgpx__mORzyfBLXo6U=",
  //   //
  //   frontImage:
  //     "https://media.istockphoto.com/id/1154617648/photo/3d-illustration-of-generic-compact-car-front-view.jpg?s=2048x2048&w=is&k=20&c=scw578Hsr_L2-857IQz9oiiTBJIdovTMlLuISOrKuF4=",
  //   //
  //   leftImage:
  //     "https://media.istockphoto.com/id/1135255668/photo/blue-hatchback-car.jpg?s=1024x1024&w=is&k=20&c=KDl9n7tu0f73NiymNk_G_KOzIvtijZSJkVWLZ7s8L1Y=",
  //   comments: "something something......", //
  //   gasLevel: 100, //
  //   mileage: 1000, //
  // };

  // const obj = {
  //   backImage:
  //     "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/valet_vehicle_checks%2FamarDriver%2FF22D0E3A-4C82-4894-BA56-D9EA1D90FD4A.jpg?alt=media&token=586fb6b4-591e-467e-a434-89ac827006e6",
  //   comments: "Something…",
  //   customerId: "6b4af2f9-ffc4-4109-a7bc-53ea3269b68f",
  //   dealershipId: "15944960-31fc-42ef-b6e9-6244b128a264",
  //   frontImage:
  //     "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/valet_vehicle_checks%2FamarDriver%2F86280063-6499-4E8D-B584-7B1FDCCCF27E.jpg?alt=media&token=06d3a40f-bfe1-42c5-bd08-155dc95c7973",
  //   gasLevel: 100,
  //   leftImage:
  //     "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/valet_vehicle_checks%2FamarDriver%2F15C2904B-0178-4947-BE32-3679026DE4A3.jpg?alt=media&token=c268f12d-097c-4f62-9cd7-153cb05effd9",
  //   mileage: 1000,
  //   orderId: "c4649f04-56c4-4d2c-9193-0800a3bae00c",
  //   rightImage:
  //     "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/valet_vehicle_checks%2FamarDriver%2FEA292435-FC45-4648-B474-31BAD4442524.jpg?alt=media&token=94685959-2061-45a8-b48b-e99eed867e9e",
  //   userType: "dealership",
  // };

  useEffect(() => {
    if (userType !== "customer" && exists) {
      navigation.navigate("Valet");
    }
  }, [exists]);
  
  return !isObjEmpty(startedValet) || !isObjEmpty(selectedValet) ? (
    <>
      <Spacer variant="top.large" />
      <LabelComponent>Your Info</LabelComponent>
      <AvatarContainer>
        <UserProfileContainer>
          <Avatar>
            <AvatarImage
              source={{
                uri: profile.profilePicture[0].pictureLink,
              }}
            />
          </Avatar>
          <Spacer variant="left.medium" />
          <UserInfoContainer>
            <LabelComponent>
              {profile.firstName} {profile.lastName}
            </LabelComponent>
            <Spacer variant="top.small" />
            <Chip>
              <LabelComponent
                styles={{
                  fontSize: 12,
                }}
                title2={true}
              >
                {profile.accountType.toUpperCase()}
              </LabelComponent>
            </Chip>
          </UserInfoContainer>
        </UserProfileContainer>
        {/* <UserInfoContainer>
          <LabelComponent
            styles={{
              fontSize: 12,
            }}
            title2={true}
          >
            UID 112233
          </LabelComponent>
          <Spacer variant="left.medium" />
          <LabelComponent
            styles={{
              fontSize: 12,
            }}
            title2={true}
          >
            5 Reviews
          </LabelComponent>
        </UserInfoContainer> */}
      </AvatarContainer>
      {/* Customer Info */}
      <Spacer variant="top.large" />
      <LabelComponent>Customer Info</LabelComponent>
      {!customerInfoLoading && !isObjEmpty(customerInfos) && (
        <AvatarContainer>
          <UserProfileContainer>
            <Avatar>
              <AvatarImage
                source={{
                  uri: customerInfos.profilePicture[0].pictureLink,
                }}
              />
            </Avatar>
            <Spacer variant="left.medium" />
            <UserInfoContainer>
              <LabelComponent>
                {customerInfos.firstName} {customerInfos.lastName}
              </LabelComponent>
              <Spacer variant="top.small" />
              <Chip>
                <LabelComponent
                  styles={{
                    fontSize: 12,
                  }}
                  title2={true}
                >
                  {customerInfos.accountType.toUpperCase()}
                </LabelComponent>
              </Chip>
            </UserInfoContainer>
          </UserProfileContainer>
          {/* <UserInfoContainer>
            <LabelComponent
              styles={{
                fontSize: 12,
              }}
              title2={true}
            >
              UID 112233
            </LabelComponent>
            <Spacer variant="left.medium" />
            <LabelComponent
              styles={{
                fontSize: 12,
              }}
              title2={true}
            >
              5 Reviews
            </LabelComponent>
          </UserInfoContainer> */}
        </AvatarContainer>
      )}
      <Spacer variant="top.medium" />
      <LabelComponent>Customer Location</LabelComponent>
      <Spacer variant="top.medium" />
      <LabelComponent title2={true}>
        #{Array.isArray(selectedValet.order) ? selectedValet.order[0].pickupLocation : selectedValet.order.pickupLocation || "N/A"}
      </LabelComponent>
      <Spacer variant="top.large" />
      {userType === "customer" && (
        <>
          <LabelComponent>Valet Info</LabelComponent>
          <Spacer variant="top.medium" />
          <Chip>
            <LabelComponent title2={true}>
              {startedValet.valetStatus.split("_").join(" ")}
            </LabelComponent>
          </Chip>
          <Spacer variant="top.large" />
          <LabelComponent>Valet Next Step</LabelComponent>
          <Spacer variant="top.medium" />
          <Chip>
            <LabelComponent title2={true}>
              {startedValet.valetStatus ===
                ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED &&
                "Customer Vehicle pickup".toUpperCase()}
            </LabelComponent>
          </Chip>
          <Spacer variant="top.large" />
        </>
      )}
      {userType === "confirm_completion" && (
        <>
          <LabelComponent>Valet Info</LabelComponent>
          <Spacer variant="top.medium" />
          <Chip>
            <LabelComponent title2={true}>
              {!isObjEmpty(startedValet)
                ? startedValet.valetStatus.split("_").join(" ")
                : selectedValet.valetStatus.split("_").join(" ")}
            </LabelComponent>
          </Chip>
          <Spacer variant="top.large" />
        </>
      )}
      <LabelComponent>Dealership Name</LabelComponent>
      <Spacer variant="top.medium" />
      <LabelComponent title2={true}>
        #{selectedValet.dealership.dealershipName}
      </LabelComponent>
      <Spacer variant="top.large" />
      <LabelComponent>Dealership Location</LabelComponent>
      <Spacer variant="top.medium" />
      <LabelComponent title2={true}>
        #
        {selectedValet.dealership.dealershipAddress +
          ", " +
          selectedValet.dealership.dealershipCity +
          ", " +
          selectedValet.dealership.dealershipState +
          ", " +
          selectedValet.dealership.dealershipCountry +
          ", " +
          selectedValet.dealership.dealershipZipCode}
      </LabelComponent>
      <Spacer variant="top.large" />
      <LabelComponent>Requested Date</LabelComponent>
      <Spacer variant="top.medium" />
      <LabelComponent title2={true}>
        #
        {format(
          new Date(Array.isArray(selectedValet.order) ? selectedValet.order[0].orderDeliveryDate : selectedValet.order.orderDeliveryDate),
          "dd MMM, yyyy"
        )}
      </LabelComponent>
      <Spacer variant="top.large" />
      <ButtonComponent
        title={userType === "customer" ? "Ready to inspect?" : "Next"}
        onPress={() => {
          if (userType !== "confirm_completion") setScreen("loaner");
          else {
            navigation.navigate("Home");
          }
        }}
      >
        <ProceedSvg isIcon={true} width={24} height={24} />
      </ButtonComponent>
    </>
  ) : (
    <></>
  );
};
