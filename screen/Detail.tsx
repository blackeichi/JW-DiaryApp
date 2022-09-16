import {
  faArrowLeft,
  faMarker,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Alert, Text, View } from "react-native";
import styled from "styled-components/native";
import { useDB } from "../utils/context";
import { DiaryText, DiaryTitle } from "./Home";
import {
  BigDate,
  Body,
  DateBox,
  EmotionBoxOpen,
  EmotionText,
  Header,
  HeaderBtn,
  LittleDate,
  UnderLine,
} from "./Write";
const Container = styled.View`
  background-color: ${(props) => props.theme.bgColor};
  flex: 1;
`;
export const Detail = ({
  navigation,
  route: {
    params: { params },
  },
}) => {
  const content = params.content;
  const realm = useDB();
  const onDelete = (id) => {
    Alert.alert("삭제", "정말 삭제하시겠어요?", [
      { text: "아니요", onPress: () => null, style: "cancel" },
      {
        text: "네",
        onPress: () => {
          realm.write(() => {
            const delText = realm.objectForPrimaryKey("Text", id);
            realm.delete(delText);
          });
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <Container>
      <Header>
        <HeaderBtn onPress={navigation.goBack}>
          <FontAwesomeIcon color="white" size={22} icon={faArrowLeft} />
        </HeaderBtn>
        <View style={{ flexDirection: "row" }}>
          <HeaderBtn
            style={{ marginRight: 30 }}
            onPress={() =>
              navigation.navigate("Edit", {
                params: { content },
              })
            }
          >
            <FontAwesomeIcon color="white" size={22} icon={faMarker} />
          </HeaderBtn>
          <HeaderBtn onPress={() => onDelete(content._id)}>
            <FontAwesomeIcon color="white" size={22} icon={faTrash} />
          </HeaderBtn>
        </View>
      </Header>
      <Body>
        <EmotionBoxOpen>
          <EmotionText>{content.emotion}</EmotionText>
        </EmotionBoxOpen>
        <DateBox>
          <View>
            <UnderLine />
            <BigDate>{content.date}</BigDate>
          </View>
          <LittleDate>{content.month}월</LittleDate>
          <LittleDate>{content.year}</LittleDate>
        </DateBox>
        <View style={{ marginTop: 10 }}>
          <DiaryTitle>{content.title}</DiaryTitle>
          <DiaryText>{content.content}</DiaryText>
        </View>
      </Body>
    </Container>
  );
};
