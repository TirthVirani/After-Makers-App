import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  inputField: {
    elevation: 5,
    backgroundColor: Colors.backgroundColor,
    color: Colors.tintColor_black,
    fontSize: 17,
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    shadowColor: Colors.tintColor_black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default styles;
