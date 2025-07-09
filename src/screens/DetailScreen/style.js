import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    alignContent: "center",
  },
  card: {
    backgroundColor: Colors.btnColor,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: Colors.tintColor_white,
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
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.btnColor,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  btnText: {
    color: Colors.tintColor_white,
    fontWeight: "bold",
  },
});

export default styles;
