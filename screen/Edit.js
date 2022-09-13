import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDB } from "../utils/context";
import {
  BigDate,
  Body,
  Container,
  DateBox,
  Emotion,
  EmotionBox,
  EmotionBox2,
  EmotionBoxOpen,
  EmotionText,
  Header,
  HeaderBtn,
  HeaderSubmitBtn,
  LittleDate,
  Overlay,
  TextTitle,
  UnderLine,
  WriteBox,
  WriteText,
} from "./Write";

export const Edit = () => {
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
  const onSubmit = () => {};
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
