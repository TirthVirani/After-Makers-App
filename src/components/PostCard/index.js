import { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Colors } from "../../constant/Colors";
import styles from "./style";
import CommonLoadingIndicator from "../CommonLoadingIndicator";
import { get, ref } from "firebase/database";
import { database } from "../../config/database";

const PostCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const formatedDateyyyymmdd = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchImagesForDate = async (date) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesForDate(formatedDateyyyymmdd(new Date()));
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to save files to your gallery."
      );
      return false;
    }
    return true;
  };

  const downloadAndSaveToGallery = async (fileUrl) => {
    setLoading(true);
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      let localUri = fileUrl;

      // If it's a remote URL, download it
      if (fileUrl.startsWith("http") || fileUrl.startsWith("https")) {
        const fileExtension = fileUrl.split(".").pop();
        const filename = `post_${Date.now()}.${fileExtension}`;
        const fileUri = FileSystem.cacheDirectory + filename;

        const downloadResumable = FileSystem.createDownloadResumable(
          fileUrl,
          fileUri
        );

        const { uri } = await downloadResumable.downloadAsync();
        localUri = uri;
      }

      const asset = await MediaLibrary.createAssetAsync(localUri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      }

      Alert.alert("Success", "Downloaded successfully and saved to gallery!");
    } catch (error) {
      console.error("Download/save error:", error);
      Alert.alert("Error", "Failed to download or save the file.");
    } finally {
      setLoading(false);
    }
  };

  const shareLocalFile = async (fileUrl) => {
    setLoading(true);
    try {
      let localUri = fileUrl;

      // If it's a remote URL, download it
      if (fileUrl.startsWith("http") || fileUrl.startsWith("https")) {
        const fileExtension = fileUrl.split(".").pop();
        const filename = `post_${Date.now()}.${fileExtension}`;
        const filePath = FileSystem.cacheDirectory + filename;

        const downloadResumable = FileSystem.createDownloadResumable(
          fileUrl,
          filePath
        );

        const { uri } = await downloadResumable.downloadAsync();
        localUri = uri;
      }

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(localUri);
    } catch (error) {
      console.error("Sharing error:", error);
      Alert.alert("Error", "Failed to share the post.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => {
    const isVideo = item.uri.endsWith(".mp4");

    return (
      <View style={styles.imageContainer}>
        <View style={styles.topSection}>
          <Text style={styles.dateText}>
            {moment(new Date()).format("DD/MM/YYYY")}
          </Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => downloadAndSaveToGallery(item.uri)}
            >
              <Icon
                name="download-circle-outline"
                size={25}
                color={Colors.tintColor_black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareLocalFile(item.uri)}
            >
              <Icon
                name="share-variant-outline"
                size={25}
                color={Colors.tintColor_black}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isVideo ? (
          <Video
            source={{ uri: item.uri }}
            style={styles.imageBackground}
            resizeMode="cover"
            useNativeControls={true}
            isLooping
            shouldPlay={activeIndex === index}
          />
        ) : (
          <ImageBackground
            source={{ uri: item.uri }}
            style={styles.imageBackground}
            resizeMode="stretch"
          />
        )}
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <CommonLoadingIndicator />
      ) : (
        <View style={styles.cardContainer}>
          <FlatList
            data={uploadedImages}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />
          <View style={styles.paginationDots}>
            {uploadedImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default PostCard;
