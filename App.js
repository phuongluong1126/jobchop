import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { DetailCompanyScreen, DetailJobScreen, FilterMarket, FilterScreen, SearchScreen, UpdateProfile } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigation from "./navigation/BottomNavigation";
import { SafeAreaView } from "react-native";
import { COLORS } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/OnboardingScreen";
import { SetJobs } from "./actions/job";
import SetupProfile from "./screens/SetupProfile";
const Stack = createStackNavigator();
const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

function App() {
  const [fontLoading, setFontLoading] = useState(true);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  useEffect(
    () => async () => {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem("isAppFirstLaunched", "false");
      } else {
        setIsAppFirstLaunched(false);
      }
    },
    []
  );
  console.log("render app");

  if (fontLoading) {
    return (
      <Provider store={store}>
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => {
            setFontLoading(false);
          }}
          onError={console.warn}
        />
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray1,
            // paddingTop: Platform.OS === "android" ? 25 : 0,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              // initialRouteName={isAppFirstLaunched ? "OnboardingScreen" : "BottomNavigation"}
              initialRouteName="OnboardingScreen"
              // initialRouteName="BottomNavigation"
            >
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
              />
              <Stack.Screen
                name="BottomNavigation"
                component={BottomNavigation}
              />
              <Stack.Screen name="SetupProfile" component={SetupProfile} />
              <Stack.Screen
                name="DetailJobScreen"
                component={DetailJobScreen}
              />
              <Stack.Screen name="FilterScreen" component={FilterScreen} />
              <Stack.Screen name="FilterMarket" component={FilterMarket} />
              <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
              <Stack.Screen
                name="DetailCompanyScreen"
                component={DetailCompanyScreen}
              />
                            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}
export default App;
