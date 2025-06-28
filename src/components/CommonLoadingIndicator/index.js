import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "./style";
import { Colors } from "../../constant/Colors";

const CommonLoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={40}
        color={Colors.btnColor}
        style={{ marginVertical: 20 }}
      />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
};

export default CommonLoadingIndicator;
