import React, { FC } from "react";
import styled from "styled-components/native";
import { LabelComponent as Label } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { RadioComponent } from "../../../components/radio.component";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TopRowView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0;
`;

const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  padding: 0;
`;

const ColumnView = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  width: 100%;
`;

const RbDescription = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.title};
`;

const RbContainer = styled.View`
  margin: 8px;
`;

interface RadioButtonsProps {
  label?: string;
  data: any;
}

export const RadioButtons: FC<RadioButtonsProps> = ({ label, data }) => {
  return (
    <>
      {label && (
        <Container>
          <ColumnView>
            <TopRowView>
              <RowView>
                <RbContainer>
                  <RbDescription>Yes</RbDescription>
                </RbContainer>
                <RbContainer>
                  <RbDescription>No</RbDescription>
                </RbContainer>
              </RowView>
            </TopRowView>
            <TopRowView>
              <RowView>
                <Label>{label}</Label>
              </RowView>
              <RowView>
                <RadioComponent value="yes" />
                <RadioComponent value="no" />
              </RowView>
            </TopRowView>
          </ColumnView>
        </Container>
      )}
    </>
  );
};
