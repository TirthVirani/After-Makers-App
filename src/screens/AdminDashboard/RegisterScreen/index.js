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
  SafeAreaView,
} from "react-native";

import { ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import ImagePicker from "../../../components/ImagePicker";
import CommonInput from "../../../components/CommonInput";
import CommonTitleBar from "../../../components/CommonTitleBar";
import CommonLoadingIndicator from "../../../components/CommonLoadingIndicator";
import { Colors } from "../../../constant/Colors";
import { database } from "../../../config/database";
import { auth } from "../../../config/auth";
import { setUser } from "../../../redux/UserSlice";

export default function RegisterScreen({ navigation, route }) {
  const { from, data } = route?.params;
  // const data = useSelector((state) => state.user);
  console.log("Register Screen redux data : ", from, data);

  const date1 = new Date(data?.createdDate); // August 8, 2025
  const date2 = new Date(data?.expiresDate); // September 7, 2025
  // Calculate difference in months
  const yearsDiff = date2.getFullYear() - date1.getFullYear();
  const monthsDiff = date2.getMonth() - date1.getMonth();
  const totalMonthDiff = yearsDiff * 12 + monthsDiff;
  console.log(`Difference in months: ${totalMonthDiff}`);
  // console.log(`Difference in years: ${totalMonthDiff / 12}`);

  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState(data?.companyName || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");
  const [pin, setPin] = useState(data?.pin || "");
  const [address, setAddress] = useState(data?.address || "");
  const [fileUrl, setFileUrl] = useState(data?.logo || null);
  const [selectedPlan, setSelectedPlan] = useState(
    totalMonthDiff > 12 ? "2y" : totalMonthDiff > 1 ? "1y" : "1m" || "1m"
  );
  const [loading, setLoading] = useState(false);
  const id = Math.ceil(Math.random() * 1000);

  const handleAddUser = async () => {
    setLoading(true);

    const now = Date.now();
    let expiresAt;
    if (selectedPlan === "1m") {
      expiresAt = now + 30 * 24 * 60 * 60 * 1000; // 30 days
    } else if (selectedPlan === "1y") {
      expiresAt = now + 365 * 24 * 60 * 60 * 1000; // 1 year
    } else if (selectedPlan === "2y") {
      expiresAt = now + 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
    }

    try {
      const userRef = ref(database, "users/" + email.replace(".", ","));
      const now = Date.now();

      if (from === "UserDetailsScreen") {
        if (!companyName || !email || !phoneNumber || !pin || !address) {
          Alert.alert("Validation Error", "Please fill in all fields");
          setLoading(false);
          return;
        }

        const originalEmail = data?.email;
        const originalKey = originalEmail.replace(".", ",");
        const newKey = email.replace(".", ",");

        const userRef = ref(database, "users/" + newKey);

        const updatedFields = {
          id,
          companyName,
          email,
          phoneNumber,
          pin,
          address,
          package: {
            createdAt: now,
            expiresAt,
          },
          fileUrl,
        };

        // try {
        //   await createUserWithEmailAndPassword(auth, email, pin);
        //   console.log(`Created new Firebase Auth user: ${email}`);
        // } catch (error) {
        //   console.log("Error creating new Firebase Auth user:", error);
        //   Alert.alert("Error", "Failed to update Data");
        //   setLoading(false);
        //   return;
        // }
        if (originalEmail !== email) {
          try {
            await createUserWithEmailAndPassword(auth, email, pin);
            console.log(`Created new Firebase Auth user: ${email}`);
          } catch (error) {
            console.log("Error creating new Firebase Auth user:", error);
            Alert.alert("Error", "Failed to update Data");
            setLoading(false);
            return;
          }
        }

        await set(userRef, updatedFields);

        if (originalEmail !== email) {
          try {
            await signInWithEmailAndPassword(auth, originalEmail, pin);
            const currentUser = auth.currentUser;
            if (currentUser) {
              await deleteUser(currentUser);
              console.log(`Deleted old Firebase Auth user: ${originalEmail}`);
            }
          } catch (error) {
            console.log(
              `Error deleting old auth user for ${originalEmail}:`,
              error
            );
          }

          await set(ref(database, "users/" + originalKey), null);
        }

        Alert.alert("Success", "User data updated successfully");
      } else {
        // 🆕 Register mode
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

        if (!fileUrl) {
          Alert.alert("Validation Error", "Please upload a file");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pin
        );

        await set(userRef, {
          id,
          companyName,
          email,
          phoneNumber,
          pin,
          address,
          fileUrl,
          package: {
            createdAt: now,
            expiresAt,
          },
        });

        Alert.alert("Success", "User registered successfully");
      }

      dispatch(
        setUser({
          id,
          companyName,
          email,
          phoneNumber,
          pin,
          address,
          fileUrl,
          package: {
            createdAt: now,
            expiresAt: expiresAt,
          },
        })
      );
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong");
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
            title={
              from === "UserDetailsScreen"
                ? "Edit User Data"
                : "Register new user"
            }
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
                  justifyContent: "center",
                }}
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
              >
                <View>
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

                  <Text style={styles.radioLabel}>Select Plan:</Text>
                  <View style={styles.radioContainer}>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        selectedPlan === "1m" && styles.radioButtonSelected,
                      ]}
                      onPress={() => setSelectedPlan("1m")}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          selectedPlan === "1m" && styles.radioTextSelected,
                        ]}
                      >
                        1 Month
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        selectedPlan === "1y" && styles.radioButtonSelected,
                      ]}
                      onPress={() => setSelectedPlan("1y")}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          selectedPlan === "1y" && styles.radioTextSelected,
                        ]}
                      >
                        1 Year
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        selectedPlan === "2y" && styles.radioButtonSelected,
                      ]}
                      onPress={() => setSelectedPlan("2y")}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          selectedPlan === "2y" && styles.radioTextSelected,
                        ]}
                      >
                        2 Years
                      </Text>
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
                    <Text style={styles.buttonText}>
                      {from === "UserDetailsScreen" ? "Update" : "Add User"}
                    </Text>
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
