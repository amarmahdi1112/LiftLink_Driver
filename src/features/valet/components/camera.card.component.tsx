import React, { useState, useContext, useEffect, FC } from "react";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import UploadBtnIcon from "../../../../assets/svgs/upload_btn";
import * as ImagePicker from "expo-image-picker";
import { ImageContainerContext } from "../utils/imageObjectContainer";
import UploadCamIcon from "../../../../assets/svgs/upload_cam";

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

interface CamCardComponentProps {
  imageLink?: string;
  clearContainer?: boolean;
  side?: string;
}

export const CamCardComponent: FC<CamCardComponentProps> = ({ imageLink, clearContainer, side }) => {
  const [image, setImage] = useState(null);
  const {
    front,
    setFront,
    clearfront,
    back,
    setBack,
    clearback,
    left,
    setLeft,
    clearleft,
    right,
    setRight,
    clearright,
    clearall,
  } = useContext(ImageContainerContext);

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
      if (side === "front") {
        setFront(result.assets[0].uri);
      }
      if (side === "back") {
        setBack(result.assets[0].uri);
      }
      if (side === "left") {
        setLeft(result.assets[0].uri);
      }
      if (side === "right") {
        setRight(result.assets[0].uri);
      }
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    try {
      let result: any = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      const { uri } = result.assets[0];
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      if (!result.canceled) {
        setImage(uri);
        if (side === "front") {
          setFront(uri);
        }
        if (side === "back") {
          setBack(uri);
        }
        if (side === "left") {
          setLeft(uri);
        }
        if (side === "right") {
          setRight(uri);
        }
      }
    } catch (error) {
    }
  };

  const onClear = () => {
    if (side === "front") {
      clearfront();
    }
    if (side === "back") {
      clearback();
    }
    if (side === "left") {
      clearleft();
    }
    if (side === "right") {
      clearright();
    }
    setImage(null);
  };

  return (
    <CardComponent
      overrideChildren={true}
      bordered={true}
      size={{
        height: "250px",
        width: "100%",
      }}
      onPress={pickImage}
    >
      <CustomCard>
        {image && !imageLink && side ? (
          <Picture
            source={{ uri: image }}
            onError={(error) => console.log(error, "from image")}
            style={{ width: 280, height: 180, marginBottom: 10 }}
          />
        ) : null}
        {!image && imageLink && !side && (
          <Picture
            source={{ uri: imageLink }}
            onError={(error) => console.log(error, "from image")}
            style={{ width: 180, height: 180, marginBottom: 10 }}
          />
        )}
        {/* {!image &&
          !imageLink &&
          typeof imageObject !== "undefined" &&
          Object.keys(imageObject).length > 0 &&
          !side && (
            <Picture
              source={{
                uri: imageObject[
                  `object_${Object.keys(imageObject).length - 1}`
                ],
              }}
              onError={(error) => console.log(error, "from image")}
              style={{ width: 180, height: 180, marginBottom: 10 }}
            />
          )} */}
        {!image && <UploadCamIcon width={60} height={60} />}
      </CustomCard>
    </CardComponent>
  );
};
