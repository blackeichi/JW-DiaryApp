import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Home } from "../screen/Home";
import { Detail } from "../screen/Detail";
import { Router } from "./Router";
import { ChoiceTheme } from "../screen/ChoiceTheme";
import { ThemeProvider } from "styled-components/native";
import { useDB } from "../utils/context";
import { darkColor, lightColor } from "../utils/styled";
import { Edit } from "../screen/Edit";

const NativeStack = createStackNavigator();

export const Stack = () => {
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
    <>
      {theme2[0] === undefined ? (
        <ChoiceTheme />
      ) : (
        <ThemeProvider
          theme={theme2[0].themecolr === "dark" ? darkColor : lightColor}
        >
          <NativeStack.Navigator screenOptions={{ headerShown: false }}>
            <NativeStack.Screen name="Router" component={Router} />
            <NativeStack.Screen name="Detail" component={Detail} />
            <NativeStack.Screen name="Edit" component={Edit} />
          </NativeStack.Navigator>
        </ThemeProvider>
      )}
    </>
  );
};
