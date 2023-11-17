import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components/native";
interface TextProps {
  inverted?: boolean;
}
const Label = styled.Text<TextProps>`
  color: ${(props) =>
    props.inverted
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.title2};
  line-height: 23px;
  letter-spacing: 0.36px;
`;

const Title = styled.Text<TextProps>`
  color: #313638;
  font-family: ${(props) => props.theme.fonts.neueMedium};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.24px;
`;

const Title2 = styled.Text<TextProps>`
  color: ${(props: any) =>
    props.inverted
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
  line-height: 23px;
  letter-spacing: 0.36px;
`;

const Title3 = styled.Text<TextProps>`
  color: #eae6e5;
  font-family: ${(props) => props.theme.fonts.neueMedium};
  font-size: 16px;
  font-style: normal;
  letter-spacing: 0.2px;
`;

const DateTitle = styled.Text<TextProps>`
  color: ${(props) => props.theme.colors.text.green};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.title2};
  line-height: 23px;
  letter-spacing: 0.36px;
  font-weight: 500;
`;

interface LabelComponentProps {
  title?: boolean;
  title1?: boolean;
  title2?: boolean;
  dateTitle?: boolean;
  title3?: boolean;
  inverted?: boolean;
  styles?: any; // Replace 'any' with the type of your styles
}

export const LabelComponent: FC<PropsWithChildren<LabelComponentProps>> = ({
  children,
  title = false,
  title2 = false,
  dateTitle = false,
  title3 = false,
  inverted = false,
  styles,
}) => {
  return (
    <>
      {!title && !title2 && !dateTitle && !title3 && (
        <Label style={styles} inverted={inverted}>
          {children}
        </Label>
      )}
      {title && (
        <Title style={styles} inverted={inverted}>
          {children}
        </Title>
      )}
      {title2 && (
        <Title2 style={styles} inverted={inverted}>
          {children}
        </Title2>
      )}
      {dateTitle && (
        <DateTitle style={styles} inverted={inverted}>
          {children}
        </DateTitle>
      )}
      {title3 && (
        <Title3 style={styles} inverted={inverted}>
          {children}
        </Title3>
      )}
    </>
  );
};
