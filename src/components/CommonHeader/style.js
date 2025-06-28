import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../constant/Colors";

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    
    // This container is to help position the curved part if needed
    // backgroundColor: '#f0f0f0', // Match the page background if the curve is transparent
  },
  curvedBackground: {
    backgroundColor: Colors.btnColor,
    paddingTop: 25, // For status bar
    paddingBottom: 20, // Increased padding for the "Festiviya" text
    paddingHorizontal: 20,
    alignItems: "center", // Center "Festiviya"
    borderBottomLeftRadius: 25, // Adjust for the curve
    borderBottomRightRadius: 25, // Adjust for the curve
    // zIndex: 1, // Ensure it's above other content if overlapping
    height: "auto", // Fixed height for the header
    width: "auto",
    justifyContent: "center",
    // iOS Shadow
    shadowColor: Colors.tintColor_white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android Shadow
    elevation: 5
  },
  logoText: {
    color: Colors.tintColor_black, // Orange color
    fontSize: 35,
    fontWeight: "bold",
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Bold" : "sans-serif-condensed" // Example custom font feel
  }
});

export default styles;
