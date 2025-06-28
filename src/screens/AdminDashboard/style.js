import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 19,
    margin: 10,
    textAlign: "center",
    color: Colors.tintColor_white,
    fontWeight: "bold"
  },
  btn: {
    margin: 15,
    padding: 15,
    backgroundColor: Colors.btnColor,
    borderRadius: 5
  },
  btnText: {
    textAlign: "center",
    color: Colors.tintColor_white,
    fontWeight: "bold"
  }
});

export default styles;
