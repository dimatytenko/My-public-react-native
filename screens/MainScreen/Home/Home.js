import React from "react";
import { Text, StyleSheet, View } from "react-native";

export function Home({ children }) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
