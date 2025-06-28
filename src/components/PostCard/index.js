import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert
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

const PostCard = () => {
  const images = [
    {
      id: "1",
      uri: "https://img.freepik.com/premium-vector/social-media-post-adpost-banner-adpost-template-design-vector-illustration_784842-2634.jpg"
    },
    {
      id: "2",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: "3",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWGXlz1cRL_q-g7UexXBtmUj6rnAxNQ4OjOVFY1JWDRSn2PZW8NiUMGdLjoujA5oGo44&usqp=CAU"
    },
    {
      id: "4",
      uri: "https://img.freepik.com/premium-vector/social-media-post-adpost-banner-adpost-template-design-vector-illustration_784842-2630.jpg"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

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
      const fileExtension = fileUrl.split(".").pop();
      const filename = `post_${Date.now()}.${fileExtension}`;
      const fileUri = FileSystem.cacheDirectory + filename;

      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();
      console.log("Downloaded to:", uri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      }

      Alert.alert("Success", "Download Successfully and saved to gallery!");
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
      const fileExtension = fileUrl.split(".").pop();
      const filename = `post_${Date.now()}.${fileExtension}`;
      const fileUri = FileSystem.cacheDirectory + filename;

      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(uri);
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
                color={Colors.tintColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareLocalFile(item.uri)}
            >
              <Icon
                name="share-variant-outline"
                size={25}
                color={Colors.tintColor}
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
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />
          <View style={styles.paginationDots}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.activeDot : styles.inactiveDot
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
