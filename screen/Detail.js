import {
  faArrowLeft,
  faMarker,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, View } from "react-native";
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
  const realm = useDB();
  const onDelete = (id) => {
    realm.write(() => {
      const delText = realm.objectForPrimaryKey("Text", id);
      realm.delete(delText);
    });
    navigation.goBack();
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
            onPress={() => navigation.navigate("Edit")}
          >
            <FontAwesomeIcon color="white" size={22} icon={faMarker} />
          </HeaderBtn>
          <HeaderBtn onPress={() => onDelete(params.content._id)}>
            <FontAwesomeIcon color="white" size={22} icon={faTrash} />
          </HeaderBtn>
        </View>
      </Header>
      <Body>
        <EmotionBoxOpen>
          <EmotionText>{params.content.emotion}</EmotionText>
        </EmotionBoxOpen>
        <DateBox>
          <View>
            <UnderLine />
            <BigDate>{params.content.date}</BigDate>
          </View>
          <LittleDate>{params.content.month}월</LittleDate>
          <LittleDate>{params.content.year}</LittleDate>
        </DateBox>
        <View style={{ marginTop: 10 }}>
          <DiaryTitle>{params.content.title}</DiaryTitle>
          <DiaryText>{params.content.content}</DiaryText>
        </View>
      </Body>
    </Container>
  );
};
