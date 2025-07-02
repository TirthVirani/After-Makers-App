import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import CommonTitleBar from "../../../components/CommonTitleBar";
import { Colors } from "../../../constant/Colors";
import { Calendar } from "react-native-calendars";
import styles from "./style";
import { database, ref } from "../../../config/database";
import * as ImagePicker from "expo-image-picker";
import { get, push } from "firebase/database";

const PostUploadScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  // const handleImagePick = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
  //   console.log('result', result)
  //   if (!result.canceled) {
  //     const asset = result.assets[0];
  //     const fileUri = asset.uri;
  //     const fileName = fileUri.split('/').pop();
  //     console.log('fileName', fileName)

  //     const file = await FileSystem.readAsStringAsync(fileUri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     // console.log('file', file)

  //     const imageRef = ref(storage, `posts/${selected}/${fileName}`);
  //     const imageBlob = new Uint8Array(Buffer.from(file, 'base64'));
  //     // console.log('imageRef imageBlob', imageRef, imageBlob)

  //     await uploadBytes(imageRef, imageBlob);
  //     const downloadURL = await getDownloadURL(imageRef);
  //     // console.log('downloadURL', downloadURL)

  //     await addDoc(collection(database, "uploads"), {
  //       date: selected,
  //       imageUrl: downloadURL,
  //       createdAt: new Date(),
  //     });

  //     fetchImagesForDate(selected);
  //   }
  // };
  // const fetchImagesForDate = async (date) => {
  //   const q = query(collection(database, "uploads"), where("date", "==", date));
  //   const snapshot = await getDocs(q);
  //   const urls = snapshot.docs.map((doc) => doc.data().imageUrl);
  //   setUploadedImages(urls);
  // };

  // useEffect(() => {
  //   if (selected) fetchImagesForDate(selected);
  // }, [selected]);

  const pickAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        const type = asset.type || 'image';
        const uri = asset.uri;

        console.log('Uploading image with URI:', uri);

        await push(ref(database, 'uploaded Images'), {
          mediaBase64: base64,
          type: type,
          uri: uri,
          date: selected,
          timestamp: Date.now(),
        });

        alert("Upload successful!");
      } else {
        console.log("Image selection was cancelled.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. See console for details.");
    }
  };

  const fetchImagesForDate = async (date) => {
    try {
      const snapshot = await get(ref(database, 'uploaded Images'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const imagesArray = Object.values(data).filter(item => item.date === date);
        setUploadedImages(imagesArray);
      } else {
        setUploadedImages([]);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    if (selected) {
      fetchImagesForDate(selected);
    }
  }, [selected]);

  return (
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
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange"
            }
          }}
          theme={{
            calendarBackground: Colors.backgroundColor,
            textSectionTitleColor: Colors.tintColor_white,
            todayTextColor: Colors.btnColor,
            dayTextColor: Colors.tintColor_white,
            textDisabledColor: Colors.borderColor,
            monthTextColor: Colors.tintColor_white,
            textMonthFontWeight: 'bold',
            textMonthFontSize: 18,
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.uploadBtn,
            { opacity: selected ? 1 : 0.5 },
          ]}
          onPress={pickAndUpload}
          disabled={!selected}
        >
          <Text style={styles.uploadbtntext}>Upload Post Here</Text>
        </TouchableOpacity>
      </View>

      {uploadedImages.length > 0 && (
        <FlatList
          data={uploadedImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{ width: 200, aspectRatio: 1, margin: 8 }}
              resizeMode="cover"
            />
          )}
        />
      )}
    </View>
  );
};

export default PostUploadScreen;
