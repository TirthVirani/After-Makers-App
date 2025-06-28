import { StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: Colors.backgroundColor
//     // borderBottomWidth: 1,
//     // borderBottomColor: '#e0e0e0',
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: "500",
//     color: Colors.tintColor_white
//   },
//   iconButton: {
//     margin: 5
//   },
//   backicon: {
//     // marginLeft: -10
//   }
// });

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.backgroundColor,
  },
  sideContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  backicon: {
    padding: 5,
  },
  iconButton: {
    padding: 5,
  },
  titleCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  titleLeftContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.tintColor_white,
  },
});


export default styles;
