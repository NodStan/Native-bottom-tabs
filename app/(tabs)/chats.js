import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";

export default function Chats() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      setLocation(location);

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`,
          {
            headers: {
              "User-Agent": "Location-App/1.0 (ogbonnafinbarr@gmail.com)",
            },
          }
        );

        if (response.data && response.data.address) {
          const { residential, village, county } = response.data.address;
          const { display_name } = response.data;

          setAddress(display_name);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View>
      <Text>{text}</Text>
      <Text style={{ fontSize: 40 }}>{address}</Text>
    </View>
  );
}