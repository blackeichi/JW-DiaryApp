import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";
import { useDB } from "../utils/context";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";
import { Header } from "./Write";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Container = styled.View`
  background-color: ${(props) => props.theme.bgColor};
`;
const Bgimg = styled.ImageBackground`
  flex: 1;
`;
const BackColor = styled.View`
  flex: 2;
`;
const Box = styled.View`
  flex: 1;
  align-items: center;
`;
export const Home = () => {
  const realm = useDB();
  const theme = realm.objects("Theme");
  const isDark = theme[0].themecolr === "dark";
  const [diary, setDiary] = useState([]);
  useEffect(() => {
    const content = realm.objects("Text");
    setDiary(content);
    content.addListener(() => {
      const content = realm.objects("Text");
      setDiary(content);
    });
    return () => {
      content.removeAllListeners();
    };
  }, []);
  return (
    <>
      <Container style={StyleSheet.absoluteFill}>
        <Bgimg
          source={
            isDark
              ? {
                  uri: "https://cdn.pixabay.com/photo/2021/12/02/02/59/mountains-6839521_960_720.jpg",
                }
              : {
                  uri: "https://cdn.pixabay.com/photo/2020/04/28/19/36/heart-5106075_960_720.png",
                }
          }
        >
          <LinearGradient
            colors={[
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              isDark ? "#142d4c" : "#ffb5b5",
            ]}
            style={{ height: "100%", width: "100%" }}
          />
        </Bgimg>
        <BackColor />
      </Container>
      <Header>
        <TouchableOpacity
          onPress={() => realm.write(() => realm.delete(theme))}
        >
          <FontAwesomeIcon icon={faImage} color="white" size={25} />
        </TouchableOpacity>
        <Text>home</Text>
      </Header>
      <Box>
        {diary.map((content) => (
          <View key={content._id}>
            <Text>{content.title}</Text>
          </View>
        ))}
      </Box>
    </>
  );
};
