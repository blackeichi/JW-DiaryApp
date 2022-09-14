import {
  faCloud,
  faCloudBolt,
  faCloudRain,
  faDroplet,
  faDropletSlash,
  faMountainSun,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  PermissionsAndroid,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";

const API_KEY = "f00eda783b406e14a84d8a28a8bce36b";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;
const NotGranted = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 20px;
`;
const WeatherBox = styled.View`
  align-items: center;
`;
const Dot = styled.View`
  background-color: white;
  width: 10px;
  height: 10px;
  position: absolute;
  right: -10px;
  top: 15px;
`;
const City = styled.Text`
  color: white;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 700;
`;
const Degree = styled.Text`
  color: white;
  font-size: 90px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Cloud = styled.Text`
  color: white;
  font-size: 20px;
  margin-top: 10px;
`;

const icons = {
  Clouds: faCloud,
  Clear: faSun,
  Atmosphere: faDropletSlash,
  Snow: faSnowflake,
  Rain: faDroplet,
  Drizzle: faCloudRain,
  Thunderstorm: faCloudBolt,
};

export const Weather = () => {
  const [city, setCity] = useState("");
  const [day, setDays] = useState();
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === "never_ask_again") {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily[0]);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <Container>
      {!ok ? (
        <NotGranted>위치에 액세스할 수 있도록 허용해주세요.</NotGranted>
      ) : (
        <>
          {city === "" && day ? (
            <ActivityIndicator />
          ) : (
            <>
              <City>{city}</City>
              <WeatherBox>
                <Degree>{parseFloat(day?.temp?.day).toFixed(1)}:</Degree>
                <Dot />
                {day?.weather[0] ? (
                  <>
                    <FontAwesomeIcon
                      size={40}
                      color="white"
                      icon={icons[day.weather[0]?.main]}
                    />
                    <Cloud>{day?.weather[0]?.description}</Cloud>
                  </>
                ) : null}
              </WeatherBox>
            </>
          )}
        </>
      )}
    </Container>
  );
};
