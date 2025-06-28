import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import styles from "./style";

const ImagePicker = ({ onFilePicked }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  var fileName,
    uri,
    type,
    size = "";

  const handleError = (err) => {
    if (err.type === "cancel") {
      console.warn("Cancelled");
    } else {
      Alert.alert("Error", "An unknown error occurred while picking the file.");
      console.error(err);
    }
  };

  const handlePickDocument = async () => {
    try {
      const pickerResult = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/jpg", "image/png"],
        copyToCacheDirectory: true
      });

      if (pickerResult.type === "cancel") {
        return;
      }
      {
        pickerResult?.assets?.map((i) => {
          (fileName = i.name),
            (uri = i.uri),
            (type = i.mimeType),
            (size = i.size);
        });
      }
      setSelectedFile({
        name: fileName,
        uri: uri,
        type: type,
        size: size
      });
      onFilePicked(uri);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.pickerRow}>
          <TouchableOpacity style={styles.button} onPress={handlePickDocument}>
            <Text style={styles.buttonText}>Choose a file</Text>
          </TouchableOpacity>
          <Text style={styles.fileNameText}>
            {selectedFile ? selectedFile.name : "No file chosen..."}
          </Text>
        </View>
        <Text style={styles.allowedTypesText}>.jpg, .jpeg, .png</Text>
      </View>
    </SafeAreaView>
  );
};

export default ImagePicker;
