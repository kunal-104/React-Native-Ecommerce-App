import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native'; // Import for resetting navigation

const ProfileScreen = ({ navigation }) => {
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userSession').then(()=>{
        console.log('logout done');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      })
    } catch (error) {
      console.log('Error clearing session:', error);
    }
  };

  const handleLogout = () => {
    logoutUser();

  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={28} color="#f00" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Profile Information */}
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileDetails}>
        <Text style={styles.profileInfo}>Name: John Doe</Text>
        <Text style={styles.profileInfo}>Email: john@example.com</Text>
      </View>

      {/* Back to Products Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Black theme background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  profileDetails: {
    backgroundColor: '#2b2b2b', // Slightly lighter black for contrast
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
  },
  profileInfo: {
    fontSize: 18,
    color: '#bbb', // Light gray text
    marginVertical: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: '#f00',
    fontSize: 16,
    marginLeft: 5,
  },
  backButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
