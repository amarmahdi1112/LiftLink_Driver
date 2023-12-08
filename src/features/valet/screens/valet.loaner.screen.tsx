/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext, FC } from "react";
import { LabelComponent as Label } from "../../../components/typography/label.component";
// import { MainContainer } from "../../../components/main.container.component";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { Spacer } from "../../../components/utils/spacer.component";
import { CamCardComponent } from "../components/camera.card.component";
import { ButtonComponent } from "../../../components/button.component";
import styled from "styled-components/native";
import { ImageContainerContext } from "../utils/imageObjectContainer";
import { InputComponent } from "../../../components/input.component";
import { LabelFormComponent } from "../../../components/typography/label.form.component";
import { isObjEmpty } from "../../main/screen/main.screen";
import {
  ValetContext,
  ValetStatus,
} from "../../../infrastructure/service/valet/context/valet.context";
import { uploadToFirebase } from "../../../../firebase-config";
import UploadProgress from "../../../../assets/svgs/upload_progress";
import { OverlayComponent } from "../../../components/overlay.component";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import { Platform } from "react-native";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";
import { ErrorComponent } from "../../../components/error.component";
import ProceedSvg from "../../../../assets/svgs/proceed";

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
`;

const IncrementBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.bg.secondary};
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ErrorMessage = styled.Text`
  color: ${(props) => props.theme.colors.text.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title2};
`;

interface InputProps {
  placeholder?: string;
  onChangeText?: any;
  multiline?: boolean;
  height?: string | number;
}

const TextInput = styled.TextInput<InputProps>`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.formColors.border};
  width: 100%;
  padding: 20px;
  height: ${(props) => props.height || "60px"};
  max-height: ${(props) => props.height || "60px"};
  text-align-vertical: top;
