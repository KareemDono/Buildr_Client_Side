import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../utils/GlobalStyles";

const IntroductionPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const svgBackground = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
      <path d="M0,100 C125,160 480,-60 550,40 L500,150 L0,150 Z" style="stroke: none; fill: #c8ddeb;"></path>
    </svg>
  `;

  const carouselData = [
    {
      title: "Custom PC Configurations",
      content:
        "Our expertise lies in creating personalized PC configurations tailored to your needs. With a wide range of options, we help you select the perfect components that fit your budget, preferences, and performance requirements. Build a PC that matches your unique specifications and gaming or professional aspirations.",
    },
    {
      title: "Pre-Built PCs Ready to Go",
      content:
        "Explore our collection of pre-built PCs, carefully crafted and rigorously tested for exceptional performance. Whether you're a casual user, a gamer, or a professional, our pre-built systems offer a hassle-free experience. Enjoy top-tier hardware, seamless integration, and immediate availability. Choose from a variety of configurations to find the ideal PC for your needs.",
    },
    {
      title: "PC Parts for DIY Enthusiasts",
      content:
        "For those who enjoy the thrill of building their own PCs, we provide a wide selection of high-quality PC parts. From processors and graphics cards to motherboards and storage solutions, we offer a comprehensive range of components. Embark on your DIY journey with confidence, knowing that you can rely on our top-notch parts to create a custom PC that meets your specific requirements.",
    },
  ];


  const handleNext = () => {
    if (currentCardIndex < carouselData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background]}>
        <SvgXml xml={svgBackground} width="100%" height="100%" />
      </Animated.View>
      <View style={styles.contentContainer}>
        <Image source={require("../images/Logo.png")} style={styles.logo} />
        <View style={styles.carouselContainer}>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>
                    {carouselData[currentCardIndex].title}
                  </Text>
                </View>
                <View style={styles.titleUnderline} />
                <Text style={[GlobalStyles.CustomFont, styles.text]}>
                  {carouselData[currentCardIndex].content}
                </Text>
              </Card.Content>
            </Card>
            <View style={styles.navigationContainer}>
              {currentCardIndex > 0 && (
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={handlePrevious}
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              )}
              {currentCardIndex < carouselData.length - 1 && (
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={handleNext}
                >
                  <Ionicons name="arrow-forward" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {currentCardIndex === carouselData.length - 1 && (
          <Button
            mode="contained"
            style={[styles.button, styles.getStartedButton]}
            onPress={() => navigation.replace("Register")}
          >
            Get Started
          </Button>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: "#F3F6F8",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  carouselContainer: {
    width: "80%",
    marginBottom: 40,
  },
  cardContainer: {
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    padding: 16,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  titleUnderline: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
  },
  getStartedButton: {
    backgroundColor: "#93aec0",
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 0,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  arrowButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default IntroductionPage;