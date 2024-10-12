import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingScreen = ({ navigation }) => {
  const [showBackground, setShowBackground] = useState(false);
  const [isUserSession, setIsUserSession] = useState(false);

  // Animations for opacity
  const imageOpacity = useRef(new Animated.Value(0)).current; // Initial opacity for image
  const textOpacity = useRef(new Animated.Value(0)).current;  // Initial opacity for text

  // Function to check if session exists
  const checkUserSession = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      setIsUserSession(!!session); // Set to true if session exists, else false
    } catch (error) {
      console.log('Error checking session:', error);
    }
  };

  useEffect(() => {
    checkUserSession(); // Check session when component mounts
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(true);

      // Fade-in image animation
      Animated.timing(imageOpacity, {
        toValue: 1,  // End opacity
        duration: 1000,  // Duration of the transition
        useNativeDriver: true,  // Enable native driver for better performance
      }).start(() => {
        // Fade-in text animation after image animation completes
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 2300,
          useNativeDriver: true,
        }).start(() => {
          // After animations, navigate based on user session
          if (isUserSession) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'ProductListing' }], // Navigate to Product Listing
              })
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'loginscreens' }], // Navigate to Login
              })
            );
          }
        });
      });
    }, 5000); // Start the animation after 5 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [isUserSession]); // Dependency array includes isUserSession

  return (
    <View style={styles.container}>
      {showBackground ? (
        <Animated.View style={[styles.background, { opacity: imageOpacity }]}>
          <ImageBackground
            source={require('../components/assets/zyra-logo2.jpeg')}
            style={styles.background}
          >
            <Animated.View style={[styles.overlay, { opacity: textOpacity }]}>
              <Text style={styles.tagline}>Welcome to Zyra</Text>
              <Text style={styles.subtitle}>Your Ultimate Fashion Destination</Text>
            </Animated.View>
          </ImageBackground>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.background, { opacity: imageOpacity }]}>
          <Image
            source={require('../components/assets/zyra-logo2.jpeg')}
            style={styles.background}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Optional dark overlay
    width: '100%',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 30,
    textAlign: 'center',
  },
});
