// GlobalStyles.js
import { StyleSheet } from "react-native";
import * as Font from "expo-font";

// Load the custom font asynchronously
Font.loadAsync({
  "RobotoMono-ExtraLight": require("../assets/fonts/RobotoMono-ExtraLight.ttf"),
});

export default StyleSheet.create({
  CustomFont: {
    fontFamily: "RobotoMono-ExtraLight",
  },
});
