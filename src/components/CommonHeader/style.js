import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
  },
  curvedBackground: {
    paddingTop: 30,
    alignItems: "center",
  },
  image: {
    width: width * 0.5,
    height: 70,
  },
});

export default styles;
