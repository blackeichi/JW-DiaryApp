import { BlurView } from "@react-native-community/blur";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useDB } from "../utils/context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  font-weight: 700;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 500px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
`;
const CardContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 9;
`;
const ChoiceBtn = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 122, 255);
  margin-bottom: 30px;
  border-radius: 5px;
`;
const ThemeText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
const ThemeImg = styled.Image`
  border-radius: 12px;
`;

export const ChoiceTheme = () => {
  const realm = useDB();
  const [dark, setDark] = useState(true);
  const position = useRef(new Animated.Value(0)).current;
  const position2 = useRef(new Animated.Value(0)).current;
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goCenter2 = Animated.spring(position2, {
    toValue: 0,
    useNativeDriver: true,
  });
  const secondPosition = position.interpolate({
    inputRange: [-320, 0],
    outputRange: [0, 320],
    extrapolate: "clamp",
  });
  const secondPosition2 = position2.interpolate({
    inputRange: [0, 320],
    outputRange: [-320, 0],
    extrapolate: "clamp",
  });
  const panRespoder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -240) {
          Animated.spring(position, {
            toValue: -320,
            useNativeDriver: true,
            restDisplacementThreshold: 1,
            restSpeedThreshold: 1,
          }).start(() => {
            setDark(false);
            position2.setValue(0);
          });
        } else {
          Animated.parallel([goCenter]).start();
        }
      },
    })
  ).current;
  const secondRespoder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position2.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx > 240) {
          Animated.spring(position2, {
            toValue: 320,
            useNativeDriver: true,
            restDisplacementThreshold: 1,
            restSpeedThreshold: 1,
          }).start(() => {
            setDark(true);
            position.setValue(0);
          });
        } else {
          Animated.parallel([goCenter2]).start();
        }
      },
    })
  ).current;
  const onSubmit = () => {
    ``;
    realm.write(() => {
      if (dark) {
        realm.create("Theme", {
          themecolr: "dark",
        });
      } else {
        realm.create("Theme", {
          themecolr: "light",
        });
      }
    });
  };
  return (
    <>
      <Container>
        <Image
          style={StyleSheet.absoluteFill}
          source={
            dark
              ? {
                  uri: "https://cdn.pixabay.com/photo/2017/01/31/13/40/shooting-star-2024127_960_720.png",
                }
              : {
                  uri: "https://cdn.pixabay.com/photo/2017/02/16/19/47/bokeh-2072271_960_720.jpg",
                }
          }
        />
        <BlurView
          blurAmount={5}
          blurType={dark ? "black" : "light"}
          style={StyleSheet.absoluteFill}
        />
        <Title style={{ color: dark ? "white" : "black" }}>
          일기 테마 선택
        </Title>
        <CardContainer>
          <Card
            {...(dark ? null : { ...secondRespoder.panHandlers })}
            style={
              dark
                ? { transform: [{ translateX: secondPosition }] }
                : { transform: [{ translateX: position2 }] }
            }
          >
            <ThemeImg
              style={StyleSheet.absoluteFill}
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/02/16/19/47/bokeh-2072271_960_720.jpg",
              }}
            />
            <ThemeText>Light Theme</ThemeText>
          </Card>
          <Card
            {...(dark ? { ...panRespoder.panHandlers } : null)}
            style={
              dark
                ? { transform: [{ translateX: position }] }
                : { transform: [{ translateX: secondPosition2 }] }
            }
          >
            <ThemeImg
              style={StyleSheet.absoluteFill}
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/01/31/13/40/shooting-star-2024127_960_720.png",
              }}
            />
            <ThemeText>Dark Theme</ThemeText>
          </Card>
        </CardContainer>

        <ChoiceBtn onPress={onSubmit}>
          <Text style={{ fontSize: 15, fontWeight: "700", color: "white" }}>
            사용하기
          </Text>
        </ChoiceBtn>
      </Container>
    </>
  );
};
