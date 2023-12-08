import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components/native";
import CancelSvg from "../../assets/svgs/cancel";
import { LabelComponent } from "./typography";
import { ButtonComponent } from "./button.component";
import ConfirmSvg from "../../assets/svgs/confirm";

const Overlay = styled.View<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(10px);
  z-index: 2;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height ? props.height : "auto"};
`;

const OverlayContent = styled.View`
  position: absolute;
  background-color: white;
  padding-top: 0px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-150px, -125px);
  border-radius: 20px;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.bg.inverse};
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ConfirmButton = styled(ButtonComponent)`
  background-color: ${(props) => props.theme.colors.buttonColors.primary};
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const ChildrenContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
`;

interface OverlayComponentProps {
  onCancel: () => void;
  onConfirm: () => void;
  btnText?: string;
  override?: boolean;
  style?: any; 
  onPress?: () => void; 
  height?: string;
}

export const OverlayComponent: FC<PropsWithChildren<OverlayComponentProps>> = ({
  children,
  onCancel,
  onConfirm,
  btnText,
  override = false,
  style = {},
  height = "auto",
}) => {
  return (
    <>
      {!override && (
        <Overlay height={height}>
          <OverlayContent>
            <CancelButton onPress={onCancel}>
              <CancelSvg width={24} height={24} />
            </CancelButton>
            <ChildrenContainer>{children}</ChildrenContainer>
            <ConfirmButton onPress={onConfirm} title={btnText || "Confirm"}>
              <ConfirmSvg isIcon={true} width={24} height={24} />
            </ConfirmButton>
          </OverlayContent>
        </Overlay>
      )}
      {override && <Overlay height={height} style={style}>{children}</Overlay>}
    </>
  );
};
