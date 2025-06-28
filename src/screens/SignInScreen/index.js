import { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/auth";
import { database, ref, onValue } from "../../config/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../config/firebaseConfig";
import { addUser, setUser } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import styles from "./style";
import CommonInput from "../../components/CommonInput";
import CommonLoadingIndicator from "../../components/CommonLoadingIndicator";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // console.log("currentUserEmail", currentUserEmail);
    if (currentUserEmail) {
      const userRef = ref(
        database,
        "users/" + currentUserEmail.replace(".", ",")
      );

      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(addUser(data));
        console.log("signin data", data);
      });

      return () => unsubscribe();
    }
  }, [currentUserEmail]);

  const handleSignIn = async () => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pin);

      console.log("SignIn Successful", userCredential);

      if (email === "postmaker@gmail.com" && pin === "123456") {
        navigation.navigate("AdminDashboard");
      } else {
        navigation.replace("TabNavigation", { screen: "HomeScreen" });
      }
    } catch (error) {
      Alert.alert("SignIn Error", "Please enter correct credential...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {loading ? (
        <CommonLoadingIndicator />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              keyboardShouldPersistTaps="never"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.title}>Sign In</Text>

              <View style={styles.subcontainer}>
                <CommonInput
                  placeholder="Email"
                  value={email}
                  secureTextEntry={false}
                  onChangeText={setEmail}
                />
                <CommonInput
                  placeholder="Enter 6 Digit Pin"
                  value={pin}
                  secureTextEntry={true}
                  onChangeText={setPin}
                  maxLength={6}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              </View>

              <TouchableOpacity
                style={styles.signInhandler}
                onPress={() => handleSignIn()}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}
