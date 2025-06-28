import { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from "react-native";

import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import styles from "./style";
import ImagePicker from "../../../components/ImagePicker";
import CommonInput from "../../../components/CommonInput";
import CommonTitleBar from "../../../components/CommonTitleBar";
import CommonLoadingIndicator from "../../../components/CommonLoadingIndicator";
import { Colors } from "../../../constant/Colors";
import { database } from "../../../config/database";
import { auth } from "../../../config/auth";
import { addUser } from "../../../redux/UserSlice";

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("1m");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    setLoading(true);
    if (
      !companyName ||
      !email ||
      !phoneNumber ||
      !pin ||
      !address ||
      !fileUrl
    ) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pin
      );
      const userRef = ref(database, "users/" + email.replace(".", ","));

      const now = Date.now();
      let expiresAt;
      if (selectedPlan === "1m") {
        expiresAt = now + 30 * 24 * 60 * 60 * 1000; // 1 month
      } else if (selectedPlan === "2y") {
        expiresAt = now + 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
      }

      await set(userRef, {
        companyName,
        email,
        phoneNumber,
        pin,
        address,
        fileUrl,
        package: {
          createdAt: now,
          expiresAt: expiresAt
        }
      });
      Alert.alert("Success", "User registered successfully");

      dispatch(
        addUser({
          companyName,
          email,
          phoneNumber,
          pin,
          address,
          fileUrl,
          package: {
            createdAt: now,
            expiresAt: expiresAt
          }
        })
      );
    } catch (error) {
      console.error("Error adding user:", error);
      Alert.alert("Error", "Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {loading ? (
        <CommonLoadingIndicator />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <CommonTitleBar
            title="Register new user"
            style={{ backgroundColor: Colors.btnColor, paddingTop: 30 }}
            backIcon
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center"
                }}
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
              >
                {/* <Text style={styles.title}>Register new user</Text> */}

                <View style={styles.subcontainer}>
                  <CommonInput
                    placeholder="Company Name"
                    value={companyName}
                    onChangeText={setCompanyName}
                  />
                  <CommonInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <CommonInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                    keyboardType="phone-pad"
                    inputMode="numeric"
                  />
                  <CommonInput
                    placeholder="Generate 6 Digit Pin"
                    value={pin}
                    secureTextEntry={true}
                    onChangeText={setPin}
                    maxLength={6}
                    keyboardType="numeric"
                    inputMode="numeric"
                  />

                  <View style={styles.radioContainer}>
                    <Text style={styles.radioLabel}>Select Plan:</Text>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        selectedPlan === "1m" && styles.radioButtonSelected
                      ]}
                      onPress={() => setSelectedPlan("1m")}
                    >
                      <Text style={styles.radioText}>1 Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        selectedPlan === "2y" && styles.radioButtonSelected
                      ]}
                      onPress={() => setSelectedPlan("2y")}
                    >
                      <Text style={styles.radioText}>2 Years</Text>
                    </TouchableOpacity>
                  </View>

                  <CommonInput
                    placeholder="Company Address"
                    value={address}
                    onChangeText={setAddress}
                    numberOfLines={3}
                  />

                  <ImagePicker onFilePicked={setFileUrl} />

                  <TouchableOpacity
                    style={styles.signInhandler}
                    onPress={handleAddUser}
                  >
                    <Text style={styles.buttonText}>Add User</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      )}
    </TouchableWithoutFeedback>
  );
}
