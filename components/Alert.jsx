import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Alert = ({ type, title, message, buttonText, buttonPressHandler  }) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[styles.alertContainer, getAlertStyle()]}>
      {title && <Text style={styles.alertTitle}>{title}</Text>}
      <Text style={styles.alertText}>{message}</Text>
      {buttonText && buttonPressHandler && (
        <TouchableOpacity style={styles.alertButton} onPress={buttonPressHandler}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    
  },
  alertContainer: {
    // padding: 15,
    // borderRadius: 5,
    // marginVertical: 10,
    // width: '90%',
    // alignSelf: 'center',
    // alignItems: 'center',
    position: 'absolute',  // Make the alert positioned absolutely
    top: 300,  // Adjust the alert to be shown at the top of the screen
    left: 0,
    right: 0,
    marginHorizontal: 20,  // Optional: Add some horizontal margin
    padding: 15,
    borderRadius: 5,
    zIndex: 1000,  // Ensure it appears on top
    alignSelf: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  alertButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: ''
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#4CAF50', // Green
  },
  error: {
    backgroundColor: '#F44336', // Red
  },
  warning: {
    backgroundColor: '#FF9800', // Orange
  },
  default: {
    backgroundColor: '#2196F3', // Blue (default)
  },
  
});

export default Alert;
