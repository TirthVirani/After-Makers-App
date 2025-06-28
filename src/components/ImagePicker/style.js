import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "center"
  },
  container: {
    paddingTop: 10,
    paddingBottom: 20,
    width: "90%"
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.btnColor,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginRight: 15
  },
  buttonText: {
    color: Colors.tintColor_white,
    fontSize: 18,
    fontWeight: "500"
  },
  fileNameText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    flexShrink: 1
  },
  allowedTypesText: {
    color: "#A0A0A0",
    fontSize: 14
  }
});

export default styles;
