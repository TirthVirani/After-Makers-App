import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor
  },
  subContainer: {
    padding: 20,
    // width: width - 40,
    // aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    // backgroundColor: Colors.btnColor,
    // shadowColor: Colors.tintColor,
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 10
  },
  image: {
    width: width - 40,
    height: width / 3 
    // aspectRatio: 1
  },
  // title: {
  //   fontSize: 50,
  //   marginBottom: 10,
  //   textAlign: "center",
  //   color: Colors.tintColor
  // },
  tagLine: {
    // margin: 20,
    fontSize: 17,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.tintColor_white
  }
});

export default styles;
