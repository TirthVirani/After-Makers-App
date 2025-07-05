import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    padding: 5,
  },
  logoImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginRight: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
  detailsName: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.tintColor_white,
  },
  detailsValue: {
    fontSize: 15,
    color: Colors.tintColor_white,
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionIcon: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 10,
    color: Colors.tintColor_white,
  },
});

export default styles;
