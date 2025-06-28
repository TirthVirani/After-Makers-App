import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Colors } from "../constant/Colors";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.btnColor,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 15
        },
        tabBarStyle: {
          backgroundColor: Colors.backgroundColor
        }
      }}
    >
      <Tab.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          tabBarLabel: "Info",

          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="info" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="person" size={30} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
