// FestiviyaHeader.js
import { View, Text } from "react-native";
import styles from "./style";
// import { getStatusBarHeight } from 'react-native-status-bar-height';

const CommonHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.curvedBackground}>
        <Text style={styles.logoText}>After Makers 1</Text>
      </View>
    </View>
  );
};
export default CommonHeader;

