import { SafeAreaView, Text } from "react-native";
import styles from "./style";
import CommonTitleBar from "../../components/CommonTitleBar";
import { Colors } from "../../constant/Colors";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <CommonTitleBar
        title="Privacy Policy"
        style={{ backgroundColor: Colors.btnColor, paddingTop: 30 }}
        backIcon
        onBackPress={() => navigation.goBack()}
      />
      <Text>PrivacyPolicyScreen</Text>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
