import { View, Text } from "react-native";
import React, { useState } from "react";
import styles from "../style";
import CommonTitleBar from "../../../components/CommonTitleBar";
import { Colors } from "../../../constant/Colors";
import { Calendar, LocaleConfig } from "react-native-calendars";

const PostUploadScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  return (
    <View style={styles.rootContainer}>
      <CommonTitleBar
        title="Upload Post"
        style={{ backgroundColor: Colors.btnColor, paddingTop: 30 }}
        backIcon
        onBackPress={() => navigation.goBack()}
      />
      <Text style={styles.btnText}>Post Upload Screen</Text>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange"
          }
        }}
      />
    </View>
  );
};

export default PostUploadScreen;
