import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.btnColor,
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingBottom: 15,
    shadowColor: Colors.tintColor_black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    marginBottom: 10,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  dateText: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.tintColor_white,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadAllText: {
    fontSize: 15,
    color: Colors.tintColor_black,
    marginRight: 8,
  },
  iconButton: {
    marginLeft: 8,
    padding: 2,
  },
  imageBackground: {
    width: width - 30,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.tintColor_black,
  },
  inactiveDot: {
    backgroundColor: Colors.tintColor_white,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10
  },
  emptyText: {
    alignSelf: "center",
    color: Colors.tintColor_white,
    fontWeight: "bold",
  },
});

export default styles;
