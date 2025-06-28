// TitleBar.js
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "../../constant/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "./style";
import { auth } from "../../config/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommonTitleBar = ({ title, style, backIcon, onBackPress }) => {
  const userData = useSelector((val) => val.user);
  // console.log("titlebar data:::", userData);
  const navigation = useNavigation();

  // const logOutHandler = () =>
  //   Alert.alert("Logout", "Are you sure to logout?", [
  //     { text: "Cancel" },
  //     { text: "OK", onPress: () => navigation.replace("SignInScreen") }
  //   ]);

  const logOutHandler = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          try {
            await auth.signOut(auth);
            await AsyncStorage.removeItem("userData");
            navigation.replace("SignInScreen");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to log out. Please try again.");
          }
        }
      }
    ]);

  return (
    // <View style={[styles.container, style]}>
    //   {backIcon && (
    //     <TouchableOpacity style={styles.backicon} onPress={onBackPress}>
    //       <Icon name="chevron-left" size={40} color={Colors.tintColor_white} />
    //     </TouchableOpacity>
    //   )}
    //   <Text style={styles.titleText}>{userData?.companyName || title}</Text>
    //   <TouchableOpacity
    //     style={styles.iconButton}
    //     onPress={() => logOutHandler()}
    //   >
    //     <Icon name="power-standby" size={28} color={Colors.tintColor_white} />
    //   </TouchableOpacity>
    // </View>
    <View style={[styles.container, style]}>
      {backIcon ? (
        <>
          <View style={styles.sideContainer}>
            <TouchableOpacity style={styles.backicon} onPress={onBackPress}>
              <Icon
                name="chevron-left"
                size={32}
                color={Colors.tintColor_white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.titleCenterContainer}>
            <Text numberOfLines={1} style={styles.titleText}>
              {userData?.companyName || title}
            </Text>
          </View>

          <View style={styles.sideContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={logOutHandler}>
              <Icon
                name="power-standby"
                size={28}
                color={Colors.tintColor_white}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.titleLeftContainer}>
            <Text numberOfLines={1} style={styles.titleText}>
              {userData?.companyName || title}
            </Text>
          </View>

          <View style={styles.sideContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={logOutHandler}>
              <Icon
                name="power-standby"
                size={28}
                color={Colors.tintColor_white}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CommonTitleBar;
