import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  uploadBtn: {
    backgroundColor: Colors.btnColor,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  uploadbtntext: {
    color: Colors.tintColor_white,
    fontWeight: 'bold'
  }
});

export default styles;
