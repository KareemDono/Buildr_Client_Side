import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Image } from 'react-native';


const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('IntroductionPage');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <View style={styles.blackBlock}>
          <Image
            source={require('../images/SplashIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Buildr</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  blackBlock: {
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 7.5,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: 10,
    fontSize: 22,
    },
});

export default SplashScreen;
