import { StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";
import PostCard from "../../components/PostCard";
// import { SafeAreaView } from 'react-native-web'

const HomeScreen = () => {
  const data = useSelector((val) => val.user);
  console.log("redux data", data);
  return (
    <View style={styles.rootContainer}>
      <CommonHeader />
      <CommonTitleBar />
      <PostCard />
    </View>
  );
};

export default HomeScreen;
