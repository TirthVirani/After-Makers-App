import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  FlatList,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";
import { database } from "../../config/database";
import { ref, onValue } from "firebase/database";
import moment from "moment";
import { Colors } from "../../constant/Colors";
import Icon from "@react-native-vector-icons/material-icons";

const AdminDashboard = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want exit?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Fetch users from Firestore
  useEffect(() => {
    const usersRef = ref(database, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userData = Object.values(data).map((item) => ({
          id: item.id,
          companyName: item.companyName,
          email: item.email,
          createdDate: item?.package?.createdAt,
          expiresDate: item.package?.expiresAt,
          pin: item.pin,
          logo: item.fileUrl,
          address: item.address,
        }));
        setUsers(userData);
      } else {
        setUsers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Render each user row
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => navigation.navigate("UserDetailsScreen", item)}
    >
      <View
        style={{
          borderWidth: 0.5,
          borderColor: Colors.borderColor,
          borderRadius: 8,
          overflow: "hidden",
          marginRight: 10,
        }}
      >
        {item.logo ? (
          <Image source={{ uri: item.logo }} style={styles.logoImage} />
        ) : (
          <Text style={styles.tableCell}>No Logo</Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: "red",
        }}
      >
        <View>
          <Text
            style={[styles.tableCell, { fontSize: 15, fontWeight: "bold" }]}
          >
            {item.companyName}
          </Text>
          <Text style={styles.tableCell}>{item.email}</Text>
          <Text style={styles.tableCell}>
            Exp. date : {moment(item.expiresDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Icon name="chevron-right" size={32} color={Colors.tintColor_white} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.rootContainer}>
      <CommonHeader />
      <CommonTitleBar title="Admin Panal" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>User's Data</Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // ListHeaderComponent={
          //   <View style={styles.tableHeader}>
          //     <Text style={styles.headerCell}>Logo</Text>
          //     <Text style={styles.headerCell}>Company Name</Text>
          //     <Text style={styles.headerCell}>Email</Text>
          //     <Text style={styles.headerCell}>Pin</Text>
          //     <Text style={styles.headerCell}>Expired Date</Text>
          //   </View>
          // }
          ListEmptyComponent={
            <View style={styles.notfoundContainer}>
              <Text style={styles.notfoundText}>User not found !</Text>
            </View>
          }
          style={{
            borderWidth: 1,
            borderColor: Colors.borderColor,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
        />

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
