import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.tintColor_white,
    fontWeight: "bold",
  },
  btn: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.btnColor,
    borderRadius: 5,
  },
  btnText: {
    textAlign: "center",
    color: Colors.tintColor_white,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#444",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: Colors.tintColor_white,
    fontSize: 12,
  },
  tableCell: {
    // flex: 1,
    // backgroundColor: "grey",
    color: Colors.tintColor_white,
    fontSize: 13,
  },
  logoImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 5,
    // backgroundColor: "red",
  },
  notfoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  notfoundText: {
    flex: 1,
    fontWeight: "bold",
    color: Colors.borderColor,
    fontSize: 14,
  },
});
export default styles;
