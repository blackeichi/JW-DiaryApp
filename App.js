import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import Realm from "realm";
import { Router } from "./navigators/Router";
import { Stack } from "./navigators/Stack";
import { DBContext } from "./utils/context";

const ThemeSchema = {
  name: "Theme",
  path: "DiaryTheme",
  properties: {
    themecolr: "string",
  },
};
const TextSchema = {
  name: "Text",
  path: "DiaryText",
  properties: {
    _id: "int",
    emotion: "string",
    title: "string",
    content: "string",
    year: "int",
    month: "int",
    date: "int",
  },
  primaryKey: "_id",
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const startLoading = async () => {
    const connection = await Realm.open({
      schema: [ThemeSchema, TextSchema],
    });
    setRealm(connection);
  };
  const onFinish = () => setReady(true);
  if (!ready) {
    return (
      <AppLoading
        onError={console.error}
        startAsync={startLoading}
        onFinish={onFinish}
      ></AppLoading>
    );
  }

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
