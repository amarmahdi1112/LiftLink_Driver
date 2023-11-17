import React from "react";
import styled from "styled-components/native";
import { LabelComponent as Label } from "../../../components/typography/label.component";

const Container = styled.View`
  padding: 0;
`;

export const SubtitleComponent = () => {
  return (
    <Container>
      <Label styles={{ textColor: "white", card: true }}>
        Some description
      </Label>
    </Container>
  );
};
