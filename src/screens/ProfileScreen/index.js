// ProfileScreen.js
import { Text, View } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";
import styles from "./style";
import CommonHeader from "../../components/CommonHeader";
import CommonTitleBar from "../../components/CommonTitleBar";

const ProfileScreen = () => {
  const data = useSelector((val) => val.user);

  const Start_Date = moment(data?.package?.createdAt).format("DD/MM/YYYY");
  const End_Date = moment(data?.package?.expiresAt).format("DD/MM/YYYY");

  const detailsData = [
    { label: "Company Name", value: data?.companyName },
    { label: "Whatsapp no.", value: `+91 ${data?.phoneNumber}` },
  ];

  const packageData = [
    { label: "Start Date", value: Start_Date },
    { label: "End Date", value: End_Date },
  ];

  return (
    <View style={styles.rootContainer}>
      <CommonHeader />
      <CommonTitleBar />
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Details</Text>
        </View>

        <View style={styles.card}>
          {detailsData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.labelText}>{item.label} : </Text>
              <Text style={styles.valueText}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.container}>
          <Text style={styles.titleText}>Package</Text>
        </View>

        <View style={styles.card}>
          {packageData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.labelText}>{item.label} : </Text>
              <Text style={styles.valueText}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
