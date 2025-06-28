import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  scrollContainer: {
    justifyContent: "center",
    alignContent: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.tintColor_white
  },
  iconButton: {
    padding: 5
  },
  card: {
    backgroundColor: Colors.btnColor,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    // iOS Shadow
    shadowColor: Colors.tintColor_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android Shadow
    elevation: 5
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  labelText: {
    fontSize: 19,
    color: Colors.tintColor_black,
    fontWeight: "700"
  },
  valueText: {
    fontSize: 15,
    color: Colors.tintColor_black,
    flexShrink: 1 // Allow value to wrap if too long
  }
});

export default styles;
