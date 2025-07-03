import { View, Text, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useEffect } from "react";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";

const AdminDashboard = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want exit?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp()
        }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <CommonHeader />
      <CommonTitleBar title="Admin Panal" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to After Makers admin !</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.btnText}>Add New User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("PostUploadScreen")}
        >
          <Text style={styles.btnText}>Add Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminDashboard;
