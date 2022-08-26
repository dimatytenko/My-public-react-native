import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export function MapScreen() {
  const route = useRoute();
  const { height, width } = useWindowDimensions();
  const latitude = route.params.location.latitude;
  const longitude = route.params.location.longitude;
  return (
    <View style={styles.container}>
      <MapView
        style={{ height, width }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude,
            longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
