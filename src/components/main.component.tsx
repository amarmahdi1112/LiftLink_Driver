/* eslint-disable react/prop-types */
import React, {
  useContext,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { Container } from "./utils/container.component";
import styled from "styled-components/native";
import Menu from "../../assets/svgs/menu";
import { AvatarComponent } from "./utils/avatar.component";
import { Pressable } from "react-native";
import { isObjEmpty } from "../features/main/screen/main.screen";
import LogoText from "../../assets/svgs/logo_text";
import { LabelComponent } from "./typography";
import BackIcon from "../../assets/svgs/back";
import { DriverContext } from "../infrastructure/service/driver/context/driver.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { ConfirmationContext } from "../infrastructure/service/confirmation/context/confirmation.context";
import { OrderConfirmationContext } from "../infrastructure/service/confirmation/context/order.confirmation.context";
import { AuthContext } from "../infrastructure/service/authentication/context/auth.context";
import { OrdersContext } from "../infrastructure/service/orders/context/orders.context";
import { ValetContext } from "../infrastructure/service/valet/context/valet.context";

const BodyTitleSection = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const LogoSection = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
`;

const LogoTextLight = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
`;

const LogoTextDark = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const HeaderBackground = styled.View`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  width: 100%;
  height: ${(props: any) => (props.showTab ? "220px" : "180px")};
  flex-direction: row;
  z-index: 1;
`;

const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  gap: 52px;
  padding-bottom: 20px;
`;

const PostitionedBackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props: any) => (props.showTab ? "220px" : "180px")};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

interface MainContainerProps {
  children: React.ReactNode;
  title?: string;
  showMenu?: boolean;
  showLogo?: boolean;
  showGreetings?: boolean;
  showAvatar?: boolean;
  showTab?: boolean;
  tabs?: any[];
  styles?: any;
  isLoading?: boolean;
  initial?: boolean;
  secondaryPage?: boolean;
  navigation: any;
  showSecondaryAvatar?: boolean;
}

export const MainContainer: FC<PropsWithChildren<MainContainerProps>> = ({
  children,
  title = "Enhance the Luxury Evolution.",
  showMenu = false,
  showLogo = false,
  showGreetings = false,
  showAvatar = false,
  styles,
  initial = true,
  secondaryPage = false,
  showSecondaryAvatar = false,
  navigation,
}) => {
  const { profile } = useContext(DriverContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isObjEmpty(profile)) {
      setLoading(false);
    }
  }, [profile]);

  return (
    <Container styles={styles}>
      <PostitionedBackgroundImage
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2FheaderBg.png?alt=media&token=1de32137-8230-4e84-b62b-5ca09e633406",
        }}
      />
      <HeaderBackground>
        {showLogo && (
          <>
            <BodyTitleSection>
              <LogoSection>
                <LogoText width={100} height={20} scale={1.2} />
              </LogoSection>
              {initial && (
                <LabelComponent title3={true} inverted={true}>
                  Enhance the Luxury Evolution.
                </LabelComponent>
              )}
            </BodyTitleSection>
          </>
        )}
        {secondaryPage && (
          <Pressable onPress={() => navigation.goBack()}>
            <BackIcon width={32} height={32} />
          </Pressable>
        )}

        {showAvatar && !loading && !isObjEmpty(profile) && (
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <AvatarComponent
              showGreetings={showGreetings}
              fullName={title || `${profile.firstName} ${profile.lastName}`}
              imageUrl={profile.profilePicture[0].pictureLink}
            />
          </Pressable>
        )}

        {showSecondaryAvatar && (
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <AvatarComponent
              imageUrl={profile.profilePicture[0].pictureLink}
            />
          </Pressable>
        )}
        {showMenu && (
          <Pressable
            onPress={async () => {
              navigation.navigate("FindDealerships");
            }}
          >
            <Menu width={32} height={32} />
          </Pressable>
        )}
      </HeaderBackground>
      {children}
    </Container>
  );
};
