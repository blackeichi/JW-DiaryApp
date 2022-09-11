import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import Realm from "realm";
import { Router } from "./screen/Router";
import { DBContext } from "./utils/context";

const ThemeSchema = {
  name: "Theme",
  properties: {
    themecolr: "string",
  },
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const startLoading = async () => {
    const connection = await Realm.open({
      schema: [ThemeSchema],
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
        <Router />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
