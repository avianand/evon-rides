/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
  configureFonts
} from "react-native-paper";
import {useMaterial3Theme} from "@pchmn/expo-material3-theme";
import {useColorScheme} from "react-native";

// local imports
import ProfileNewForUser from "./src/Pages/Profile/profile.new";
import ProfileUser from "./src/Pages/Profile/profile.user";
import LoginScreenForNewUser from "./src/Pages/Login/login.new";
import LoginScreenForExistingUser from "./src/Pages/Login/login.existing";
import LoginScreen from "./src/Pages/Login/login";
import WebsiteDetails from "./src/Pages/Profile/website.details";
import {LightTheme, DarkTheme} from "./src/Styles/themes";
import HomeScreenForGuestUser from "./src/Pages/Home/home.guest";
import {fontConfig} from "./src/Styles/fontConfig";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const {theme} = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: {...theme.dark, ...DarkTheme.colors},
          fonts: configureFonts({config: fontConfig})
        }
      : {
          ...MD3LightTheme,
          colors: {...theme.light, ...LightTheme.colors},
          fonts: configureFonts({config: fontConfig})
        };

  const {LightTheme: LightThemeAdapt} = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme
  });

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={LightThemeAdapt}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreenForGuestUser} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Login new" component={LoginScreenForNewUser} />
          <Stack.Screen name="Profile user" component={ProfileUser} />
          <Stack.Screen name="Profile new" component={ProfileNewForUser} />
          <Stack.Screen name="Website details" component={WebsiteDetails} />
          <Stack.Screen
            name="Login existing"
            component={LoginScreenForExistingUser}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
