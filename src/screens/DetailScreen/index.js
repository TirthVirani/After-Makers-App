import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";

const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.rootContainer}>
      <CommonHeader />
      <CommonTitleBar />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.itemContainer}>
            <Text style={styles.labelText}>Bussiness Name : </Text>
            <Text style={styles.valueText}>After Makers</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.labelText}>E-mail : </Text>
            <Text style={styles.valueText}>postmaker@gmail.com</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.labelText}>Contact : </Text>
            <Text style={styles.valueText}>+91 12345 67890</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("TermsAndConditionScreen")}
          >
            <Text style={styles.btnText}>Terms & Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("PrivacyPolicyScreen")}
          >
            <Text style={styles.btnText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;
