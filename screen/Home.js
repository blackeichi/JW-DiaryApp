import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";
import { useDB } from "../utils/context";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

export const Home = (Theme) => {
  const realm = useDB();
  const theme = realm.objects("Theme");
  return (
    <Container>
      <Text>home</Text>
      <TouchableOpacity>
        <Text onPress={() => realm.write(() => realm.delete(theme))}>
          Choose Theme
        </Text>
      </TouchableOpacity>
    </Container>
  );
};
