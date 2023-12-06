/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext, FC } from "react";
import { LabelComponent } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { ButtonComponent } from "../../../components/button.component";
import styled from "styled-components/native";
import { InputComponent } from "../../../components/input.component";
import { isObjEmpty } from "../../main/screen/main.screen";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import CheckSvg from "../../../../assets/svgs/check";
import { SecondaryPageView } from "../../../components/utils/secondary.page.view.component";
import { AvatarComponent } from "../../../components/utils/avatar.component";
import { theme } from "../../../infrastructure/theme";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";
import * as ImagePicker from "expo-image-picker";

interface ProfileScreenProps {
  navigation: any;
}

const ProfilePictureContainer = styled.View`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
  height: 200px;
`;

const ButtonContainer = styled.View`
  width: 80%;
`;

export const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const { profile, onGetUserData } = useContext(DriverContext);
  const { onChangeEmail, updateNames, onUpdateProfilePicture } =
    useContext(AuthContext);
  const { error, setError } = useContext(ErrorContext);
  const [firstName, setFirstName] = useState<string>("");
  const [oldFirstName, setOldFirstName] = useState<string>("");
  // const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [oldLastName, setOldLastName] = useState<string>("");
  // const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [oldEmail, setOldEmail] = useState<string>("");
  // const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [oldPhoneNumber, setOldPhoneNumber] = useState<string>("");
  // const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  // const [imageObject, setImageObject] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isObjEmpty(profile)) {
      setFirstName(profile?.firstName);
      setOldFirstName(profile?.firstName);
      setLastName(profile?.lastName);
      setOldLastName(profile?.lastName);
      setEmail(profile?.email);
      setOldEmail(profile?.email);
      setPhoneNumber(profile?.phoneNumber);
      setOldPhoneNumber(profile?.phoneNumber);
    }
  }, [profile]);

  const onSubmit = async () => {
    setLoading(true);
    if (
      firstName === oldFirstName &&
      lastName === oldLastName &&
      email === oldEmail &&
      phoneNumber === oldPhoneNumber
    ) {
      setError!("No changes made");
    } else {
      let error = false;
      try {
        if (firstName !== oldFirstName) {
          await updateNames!(firstName, lastName);
        }
        if (lastName !== oldLastName) {
          await updateNames!(firstName, lastName);
        }
        if (email !== oldEmail) {
          await onChangeEmail!(email);
        }
        await onGetUserData!();
      } catch (error: any) {
        error = true;
        setError!(error.message);
      } finally {
        if (!error) navigation.navigate("Home");
        setLoading(false);
      }
    }
  };

  const pickImage = async () => {
    setLoading(true);
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setError("Sorry, we need camera roll permissions to make this work!");
      }
      let result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        await onUpdateProfilePicture!(result.assets[0].uri);
      }
    } catch (error: any) {
      setError!(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError!("");
      }, 3000);
    }
  }, [error]);

  return (
    <SecondaryPageView
      navigation={navigation}
      buttonAction={onSubmit}
      buttonLoading={loading}
    >
      <Spacer variant="top.large" />
      <ProfilePictureContainer>
        <AvatarComponent
          imageUrl={profile?.profilePicture[0].pictureLink}
          width={150}
          height={150}
        />
        <Spacer variant="top.large" />
        <ButtonContainer>
          <ButtonComponent
            title="Change"
            background={theme.colors.buttonColors.primary}
            onPress={pickImage}
          >
            <CheckSvg />
          </ButtonComponent>
        </ButtonContainer>
      </ProfilePictureContainer>
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
      <LabelComponent>First Name</LabelComponent>
      <InputComponent
        disabled={loading}
        value={firstName}
        placeholder="Enter your first name"
        onChangeText={(value: string) => {
          setFirstName(value);
        }}
      />
      <Spacer variant="top.large" />
      <LabelComponent>Last Name</LabelComponent>
      <InputComponent
        disabled={loading}
        value={lastName}
        placeholder="Enter your last name"
        onChangeText={(value: string) => {
          setLastName(value);
        }}
      />
      <Spacer variant="top.large" />
      <LabelComponent>Email</LabelComponent>
      <InputComponent
        disabled={loading}
        value={email}
        placeholder="Enter your email"
        onChangeText={(value: string) => {
          setEmail(value);
        }}
      />
      <Spacer variant="top.large" />
      <LabelComponent>Phone Number</LabelComponent>
      <InputComponent
        disabled={true}
        value={phoneNumber}
        placeholder="Enter your phone number"
        onChangeText={(value: string) => {
          setPhoneNumber(value);
        }}
      />
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
    </SecondaryPageView>
  );
};
