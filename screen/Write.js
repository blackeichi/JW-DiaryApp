import { faMarker, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { useDB } from "../utils/context";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;
export const Header = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
export const HeaderBtn = styled.TouchableOpacity``;
const HeaderSubmitBtn = styled.TouchableOpacity`
  background-color: rgb(0, 122, 255);
  padding: 4px 10px;
  border-radius: 5px;
`;
export const Body = styled.View`
  flex: 1;
  padding: 5px 10px;
`;
const DateBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BigDate = styled.Text`
  color: white;
  margin-right: 5px;
  font-weight: 700;
  font-size: 25px;
`;
const UnderLine = styled.View`
  background-color: ${(props) => props.theme.lineColor};
  width: 32px;
  height: 8px;
  position: absolute;
  bottom: 3px;
`;
const LittleDate = styled.Text`
  color: white;
  margin-right: 5px;
  font-weight: 700;
  font-size: 15px;
`;
const EmotionBoxOpen = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 5px;
`;
const EmotionText = styled.Text`
  font-size: 25px;
`;
const WriteBox = styled.View`
  margin-top: 10px;
`;
const WriteText = styled.TextInput`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;
const EmotionBox = styled.View`
  position: absolute;
  background-color: ${(props) => props.theme.bgColor};
  width: 300px;
  height: 150px;
  top: 70px;
  right: 20px;
`;
const TextTitle = styled.Text`
  color: white;
  font-weight: 700;
  padding: 13px 10px;
  position: absolute;
  font-size: 15px;
`;
const EmotionBox2 = styled.View`
  margin-top: 35px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
const Emotion = styled.TouchableOpacity`
  margin: 10px;
`;
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const Write = ({ navigation: { goBack } }) => {
  const emotions = ["😐", "😀", "😆", "🥰", "🤔", "😥", "🤬", "😷", "😨", "😴"];
  const [selectedEmo, setselectedEmo] = useState("😐");
  const [open, setOpen] = useState(true);
  const Today = new Date();
  const year = Today.getFullYear();
  const month = Today.getMonth();
  const date = Today.getDate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const onChangeTitle = (content) => {
    setTitle(content);
  };
  const onChangeText = (content) => {
    setText(content);
  };
  const nextInput = useRef();
  const onNext = () => {
    nextInput.current.focus();
  };
  const realm = useDB();
  const onSubmit = () => {
    realm.write(() => {
      realm.create("Text", {
        _id: Date.now(),
        emotion: selectedEmo,
        title,
        content: text,
        year,
        month,
        date,
      });
    });
    setselectedEmo("😐");
    setOpen("");
    setTitle("");
    setText("");
    goBack();
  };
  return (
    <Container>
      <Header>
        <HeaderBtn onPress={() => goBack()}>
          <FontAwesomeIcon color="white" size={22} icon={faXmark} />
        </HeaderBtn>
        <HeaderSubmitBtn onPress={onSubmit}>
          <Text style={{ color: "white", fontWeight: "700" }}>저장</Text>
        </HeaderSubmitBtn>
      </Header>
      <Body>
        <EmotionBoxOpen onPress={() => setOpen((prev) => !prev)}>
          <EmotionText>{selectedEmo}</EmotionText>
        </EmotionBoxOpen>
        <DateBox>
          <View>
            <UnderLine />
            <BigDate>{Today.getDate()}</BigDate>
          </View>
          <LittleDate>{Today.getMonth()}월</LittleDate>
          <LittleDate>{Today.getFullYear()}</LittleDate>
        </DateBox>
        <WriteBox>
          <WriteText
            returnKeyType="next"
            placeholder="표제"
            placeholderTextColor="gray"
            value={title}
            onChangeText={onChangeTitle}
            onSubmitEditing={onNext}
            autoCorrect={false}
          />
          <WriteText
            ref={nextInput}
            onChangeText={onChangeText}
            returnKeyType="done"
            placeholder="여기에 더 많이 쓰세요..."
            placeholderTextColor="gray"
            value={text}
            onSubmitEditing={onSubmit}
            autoCorrect={false}
          />
        </WriteBox>
      </Body>
      {open ? (
        <>
          <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
            <Overlay style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
          <EmotionBox>
            <TextTitle>오늘은 어때?</TextTitle>
            <EmotionBox2>
              {emotions.map((emotion, index) => (
                <Emotion
                  key={index}
                  onPress={() => {
                    setselectedEmo(emotion);
                    setOpen((prev) => !prev);
                  }}
                >
                  <EmotionText>{emotion}</EmotionText>
                </Emotion>
              ))}
            </EmotionBox2>
          </EmotionBox>
        </>
      ) : null}
    </Container>
  );
};
