import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "./src/constant/Colors";
import SplashScreen from "./src/screens/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import TabNavigation from "./src/navigation/TabNavigation";
import AdminDashboard from "./src/screens/AdminDashboard";
import PostUploadScreen from "./src/screens/AdminDashboard/PostUploadScreen";
import RegisterScreen from "./src/screens/AdminDashboard/RegisterScreen";
import UserDetailsScreen from "./src/screens/AdminDashboard/UserDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PostUploadScreen"
              component={PostUploadScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UserDetailsScreen"
              component={UserDetailsScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
