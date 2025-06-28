import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // justifyContent: "center",
    backgroundColor: Colors.backgroundColor
  },
  subcontainer: {
    // marginVertical: 10
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
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
  signInContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10
  },
  radioLabel: {
    color: Colors.tintColor_white,
    fontSize: 17
  },
  radioButton: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.btnColor,
    borderRadius: 5,
    width: "30%",
    alignItems: "center"
  },
  radioButtonSelected: {
    backgroundColor: Colors.btnColor
  },
  radioText: {
    fontSize: 15,
    color: Colors.tintColor_white,
    fontWeight: "bold"
  }
});

export default styles;
