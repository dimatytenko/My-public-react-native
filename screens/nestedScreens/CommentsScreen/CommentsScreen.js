import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
