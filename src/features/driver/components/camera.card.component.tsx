import React, { useState, useContext, useEffect, FC } from "react";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import UploadBtnIcon from "../../../../assets/svgs/upload_btn";
import * as ImagePicker from "expo-image-picker";
import { ImageContainerContext } from "../../../infrastructure/service/driver/context/utils/imageObjectContainer";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";

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
  height: 160px;
  width: 150px;
  border-radius: 20px;
  resize-mode: cover;
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
  onPress?: () => void;
}

export const CamCardComponent: FC<CamCardProps> = ({
  imageLink,
  onPress,
  _key,
  clearContainer,
}) => {
  const [image, setImage] = useState(null);
  const { imageObject, setImageObject } = useContext(ImageContainerContext);
  const { setError } = useContext(ErrorContext);

  const pickImage = async () => {
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
      setImage(result.assets[0].uri);
      setImageObject(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      setError!("Sorry, we need camera roll permissions to make this work!");
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
    <CardComponent key={_key as any} overrideChildren={true} bordered={true} style={{
      height: 160,
    }}>
      <CustomCard>
        {image && !imageLink ? (
          <Picture
            source={{ uri: image }}
          />
        ) : null}
        {!image && imageLink && (
          <Picture
            source={{ uri: imageLink }}
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
            />
          )}
        {!image && !imageLink && <ButtonContainer>
          <Button onPress={onPress ?? pickImage}>
            <UploadBtnIcon />
          </Button>
        </ButtonContainer>}
      </CustomCard>
    </CardComponent>
  );
};
