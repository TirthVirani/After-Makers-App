import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import CommonTitleBar from "../../../components/CommonTitleBar";
import { Colors } from "../../../constant/Colors";
import styles from "./style";
import moment from "moment";
import Icon from "@react-native-vector-icons/material-icons";
import { auth } from "../../../config/auth";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { database, ref } from "../../../config/database";
import { set } from "firebase/database";
import { useState } from "react";
import CommonLoadingIndicator from "../../../components/CommonLoadingIndicator";

const UserDetailsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const userData = route?.params;
  console.log("User Details route Data : ", userData);

  const handleDeletePress = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, userData?.email, userData?.pin);
      const currentUser = auth.currentUser;

      if (currentUser) {
        await deleteUser(currentUser);
        console.log(`Deleted Firebase Auth user: ${userData?.email}`);
      }

      const emailKey = userData?.email.replace(".", ",");
      const userRef = ref(database, "users/" + emailKey);
      await set(userRef, null);
      console.log(`Deleted user from Realtime Database: ${emailKey}`);

      navigation.goBack();
    } catch (error) {
      console.log(`Error deleting user (${userData?.email}):`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CommonLoadingIndicator />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <CommonTitleBar
            title={userData?.companyName}
            style={{ backgroundColor: Colors.btnColor, paddingTop: 30 }}
            backIcon
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {userData?.logo ? (
                <Image
                  source={{ uri: userData?.logo }}
                  style={styles.logoImage}
                />
              ) : (
                <Text style={styles.tableCell}>No Logo</Text>
              )}
            </View>

            <View style={{ marginVertical: 20 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Organization Name : </Text>
                <Text style={styles.detailsValue}>{userData?.companyName}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Email : </Text>
                <Text style={styles.detailsValue}>{userData?.email}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Pin : </Text>
                <Text style={styles.detailsValue}>{userData?.pin}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Mobile Number : </Text>
                <Text style={styles.detailsValue}>{userData?.phoneNumber}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Created Date : </Text>
                <Text style={styles.detailsValue}>
                  {moment(userData?.createdDate).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Expiry Date : </Text>
                <Text style={styles.detailsValue}>
                  {moment(userData?.expiresDate).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsName}>Address : </Text>
                <Text style={styles.detailsValue}>{userData?.address}</Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() =>
                  navigation.navigate("RegisterScreen", {
                    from: "UserDetailsScreen",
                  })
                }
              >
                <Icon name="edit" size={32} color={Colors.tintColor_black} />
                <Text style={styles.actionText}>Edit User data</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={handleDeletePress}
              >
                <Icon name="delete" size={32} color={Colors.lightRed} />
                <Text style={styles.actionText}>Delete User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default UserDetailsScreen;
