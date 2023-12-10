import React, { FC, useContext, useState } from "react";
import {
  LabelComponent as Label,
  LabelComponent,
} from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import styled from "styled-components/native";
import { CamCardComponent } from "../components/camera.card.component";
import { ImageContainerContext } from "../../../infrastructure/service/driver/context/utils/imageObjectContainer";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";
import * as ImagePicker from "expo-image-picker";
import { LabelFormComponent } from "../../../components/typography";
import { InputComponent } from "../../../components/input.component";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateSvg from "../../../../assets/svgs/date";

const MContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const DateTimePickerContainer = styled.Pressable<any>`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.formColors.border};
  width: 100%;
  height: ${(props) => props.height || "60px"};
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


interface DriverProfileScreenProps {
  navigation: any;
}

export const DriverLicenseScreen: FC<DriverProfileScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const { error, setError } = useContext(ErrorContext);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const {
    frontImage,
    backImage,
    setBackImage,
    setFrontImage,
    setExpirationDate,
    expirationDateError,
    licenseState,
    setLicenseState,
    licenseStateError,
    setLicenseStateError,
    licenseNumber,
    setLicenseNumberError,
    licenseNumberError,
    setLicenseNumber,
  } = useContext(ImageContainerContext);

  const pickImage = async (type: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError!("Sorry, we need camera roll permissions to make this work!");
    }
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (type === "front") setFrontImage!(result.assets[0].uri);
      else setBackImage!(result.assets[0].uri);
    }
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setExpirationDate!(currentDate.toDateString());
    setShowDateTimePicker(false);
  };

  const renderDateTimePicker = () => {
    return (
      <RNDateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
        onTouchCancel={() => setShowDateTimePicker(false)}
      />
    );
  };

  return (
    <>
      <MContainer>
        <>
          <Spacer variant="top.large" />
          <LabelComponent title1={true}>License Front Picture</LabelComponent>
          <CamCardComponent onPress={() => pickImage("front")} imageLink={frontImage ?? ""} />
          <Spacer variant="top.large" />
          <LabelComponent title1={true}>License Back Picture</LabelComponent>
          <CamCardComponent onPress={() => pickImage("back")} imageLink={backImage ?? ""} />
          <Spacer variant="top.large" />
          <Label title2={true}>Tap here to upload profile picture.</Label>
          <Spacer variant="top.large" />
          <LabelFormComponent size={"100%"}>Expiration Date</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <DateTimePickerContainer
              onPress={() => setShowDateTimePicker(!showDateTimePicker)}
            >
              {showDateTimePicker && renderDateTimePicker()}
              <LabelComponent title2={true}>
                {date.toDateString()}
              </LabelComponent>
              <DateSvg width={24} height={24} />
            </DateTimePickerContainer>
          {expirationDateError && <ErrorText>Expiration Date</ErrorText>}
          <Spacer variant="top.large" />
          <LabelFormComponent>License State</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={licenseState}
            onChangeText={(text) => {
              if (text.length === 0) {
                setLicenseStateError!(true);
              }
              if (text.length > 0 && licenseStateError) {
                setLicenseStateError!(false);
              }
              setLicenseState!(text);
            }}
            isError={licenseStateError}
          />
          {licenseStateError && <ErrorText>State Required</ErrorText>}
          <Spacer variant="top.large" />
          <LabelFormComponent>License Number</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={licenseNumber}
            onChangeText={(text) => {
              if (text.length === 0) {
                setLicenseNumberError!(true);
              }
              if (text.length > 0 && licenseNumberError) {
                setLicenseNumberError!(false);
              }
              setLicenseNumber!(text);
            }}
            isError={licenseNumberError}
          />
          {licenseNumberError && <ErrorText>License Number Required</ErrorText>}
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
        </>
      </MContainer>
    </>
  );
};
