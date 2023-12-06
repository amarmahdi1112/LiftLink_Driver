import React, { FC, useContext, useState } from "react";
import { LabelComponent as Label } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import styled from "styled-components/native";
import { ButtonComponent } from "../../../components/button.component";
import { CamCardComponent } from "../components/camera.card.component";
import { ImageContainerContext } from "../utils/imageObjectContainer";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import ProceedSvg from "../../../../assets/svgs/proceed";

const MContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  top: 470px;
  padding-left: 30px;
  padding-right: 30px;
  position: absolute;
  z-index: 2;
`;

interface DriverProfileScreenProps {
  navigation: any;
}

export const DriverProfileScreen: FC<DriverProfileScreenProps> = ({
  navigation,
}) => {
  const { onUpdateProfilePicture } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { imageObject, clearImageObject } = useContext(ImageContainerContext);
  const { error, setError } = useContext(ErrorContext);

  const handleUpload = async () => {
    setLoading(true);
    // console.log("imageObject", imageObject)
    // const imageKey = `object_${Object.keys(imageObject).length - 1}`;
    // const fileName = imageObject[imageKey].substring(
    //   imageObject[imageKey].lastIndexOf("/") + 1
    // );
    try {
      await onUpdateProfilePicture!(imageObject as any);
    } catch (error: any) {
    } finally {
      clearImageObject();
      setLoading(false);
    }
  };

  return (
    <>
      <MContainer>
        <>
          <Spacer variant="top.large" />
          <CamCardComponent />
          <Spacer variant="top.large" />
          <Label title2={true}>Tap here to upload profile picture.</Label>
        </>
      </MContainer>
      <ButtonContainer>
        <ButtonComponent
          loading={loading}
          title="Next"
          onPress={async () => {
            if (
              typeof imageObject !== "undefined" &&
              Object.keys(imageObject).length !== 0
            ) {
              await handleUpload();
            } else {
              setError("Please upload a profile picture.");
              setLoading(false);
            }
          }}
        >
          <ProceedSvg width={23} height={23} />
        </ButtonComponent>
      </ButtonContainer>
    </>
  );
};
