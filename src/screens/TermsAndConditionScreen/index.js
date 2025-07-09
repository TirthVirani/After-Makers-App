import { SafeAreaView, Text } from "react-native";
import styles from "./style";
import CommonTitleBar from "../../components/CommonTitleBar";
import { Colors } from "../../constant/Colors";

const TermsAndConditionScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <CommonTitleBar
        title="Terms & Condition"
        style={{ backgroundColor: Colors.btnColor, paddingTop: 30 }}
        backIcon
        onBackPress={() => navigation.goBack()}
      />
      <Text>TermsAndConditionScreen</Text>
    </SafeAreaView>
  );
};

export default TermsAndConditionScreen;
