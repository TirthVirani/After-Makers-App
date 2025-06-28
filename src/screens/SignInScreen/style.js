import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  subcontainer: {
    marginVertical: 10
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.tintColor_white
  },
  signInhandler: {
    padding: 15,
    backgroundColor: Colors.btnColor,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: Colors.tintColor_white,
    fontWeight: "bold"
  },
  signUpContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
