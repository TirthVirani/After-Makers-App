import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import CommonTitleBar from "../../../components/CommonTitleBar";
import { Colors } from "../../../constant/Colors";
import { Calendar } from "react-native-calendars";
import styles from "./style";
import { database, ref } from "../../../config/database";
import * as ImagePicker from "expo-image-picker";
import { get, push, remove } from "firebase/database";
import CommonLoadingIndicator from "../../../components/CommonLoadingIndicator";

const PostUploadScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(false);

  const pickAndUpload = async () => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        base64: true,
        quality: 0.5,
      });

      if (!result.canceled) {
        const asset = result.assets[0];

        if (!asset || !asset.base64) {
          console.warn("Asset or base64 is missing.");
          alert("Failed to pick image or convert to base64.");
          return;
        }

        const base64 = asset.base64;
        const type = asset.type || "image";
        const uri = asset.uri;

        console.log("Uploading image with URI:", uri);

        await push(ref(database, "uploaded Images"), {
          mediaBase64: base64,
          type: type,
          uri: uri,
          date: selected,
          timestamp: Date.now(),
        });

        alert("Image upload successful!");
      } else {
        console.log("Image selection was cancelled.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchImagesForDate = async (date) => {
    try {
      const snapshot = await get(ref(database, "uploaded Images"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const imagesArray = Object.values(data).filter(
          (item) => item.date === date
        );
        setUploadedImages(imagesArray);
      } else {
        setUploadedImages([]);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const fetchAllMarkedDates = async () => {
    try {
      const snapshot = await get(ref(database, "uploaded Images"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const datesMap = {};

        Object.values(data).forEach((item) => {
          if (item.date) {
            if (!datesMap[item.date]) {
              datesMap[item.date] = {
                marked: true,
                dots: [{ color: "orange" }],
              };
            }
          }
        });

        if (selected) {
          datesMap[selected] = {
            ...datesMap[selected],
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "red",
            selectedColor: Colors.btnColor,
          };
        }

        setMarkedDates(datesMap);
      } else {
        setMarkedDates({});
      }
    } catch (err) {
      console.error("Error fetching marked dates:", err);
    }
  };

  const deleteOldImages = async () => {
    try {
      const snapshot = await get(ref(database, "uploaded Images"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const now = Date.now();
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

        const deletionPromises = [];

        Object.entries(data).forEach(([key, item]) => {
          if (item.timestamp && now - item.timestamp > sevenDaysInMs) {
            const itemRef = ref(database, `uploaded Images/${key}`);
            deletionPromises.push(remove(itemRef));
          }
        });

        await Promise.all(deletionPromises);
        console.log("Old images deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting old images:", error);
    }
  };

  useEffect(() => {
    if (selected) {
      fetchImagesForDate(selected);
    }
    fetchAllMarkedDates();
  }, [selected, uploadedImages, uploadedImages.length]);
  useEffect(() => {
    deleteOldImages();
  }, []);

  return (
    <>
      {loading ? (
        <CommonLoadingIndicator />
      ) : (
        <View style={styles.rootContainer}>
          <CommonTitleBar
            title="Upload Post"
            style={{ backgroundColor: Colors.btnColor, paddingTop: 30 }}
            backIcon
            onBackPress={() => navigation.goBack()}
          />
          <View>
            <Calendar
              onDayPress={(day) => {
                setSelected(day.dateString);
              }}
              markedDates={markedDates}
              theme={{
                calendarBackground: Colors.backgroundColor,
                textSectionTitleColor: Colors.tintColor_black,
                todayTextColor: Colors.btnColor,
                dayTextColor: Colors.tintColor_black,
                textDisabledColor: "#808080",
                disabledDotColor: "#808080",
                monthTextColor: Colors.tintColor_black,
                textMonthFontWeight: "bold",
                textMonthFontSize: 18,
                dotColor: Colors.lightRed,
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[styles.uploadBtn, { opacity: selected ? 1 : 0.5 }]}
              onPress={pickAndUpload}
              disabled={!selected}
            >
              <Text style={styles.uploadbtntext}>Upload Post Here</Text>
            </TouchableOpacity>
          </View>

          {uploadedImages.length > 0 && (
            <FlatList
              data={uploadedImages}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 10 }}>
                  <Image
                    source={{ uri: item.uri }}
                    style={{ height: "70%", aspectRatio: 1, margin: 8 }}
                    resizeMode="cover"
                  />
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </>
  );
};

export default PostUploadScreen;
