import { View, Text, Image } from "react-native";
import styles from "./style";

const CommonHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.curvedBackground}>
        <Image
          source={require("../../../assets/Logo_without_bg.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
export default CommonHeader;
