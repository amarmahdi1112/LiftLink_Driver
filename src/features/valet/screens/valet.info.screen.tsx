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
import { useLazyQuery, useQuery } from "@apollo/client";
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
    exists,
    onValetExists,
    onGetValetData,
    userType,
    startedValet,
    valetData,
    setScreen,
  } = useContext(ValetContext);
  const { profile } = useContext(DriverContext);
  const getCustomerInfo = useQuery(
    GET_USER_INFO_BY_ID, {
    fetchPolicy: "network-only",
  });
  const [customerInfos, setCustomerInfos] = useState<any>({});
  const [customerInfoLoading, setCustomerInfoLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [customerProfilePicture, setCustomerProfilePicture] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerAccountType, setCustomerAccountType] = useState("");
  const [serviceDeliveryDate, setServiceDeliveryDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [valetStatus, setValetStatus] = useState("");
  const [dealershipFullAddress, setDealershipFullAddress] = useState("");
  const [dealershipName, setDealershipName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setLoading(true);
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
    const getDatas = async () => {
      const getCustomer = async () => {
        const valets = [selectedValet, startedValet, valetData];
        for (const valet of valets) {
          if (valet && valet.customer) {
            const customer = await getCustomerInfo.refetch({
              userId: valet.customer.customerId,
            });
            return customer.data.getUserInfoById;
          } else if (valet && valet.customerId) {
            const customer = await getCustomerInfo.refetch({
              userId: valet.customerId,
            });
            return customer.data.getUserInfoById;
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

      const getValetStatus = () => {
        const valets = [selectedValet, startedValet, valetData];
        for (const valet of valets) {
          if (valet && valet.valetStatus) {
            return valet.valetStatus;
          }
        }
        return null;
      }

      const getDealershipFullAddress = () => {
        const valets = [selectedValet, startedValet, valetData];
        for (const valet of valets) {
          if (valet && valet.dealership) {
            return (
              valet.dealership.dealershipAddress +
              ", " +
              valet.dealership.dealershipCity +
              ", " +
              valet.dealership.dealershipState +
              ", " +
              valet.dealership.dealershipCountry +
              ", " +
              valet.dealership.dealershipZipCode
            );
          }
        }
        return null;
      }

      const getDealershipName = () => {
        const valets = [selectedValet, startedValet, valetData];
        for (const valet of valets) {
          if (valet && valet.dealership) {
            return valet.dealership.dealershipName;
          }
        }
        return null;
      }

      // Use the helper functions to get the customer and order
      const customer = await getCustomer();
      const order = getOrder();
      const valetStatus = getValetStatus();
      const dealershipFullAddress = getDealershipFullAddress();
      const dealershipName = getDealershipName();

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
        setOrderStatus(order.orderStatus);
      }

      // Set the valet status
      if (valetStatus) {
        setValetStatus(valetStatus);
      }

      // Set the dealership full address
      if (dealershipFullAddress) {
        setDealershipFullAddress(dealershipFullAddress);
      }

      // Set the dealership name
      if (dealershipName) {
        setDealershipName(dealershipName);
      }
      setLoading(false);
    }
    getDatas();
  }, []);

  useEffect(() => {
    onValetExists(
      Array.isArray(selectedValet.order)
        ? selectedValet.order[0].orderId
        : selectedValet.order.orderId
    );
  }, []);

  useEffect(() => {
    if (exists) {
      const getValet = async () => {
        await onGetValetData(
          Array.isArray(selectedValet.order)
            ? selectedValet.order[0].orderId
            : selectedValet.order.orderId
        );
      };
      getValet();
    }
  }, [exists]);

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

  return !loading && (<>
    <Spacer variant="top.large" />
    <LabelComponent>Your Info</LabelComponent>
    <AvatarContainer>
      <UserProfileContainer>
        <Avatar>
          <AvatarImage
            source={{
              uri: profile?.profilePicture[0]?.pictureLink || 'default_image_link',
            }}
          />
        </Avatar>
        <Spacer variant="left.medium" />
        <UserInfoContainer>
          <LabelComponent>
            {profile?.firstName || 'N/A'} {profile?.lastName || 'N/A'}
          </LabelComponent>
          <Spacer variant="top.small" />
          <Chip>
            <LabelComponent
              styles={{
                fontSize: 12,
              }}
              title2={true}
            >
              {profile?.accountType?.toUpperCase() || 'N/A'}
            </LabelComponent>
          </Chip>
        </UserInfoContainer>
      </UserProfileContainer>
    </AvatarContainer>
    <Spacer variant="top.large" />
    <LabelComponent>Customer Info</LabelComponent>
    <AvatarContainer>
      <UserProfileContainer>
        <Avatar>
          <AvatarImage
            source={{
              uri: customerProfilePicture || 'default_image_link',
            }}
          />
        </Avatar>
        <Spacer variant="left.medium" />
        <UserInfoContainer>
          <LabelComponent>
            {customerFirstName || 'N/A'} {customerLastName || 'N/A'}
          </LabelComponent>
          <Spacer variant="top.small" />
          <Chip>
            <LabelComponent
              styles={{
                fontSize: 12,
              }}
              title2={true}
            >
              {customerAccountType?.toUpperCase() || 'N/A'}
            </LabelComponent>
          </Chip>
        </UserInfoContainer>
      </UserProfileContainer>
    </AvatarContainer>
    <Spacer variant="top.medium" />
    <LabelComponent>Customer Location</LabelComponent>
    <Spacer variant="top.medium" />
    <LabelComponent title2={true}>
      # {pickupLocation || 'N/A'}
    </LabelComponent>
    <Spacer variant="top.large" />
    {userType === "customer" && (
      <>
        <LabelComponent>Valet Info</LabelComponent>
        <Spacer variant="top.medium" />
        <Chip>
          <LabelComponent title2={true}>
            {valetStatus || 'N/A'}
          </LabelComponent>
        </Chip>
        <Spacer variant="top.large" />
        <LabelComponent>Valet Next Step</LabelComponent>
        <Spacer variant="top.medium" />
        <Chip>
          <LabelComponent title2={true}>
            {valetStatus === ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED ? 'Customer Vehicle pickup'.toUpperCase() : 'N/A'}
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
            {valetStatus?.includes('_') ? valetStatus.split('_').join(' ') : valetStatus || 'N/A'}
          </LabelComponent>
        </Chip>
        <Spacer variant="top.large" />
      </>
    )}
    <LabelComponent>Dealership Name</LabelComponent>
    <Spacer variant="top.medium" />
    <LabelComponent title2={true}>
      {dealershipName || 'N/A'}
    </LabelComponent>
    <Spacer variant="top.large" />
    <LabelComponent>Dealership Location</LabelComponent>
    <Spacer variant="top.medium" />
    <LabelComponent title2={true}>
      # {dealershipFullAddress || 'N/A'}
    </LabelComponent>
    <Spacer variant="top.large" />
    <LabelComponent>Requested Date</LabelComponent>
    <Spacer variant="top.medium" />
    <LabelComponent title2={true}>
      # {serviceDeliveryDate ? format(new Date(serviceDeliveryDate), 'MMM dd, yyyy') : 'N/A'}
    </LabelComponent>
    <Spacer variant="top.large" />
    <ButtonComponent
      title={userType === "customer" ? "Ready to inspect?" : "Next"}
      onPress={() => {
        console.log("valetStatus", valetStatus, "orderStatus", orderStatus, "userType", userType)
        if (userType === "dealership" && orderStatus === "RETURN_ACCEPTED") {
          navigation.navigate("Map");
          return;
        }

        if (userType === "confirm_completion") {
          navigation.navigate("Home");
          return;
        }

        if (valetStatus === ValetStatus.COMPLETED || valetStatus === ValetStatus.CUSTOMER_RETURN_COMPLETED) {
          navigation.navigate("Home");
          return;
        }

        if (valetStatus === ValetStatus.CUSTOMER_TO_DEALERSHIP_COMPLETED) {
          console.log("orderStatus", orderStatus)
          if (orderStatus === "RETURN_ACCEPTED") {
            navigation.navigate("Map");
            return;
          }
          navigation.navigate("Home");
          return;
        }

        if (valetStatus === ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED) {
          setScreen("loaner");
          return;
        }

        if (!isObjEmpty(startedValet) || !isObjEmpty(selectedValet)) {
          if (!isObjEmpty(selectedValet) && selectedValet.assignStatus === "RETURN_INITIATED") {
            navigation.navigate("Map");
            return;
          }
          setScreen("loaner");
          return;
        }
      }}
    >
      <ProceedSvg isIcon={true} width={24} height={24} />
    </ButtonComponent>
  </>
  )
};
