import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  scrollContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.tintColor_black,
  },
  iconButton: {
    padding: 5,
  },
  card: {
    backgroundColor: Colors.btnColor,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: Colors.tintColor_black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  labelText: {
    fontSize: 19,
    color: Colors.tintColor_white,
    fontWeight: "700",
  },
  valueText: {
    fontSize: 15,
    color: Colors.tintColor_white,
    flexShrink: 1,
  },
});

export default styles;
