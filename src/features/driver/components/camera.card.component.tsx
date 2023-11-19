import React, { useState, useContext, useEffect, FC } from "react";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import UploadBtnIcon from "../../../../assets/svgs/upload_btn";
import * as ImagePicker from "expo-image-picker";
import { ImageContainerContext } from "../utils/imageObjectContainer";

// const Caption = styled.Text`
//   font-size: ${(props) => props.theme.fontSizes.body};
//   color: ${(props) => props.theme.colors.darkText.inverse};
// `

const CustomCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Picture = styled.Image`
  height: 100%;
  border-radius: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 10px 40px 10px 40px;
  gap: 10px;
  widht: 100%;
`;

const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

interface CamCardProps {
  imageLink?: string;
  _key?: string;
  clearContainer?: boolean;
}

export const CamCardComponent: FC<CamCardProps> = ({
  imageLink,
  _key,
  clearContainer,
}) => {
  const [image, setImage] = useState(null);
  const { imageObject, setImageObject } = useContext(ImageContainerContext);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageObject({
        ...imageObject,
        [`object_${Object.keys(imageObject).length}`]: result.assets[0].uri,
      });
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    try {
      let result: any = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      const { uri } = result.assets[0];
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      if (!result.canceled) {
        setImage(uri);
      }
    } catch (error) {
    }
  };
  return (
    <CardComponent key={_key as any} overrideChildren={true}>
      <CustomCard>
        {image && !imageLink ? (
          <Picture
            source={{ uri: image }}
            style={{ width: 180, height: 180, marginBottom: 10 }}
          />
        ) : null}
        {!image && imageLink && (
          <Picture
            source={{ uri: imageLink }}
            style={{ width: 180, height: 180, marginBottom: 10 }}
          />
        )}
        {!image &&
          !imageLink &&
          typeof imageObject !== "undefined" &&
          Object.keys(imageObject).length > 0 && (
            <Picture
              source={{
                uri: imageObject[
                  `object_${Object.keys(imageObject).length - 1}`
                ],
              }}
              style={{ width: 180, height: 180, marginBottom: 10 }}
            />
          )}
        <ButtonContainer>
          <Button onPress={pickImage}>
            <ButtonLabel>{image ? "Change Image" : "Upload Image"}</ButtonLabel>
            <UploadBtnIcon width={20} height={20} />
          </Button>
        </ButtonContainer>
      </CustomCard>
    </CardComponent>
  );
};
