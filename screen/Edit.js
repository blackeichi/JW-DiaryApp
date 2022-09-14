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

export const Edit = ({
  navigation: { goBack, navigate },
  route: {
    params: { params },
  },
}) => {
  const content = params.content;
  const emotions = ["😐", "😀", "😆", "🥰", "🤔", "😥", "🤬", "😷", "😨", "😴"];
  const [selectedEmo, setselectedEmo] = useState(content.emotion);
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState(content.title);
  const [text, setText] = useState(content.content);
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
    if (title === content.title && text === content.content) {
      return goBack();
    } else {
      realm.write(() => {
        const editText = realm.objectForPrimaryKey("Text", content._id);
        editText.title = title;
        editText.content = text;
        editText.emotion = selectedEmo;
      });
      navigate("Home");
    }
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
            <BigDate>{content.date}</BigDate>
          </View>
          <LittleDate>{content.month}월</LittleDate>
          <LittleDate>{content.year}</LittleDate>
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
