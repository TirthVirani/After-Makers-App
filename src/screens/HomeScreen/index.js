import { Alert, BackHandler, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";
import PostCard from "../../components/PostCard";
import { useEffect } from "react";

const HomeScreen = () => {
  const data = useSelector((val) => val.user);
  console.log("redux data", data);

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

  return (
    <View style={styles.rootContainer}>
      <CommonHeader />
      <CommonTitleBar />
      <PostCard frameUri={data?.fileUrl} />
    </View>
  );
};

export default HomeScreen;
