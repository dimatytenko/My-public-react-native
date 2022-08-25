import { View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export function ImagePost({ photo }) {
  return (
    <View style={styles.boxImage}>
      <Image source={{ uri: photo }} style={styles.image} />
    </View>
  );
}

ImagePost.propTypes = {
  photo: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  boxImage: {
    marginBottom: 8,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
});
