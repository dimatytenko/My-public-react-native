import { View, Image, StyleSheet, ViewStyle,ImageStyle } from "react-native";

interface IProps {
  photo: string
}

export function ImagePost({ photo}:IProps) {
  return (
    <View style={styles.boxImage}>
      <Image source={{ uri: photo }} style={styles.image} />
    </View>
  );
}

interface IStyles {
  boxImage:ViewStyle,
  image:ImageStyle
}

const styles = StyleSheet.create<IStyles>({
  boxImage: {
    marginBottom: 8,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
});
