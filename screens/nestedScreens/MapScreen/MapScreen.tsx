import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ViewStyle
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute, RouteProp } from "@react-navigation/native";

import { PostsStackParamList } from '../../../interfaces';

export function MapScreen() {
  const route = useRoute<RouteProp<PostsStackParamList, "Map">>();
  const { height, width } = useWindowDimensions();

  const {latitude, longitude} = route.params.location;

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

interface IStyles {
  container: ViewStyle
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
