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
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: ${(props) => props.theme.bgColor};
`;
const Bgimg = styled.ImageBackground`
  flex: 1;
`;
const BackColor = styled.View`
  flex: 2;
`;
const Box = styled.ScrollView`
  flex: 1;
  top: 100px;
  margin-bottom: 100px;
`;
const DateBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const BigDate = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  margin-right: 5px;
  font-weight: 700;
  font-size: 30px;
`;
const UnderLine = styled.View`
  background-color: ${(props) => props.theme.lineColor};
  width: 36px;
  height: 8px;
  position: absolute;
  bottom: 3px;
`;
const LittleDate = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  margin-right: 5px;
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 15px;
`;
const DiaryBox = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.boxColor};
  width: 90%;
  padding: 10px 10px;
  border-radius: 10px;
  margin-bottom: 14px;
`;
const DiaryEmo = styled.Text`
  font-size: 25px;
`;
export const DiaryTitle = styled.Text`
  color: white;
  font-size: 15px;
  margin-top: 5px;
  font-weight: 700;
`;
export const DiaryText = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-top: 5px;
`;
export const Home = ({ navigation: { navigate, goBack } }) => {
  const realm = useDB();
  const theme = realm.objects("Theme");
  const isDark = theme[0].themecolr === "dark";
  const [diary, setDiary] = useState([]);
  useEffect(() => {
    const content = realm.objects("Text");
    setDiary(content);
    content.addListener(() => {
      const content = realm.objects("Text");
      setDiary(content.sorted("_id", true));
    });
    return () => {
      content.removeAllListeners();
    };
  }, []);
  const navigation = useNavigation();
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
      <Box contentContainerStyle={{ alignItems: "center" }}>
        {diary.map((content) => (
          <DiaryBox
            key={content._id}
            onPress={() => {
              navigation.navigate("Detail", {
                params: { content },
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <DateBox>
                <View>
                  <UnderLine />
                  <BigDate>{content.date}</BigDate>
                </View>
                <LittleDate>{content.month}월</LittleDate>
              </DateBox>
              <DiaryEmo>{content.emotion}</DiaryEmo>
            </View>

            <DiaryTitle>{content.title}</DiaryTitle>
            <DiaryText>
              {content.content.slice(0, 30)}
              {content.content.length > 30 ? "..." : null}
            </DiaryText>
          </DiaryBox>
        ))}
      </Box>
    </>
  );
};
