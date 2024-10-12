import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // OTP sent status
  const [isEditable, setIsEditable] = useState(true); // To control phone number field editing

const saveUserSession = async (userData) => {
  try {
    await AsyncStorage.setItem('userSession', JSON.stringify(userData)).then(()=>{
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProductListing' }],
      });
    })
    console.log('done saving session');
  } catch (error) {
    console.log('Error saving session:', error);
  }
};

// Example: When user logs in
const handleLogin = (userData) => {
  saveUserSession(userData);
  
 
  // Navigate to home or dashboard after login
};

  const handleSendOtp = () => {
    const mobileRegex = /^[0-9]{10}$/; // Regex for 10-digit mobile numbers

    if (!mobileRegex.test(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // Simulate sending OTP
    Alert.alert('OTP Sent', 'An OTP has been sent to your mobile number.');
    setOtpSent(true);
    setIsEditable(false); // Lock the phone number field after sending OTP
  };

  const handleVerifyOtp = () => {
    const staticOtp = '1234';

    if (otp !== staticOtp) {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
      return;
    }
    handleLogin(mobileNumber);
    // Navigate to Product Listing Screen on successful OTP verification


  };

  const handleEditPhoneNumber = () => {
    setOtpSent(false); // Show "Send OTP" button again
    setIsEditable(true); // Allow phone number editing
    setOtp(''); // Clear OTP input field
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        placeholderTextColor="white"
        keyboardType="numeric"
        maxLength={10}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        editable={isEditable} // Make input non-editable when OTP is sent
      />

      {/* Conditionally Render Buttons */}
      {!otpSent ? (
        // Send OTP Button
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* OTP Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="white"
            keyboardType="numeric"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
          />

          {/* Verify OTP Button */}
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          {/* Edit Phone Number Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditPhoneNumber}>
            <Text style={styles.editButtonText}>Edit Phone Number</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#101010',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#FF6347',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'black',
    color: 'white',
    fontWeight: '100',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Arial',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#808080',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
