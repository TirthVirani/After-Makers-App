import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  subContainer: {
    padding: 20,
    width: width - 35,
    height: width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  tagLine: {
    fontSize: 17,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.tintColor_black,
  },
});

export default styles;
