import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  text: {
    fontSize: 20,
    color: Colors.tintColor_black,
  },
});

export default styles;
