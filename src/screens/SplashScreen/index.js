import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { ref, get, remove, onValue } from "firebase/database";
import { database } from "../../config/database";
import { auth } from "../../config/auth";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/UserSlice";
import CommonLoadingIndicator from "../../components/CommonLoadingIndicator";

const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkConnectionAndCleanup = () => {
      const connectedRef = ref(database, ".info/connected");

      onValue(connectedRef, async (snap) => {
        if (snap.val() === true) {
          console.log("Connected to Firebase, starting cleanup...");
          await cleanupExpiredUsers();
        } else {
          console.log("Not connected to Firebase, skipping cleanup.");
        }
      });
    };

    const cleanupExpiredUsers = async () => {
      setLoading(true);
      try {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const now = Date.now();

          snapshot.forEach(async (child) => {
            const user = child.val();
            const userKey = child.key;

            if (user.package?.expiresAt && user.package.expiresAt < now) {
              try {
                await signInWithEmailAndPassword(auth, user.email, user.pin);
                const currentUser = auth.currentUser;
                if (currentUser) {
                  await deleteUser(currentUser);
                  console.log(`Deleted Firebase Auth user: ${user.email}`);
                }
              } catch (error) {
                console.log(
                  `Error deleting Firebase Auth user for ${user.email}:`,
                  error
                );
              }

              // Remove from Realtime Database regardless
              try {
                await remove(ref(database, `users/${userKey}`));
                console.log(`Removed user from database: ${user.email}`);
              } catch (dbError) {
                console.log(
                  `Error removing user from database: ${user.email}`,
                  dbError
                );
              }
            }
          });
        } else {
          console.log("No users found in database.");
        }
      } catch (error) {
        console.log("Error fetching users from database:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await AsyncStorage.getItem("userData");
        console.log("splash data", data);

        const parsedData = JSON.parse(data);
        dispatch(setUser(parsedData));
        console.log("fetchuser::", parsedData);

        const timer = setTimeout(() => {
          if (parsedData) {
            if (parsedData?.email === undefined) {
              navigation.replace("AdminDashboard");
            } else {
              navigation.replace("TabNavigation", { screen: "HomeScreen" });
            }
          } else {
            navigation.replace("SignInScreen");
          }
        }, 1500);
        return () => clearTimeout(timer);
      } catch (e) {
        console.log("AsyncStorage get error:", e);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      checkConnectionAndCleanup();
    }, 1000);

    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <CommonLoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image
              source={require("../../../assets/Logo_with_bg.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.tagLine}>Welcome to After Makers!</Text>
        </View>
      )}
    </>
  );
};

export default SplashScreen;
