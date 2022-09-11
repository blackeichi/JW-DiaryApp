import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { useDB } from "../utils/context";
import { darkColor, lightColor } from "../utils/styled";
import { ChoiceTheme } from "./ChoiceTheme";
import { Home } from "./Home";

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
  console.log(theme2[0]);
  return (
    <>
      {theme2[0] === undefined ? (
        <ChoiceTheme />
      ) : (
        <ThemeProvider
          theme={theme2[0].themecolr === "dark" ? darkColor : lightColor}
        >
          <Home />
        </ThemeProvider>
      )}
    </>
  );
};
