import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const svgBackground = `
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
    <path d="M0,100 C125,160 480,-60 550,40 L500,150 L0,150 Z" style="stroke: none; fill: #c8ddeb;"></path>
  </svg>
`;

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginPress = () => {
    // Fetch all user data from the backend
    fetch("https://buidrbackend.cyclic.app/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Find the user with matching email and password
        const user = data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Login successful
          console.log("Login successful");
          navigation.navigate("Homepage");
        } else {
          // Login failed
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate("ForgotPassPage");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.background}>
          <SvgXml xml={svgBackground} width="100%" height="100%" />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../images/SplashIcon.png")}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.cardContainer}>
          <Card style={styles.card} elevation={0}>
            <Card.Content>
              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email"
                    mode="outlined"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Password"
                    mode="outlined"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              {error !== "" && <Text style={styles.errorText}>{error}</Text>}
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button
                mode="contained"
                style={styles.loginButton}
                onPress={handleLoginPress}
              >
                Login
              </Button>
            </Card.Actions>
            <Card.Actions style={styles.actions}>
              <Text style={styles.registerText}>
                Don't have an account?{" "}
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate("Register")}
                >
                  Register Now
                </Text>
              </Text>
            </Card.Actions>
            <Card.Actions style={styles.actions}>
              <Text style={styles.forgotPasswordText} onPress={handleForgotPasswordPress}>
                Forgot Password?
              </Text>
            </Card.Actions>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F3F6F8",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 5,
  },
  cardContainer: {
    width: "84%",
    marginVertical: -10,
    elevation: 4,
    backgroundColor: "#00",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.35)", //transparent register card
  },
  input: {
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  loginButton: {
    width: "50%",
    marginBottom: 10,
    backgroundColor: "#93aec0",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 0,
    alignSelf: "center",
    marginRight: 75,
    marginBottom: -10,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
    marginRight: 50,
    marginTop: 0,
  },
  registerLink: {
    color: "#007bff",
    textDecorationLine: "underline",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007bff",
    textDecorationLine: "underline",
    justifyContent:"center",
    marginRight: 100
  },
  errorText: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginPage;
