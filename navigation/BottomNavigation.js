import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS, icons } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, View, Text, StyleSheet } from "react-native";
import {
  AlertScreen,
  ExploreScreen,
  ProfileScreen,
  JobScreen,
  ToolsScreen,
} from "../screens";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 60,
          backgroundColor: COLORS.primary,
        }}
      >
        {children}
      </View>
      {/* <Text style={{color:COLORS.black, ...FONTS.body5}}>
              Công việc
            </Text> */}
    </TouchableOpacity>
  );
};
function BottomNavigation() {
  const openKeyboard = useSelector((state) => state.job.keyBoard);
  // console.log("keyboardopen:", openKeyboard);
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 60,
        },
      })}
    >
      {/* <Tab.Screen name="Job" component={JobScreen} /> */}
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        // component={LoginScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.explore}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Khám phá
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.tool}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Công cụ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="JobScreen"
        component={JobScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.job}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                }}
              />
            </View>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Alert"
        component={AlertScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            >
              <Image
                source={icons.alert}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                  paddingLeft: 10,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Thông báo
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.profile}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Hồ sơ
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen name="Detail Job" component={DetailJob} /> */}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default BottomNavigation;
