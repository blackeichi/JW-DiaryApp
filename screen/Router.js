import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { useDB } from "../utils/context";
import { darkColor, lightColor } from "../utils/styled";
import { ChoiceTheme } from "./ChoiceTheme";
import { Home } from "./Home";
import { Weather } from "./Weather";
import { Write } from "./Write";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Nav = createBottomTabNavigator();

export const Router = () => {
  const [theme2, setTheme] = useState([]);
  const realm = useDB();
  useEffect(() => {
    const theme = realm?.objects("Theme");
    setTheme(theme);
    theme.addListener(() => {
      const theme = realm?.objects("Theme");
      setTheme(theme);
    });
    return () => {
      theme.removeAllListeners();
    };
  }, []);
  return (
    <>
      {theme2[0] === undefined ? (
        <ChoiceTheme />
      ) : (
        <ThemeProvider
          theme={theme2[0].themecolr === "dark" ? darkColor : lightColor}
        >
          <Nav.Navigator
            screenOptions={{
              presentation: "modal",
              headerShown: false,
              tabBarStyle: {
                backgroundColor:
                  theme2[0].themecolr === "dark" ? "#142d4c" : "#ffb5b5",
                borderTopWidth: 0,
                fontSize: 18,
                color: "white",
              },
            }}
          >
            <Nav.Screen
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color }) => (
                  <FontAwesomeIcon icon={faHome} />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Nav.Screen name="Write" component={Write} />
            <Nav.Screen name="Weather" component={Weather} />
          </Nav.Navigator>
        </ThemeProvider>
      )}
    </>
  );
};
