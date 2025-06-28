import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";

const AdminDashboard = ({ navigation }) => {
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
