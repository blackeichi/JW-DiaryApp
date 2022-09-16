import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { useDB } from "../utils/context";
import { darkColor, lightColor } from "../utils/styled";
import { ChoiceTheme } from "../screen/ChoiceTheme";
import { Home } from "../screen/Home";
import { Weather } from "../screen/Weather";
import { Write } from "../screen/Write";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCloud, faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "./Stack";

const Nav = createBottomTabNavigator();

export const Router = () => {
  const [theme2, setTheme] = useState([]);
  const realm = useDB();
  useEffect(() => {
    const theme = realm?.objects("Theme");
    setTheme(theme);
    theme?.addListener(() => {
      const theme = realm?.objects("Theme");
      setTheme(theme);
    });
    return () => {
      theme?.removeAllListeners();
    };
  }, []);
  return (
    <Nav.Navigator
      screenOptions={{
        presentation: "modal",
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            theme2[0]?.themecolr === "dark" ? "#142d4c" : "#ffb5b5",
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Nav.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesomeIcon
              size={size}
              color={focused ? color : "white"}
              icon={faHome}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Nav.Screen
        name="Write"
        component={Write}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesomeIcon
              size={size}
              color={focused ? color : "white"}
              icon={faPlus}
            />
          ),
        }}
      />
      <Nav.Screen
        name="Weather"
        component={Weather}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesomeIcon
              size={size}
              color={focused ? color : "white"}
              icon={faCloud}
            />
          ),
        }}
      />
    </Nav.Navigator>
  );
};
