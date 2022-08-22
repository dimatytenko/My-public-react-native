import { View, Image, StyleSheet } from "react-native";

export function ImagePost({ photo }) {
  return (
    <View style={styles.boxImage}>
      <Image source={{ uri: photo }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  boxImage: {
    marginBottom: 8,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
});
