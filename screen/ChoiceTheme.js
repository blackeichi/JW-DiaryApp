import React, { useRef, useState } from "react";
import { Animated, PanResponder, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useDB } from "../utils/context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
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
const Info = styled.Text`
  flex: 0.5;
`;
const ChoiceBtn = styled.TouchableOpacity`
  flex: 0.5;
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
        console.log(dx);
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
    <Container>
      <CardContainer>
        <Card
          {...(dark ? null : { ...secondRespoder.panHandlers })}
          style={
            dark
              ? { transform: [{ translateX: secondPosition }] }
              : { transform: [{ translateX: position2 }] }
          }
        >
          <Text>Hi</Text>
        </Card>
        <Card
          {...(dark ? { ...panRespoder.panHandlers } : null)}
          style={
            dark
              ? { transform: [{ translateX: position }] }
              : { transform: [{ translateX: secondPosition2 }] }
          }
        >
          <Text>hello</Text>
        </Card>
      </CardContainer>
      <ChoiceBtn onPress={onSubmit}>
        <Text>선택</Text>
      </ChoiceBtn>
      <Info>카드를 드래그하여 옆으로 넘기세요.</Info>
    </Container>
  );
};