`;

const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.theme.screenSizes.original.height}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

interface ValetLoanerScreenProps {
  navigation: any;
}

export const ValetLoanerScreen: FC<ValetLoanerScreenProps> = ({
  navigation,
}) => {
  const [progressFront, setProgressFront] = useState(0);
  const [progressBack, setProgressBack] = useState(0);
  const [progressLeft, setProgressLeft] = useState(0);
  const [progressRight, setProgressRight] = useState(0);
  const [gasLevel, setGasLevel] = useState("");
  const [comments, setComments] = useState("");
  const [mileage, setMileage] = useState("");
  const [frontImgUrl, setFrontImgUrl] = useState("");
  const [backImgUrl, setBackImgUrl] = useState("");
  const [leftImgUrl, setLeftImgUrl] = useState("");
  const [rightImgUrl, setRightImgUrl] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [totalUploadProgress, setTotalUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [fimgError, setFimgError] = useState(false);
  const [bimgError, setBimgError] = useState(false);
  const [limgError, setLimgError] = useState(false);
  const [rimgError, setrImgError] = useState(false);
  const [mileageError, setMileageError] = useState(false);
  const [gasLevelError, setGasLevelError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = useContext(DriverContext);
  const { front, back, left, right, clearall } = useContext(
    ImageContainerContext
  );
  const {
    setScreen,
    userType,
    selectedValet,
    onCreateValet,
    valetData,
    onValetExists,
    exists,
    onStartValet,
    startedValet,
    isError,
    setIsError,
  } = useContext(ValetContext);
  const { error } = useContext(ErrorContext);

  useEffect(() => {
    handleProgress();
  }, [progressFront, progressBack, progressLeft, progressRight]);

  // calculate the progress from the image upload
  const handleProgress = () => {
    const progressValues = [
      progressFront,
      progressBack,
      progressLeft,
      progressRight,
    ];
    const validProgressValues = progressValues.filter(
      (value) => typeof value === "number" && !isNaN(value)
    );
    const averageProgress =
      validProgressValues.reduce((sum, value) => sum + value, 0) /
      validProgressValues.length;
    setTotalUploadProgress(averageProgress);
  };

  const uploadImages = async () => {
    setLoading(true);
    setIsError(false);
    setErrorMessage("");
    setFimgError(false);
    setBimgError(false);
    setLimgError(false);
    setrImgError(false);
    setMileageError(false);
    setGasLevelError(false);
    if (userType !== "customer") {
      await onValetExists(selectedValet.order[0].orderId);
      if (exists) throw new Error("Valet already started");
    }
    setInProgress(true);
    if (
      isObjEmpty(front) ||
      isObjEmpty(back) ||
      isObjEmpty(left) ||
      isObjEmpty(right)
    ) {
      setErrorMessage("Please take all pictures");
      setIsError(true);
    }
    if (front === "") {
      setFimgError(true);
      setIsError(true);
    }
    if (back === "") {
      setBimgError(true);
      setIsError(true);
    }
    if (left === "") {
      setLimgError(true);
      setIsError(true);
    }
    if (right === "") {
      setrImgError(true);
      setIsError(true);
    }
    if (mileage === "") {
      setMileageError(true);
      setIsError(true);
    }
    if (gasLevel === "") {
      setGasLevelError(true);
      setIsError(true);
    }
    if (error || isError) {
      setInProgress(false);
      return;
    }

    try {
      const frontUrl =
        frontImgUrl ||
        (await handleUpload(front, (progress: any) => {
          setProgressFront(Number.parseInt(progress));
        }));
      setFrontImgUrl(frontUrl);
      const rightUrl =
        rightImgUrl ||
        (await handleUpload(right, (progress: any) => {
          setProgressRight(Number.parseInt(progress));
        }));
      setRightImgUrl(rightUrl);
      const backUrl =
        backImgUrl ||
        (await handleUpload(back, (progress: any) => {
          setProgressBack(Number.parseInt(progress));
        }));
      setBackImgUrl(backUrl);
      const leftUrl =
        leftImgUrl ||
        (await handleUpload(left, (progress: any) => {
          setProgressLeft(Number.parseInt(progress));
        }));
      setLeftImgUrl(leftUrl);
    } catch (error: any) {
    }
    // console.log(userType);

    // const datas = {
    //   frontImage: frontUrl,
    //   backImage: backUrl,
    //   leftImage: leftUrl,
    //   rightImage: rightUrl,
    //   mileage: Number.parseInt(mileage),
    //   gasLevel: Number.parseInt(gasLevel),
    //   comments: comments,
    //   customerId: selectedValet.customerId ?? startedValet.customer.userId,
    //   dealershipId: selectedValet.dealership.dealershipId,
    //   orderId: selectedValet.order[0].orderId ?? startedValet.order.orderId,
    //   userType: userType,
    // };
    // console.log("datas", datas);

    // console.log("selectedValet", startedValet);

    // const datas = {
    //   userType: userType,
    //   customerId: selectedValet.customerId || startedValet.customer.userId,
    //   dealershipId:
    //     selectedValet.dealership.dealershipId || startedValet.dealershipId,
    //   orderId: selectedValet.order.orderId || startedValet.order.orderId,
    //   backImage:
    //     "https://media.istockphoto.com/id/854923054/photo/three-dimensional-modern-white-car.jpg?s=2048x2048&w=is&k=20&c=FIGHMkABg9xpB4vHMEOcCjVRZzw3ogGbLJVpSAryJmw=",
    //   rightImage:
    //     "https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=2048x2048&w=is&k=20&c=u_vqLBX3koM67osQVXrWogzYtvgpx__mORzyfBLXo6U=",
    //   frontImage:
    //     "https://media.istockphoto.com/id/1154617648/photo/3d-illustration-of-generic-compact-car-front-view.jpg?s=2048x2048&w=is&k=20&c=scw578Hsr_L2-857IQz9oiiTBJIdovTMlLuISOrKuF4=",
    //   leftImage:
    //     "https://media.istockphoto.com/id/1135255668/photo/blue-hatchback-car.jpg?s=1024x1024&w=is&k=20&c=KDl9n7tu0f73NiymNk_G_KOzIvtijZSJkVWLZ7s8L1Y=",
    //   comments: "something something......",
    //   gasLevel: 100,
    //   mileage: 1000,
    // };
    // chek if the order id is in the selected valet or started valet and check if the order is an object or an array and get the id
    const orderId = !isObjEmpty(selectedValet) ? Array.isArray(selectedValet.order) ? selectedValet.order[0].orderId : selectedValet.order.orderId : !isObjEmpty(startedValet) ? Array.isArray(startedValet.order) ? startedValet.order[0].orderId : startedValet.order.orderId : "";
    // check if the customer id is in the selected valet or started valet and get the id
    const customerId = selectedValet.customerId || startedValet.customer.userId;
    if (userType === "dealership") {
      console.log(orderId)
      try {
        const create = await onCreateValet({
          frontImage: frontImgUrl,
          backImage: backImgUrl,
          leftImage: leftImgUrl,
          rightImage: rightImgUrl,
          mileage: Number.parseInt(mileage),
          gasLevel: Number.parseInt(gasLevel),
          comments: comments,
          customerId: customerId,
          dealershipId: selectedValet.dealership.dealershipId,
          orderId: orderId,
          userType: userType,
        });
        if (create) navigation.navigate("Map");
      } catch (error: any) {
      } finally {
        setInProgress(false);
        setLoading(false);
      }
    } else if (userType === "customer") {
      try {
        const start = await onStartValet(
          ValetStatus.CUSTOMER_VEHICLE_PICK_UP,
          valetData.valetId || startedValet.valetId,
          {
            frontImage: frontImgUrl,
            backImage: backImgUrl,
            leftImage: leftImgUrl,
            rightImage: rightImgUrl,
            mileage: Number.parseInt(mileage),
            gasLevel: Number.parseInt(gasLevel),
            comments: comments,
            customerId: customerId,
            dealershipId: selectedValet.dealership.dealershipId,
            orderId: orderId,
            userType: userType,
          }
        );
        if (start) navigation.navigate("Map");
      } catch (error: any) {
        setIsError(true);
      } finally {
        setInProgress(false);
        setLoading(false);
      }
    }
  };

  const handleUpload = async (image: any, cb: any) => {
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    const data = await uploadToFirebase(
      image,
      `valet_vehicle_checks/${profile.username}/${fileName}`,
      (progress: any) => {
        cb(progress.toFixed(0));
      }
    );
    return data.url;
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollViewContainer>
          <>
            <UploadProgress />
            <Spacer variant="top.large" />
            <Label title2={true}>Loaner Car: All Side Picture</Label>
            <Spacer variant="top.medium" />
            <ScrollView>
              <>
                <Spacer variant="top.large" />
                <Label title2={true}>Front</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"front"} />
                <ErrorMessage>
                  {fimgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <Label title2={true}>Right</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"right"} />
                <ErrorMessage>
                  {rimgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <Label title2={true}>Back</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"back"} />
                <ErrorMessage>
                  {bimgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <Label title2={true}>Left</Label>
                <Spacer variant="top.small" />
                <CamCardComponent side={"left"} />
                <ErrorMessage>
                  {limgError ? "Please take a picture" : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <LabelFormComponent size={"100%"}>
                  Car Mileage
                </LabelFormComponent>
                <Spacer variant="top.small" />
                <InputComponent
                  placeholder="Enter Car Mileage"
                  onChangeText={(e) => setMileage(e)}
                />
                <Spacer variant="top.small" />
                <ErrorMessage>
                  {mileage === "" && mileageError
                    ? "This field is required"
                    : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <LabelFormComponent size={"100%"}>Gas Level</LabelFormComponent>
                <Spacer variant="top.small" />
                <InputComponent
                  placeholder="Enter Gas Level"
                  onChangeText={(e) => setGasLevel(e)}
                />
                <Spacer variant="top.small" />
                <ErrorMessage>
                  {gasLevel === "" && gasLevelError
                    ? "This field is required"
                    : ""}
                </ErrorMessage>
                <Spacer variant="top.large" />
                <LabelFormComponent size={"100%"}>Comments</LabelFormComponent>
                <Spacer variant="top.small" />
                <TextInput
                  placeholder="Enter Comments"
                  onChangeText={(e: any) => setComments(e)}
                  multiline
                  height={"300px"}
                />
                <Spacer variant="top.small" />
              </>
              <Spacer variant="top.large" />
            </ScrollView>
            <Spacer variant="top.large" />
          </>
        </ScrollViewContainer>
      </KeyboardAvoidingView>
      <ButtonContainer>
        <ButtonComponent
          title="Next"
          onPress={() => uploadImages()}
          loading={loading}
        >
          <ProceedSvg width={23} height={23} />
        </ButtonComponent>
      </ButtonContainer>
      {inProgress && (
        <OverlayComponent
          override={true}
          onCancel={() => console.log("hello cancel")}
          onConfirm={() => console.log("hello confirm")}
        >
          {totalUploadProgress !== 100 && (
            <Label
              title2={true}
              inverted={true}
            >{`${totalUploadProgress.toFixed(0)}%`}</Label>
          )}
          {totalUploadProgress === 100 && (
            <Label title2={true} inverted={true}>
              Please wait...
            </Label>
          )}
        </OverlayComponent>
      )}
      {error && <ErrorComponent errorMessage={error} />}
    </>
  );
};
