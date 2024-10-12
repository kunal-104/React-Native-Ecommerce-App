import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { addItem, removeItem } from '../redux/features/cartSlice';  // Import actions

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const CartScreen = ({ 
  // cartItems = [],
   navigation }) => {
    const dispatch = useDispatch();  // To dispatch actions
    const cartItems = useSelector((state) => state.cart.items);  // Access cart items from Redux
    const totalAmount = useSelector((state) => state.cart.totalAmount);  // Access total amount

    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);

  

    const handleRemoveItem = (id) => {
      dispatch(removeItem(id));  // Dispatch removeItem action
    };
  
    return (
      <View style={styles.container}>
        {/* Profile button on top right */}
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-circle-outline" size={40} color="#fff" />
        </TouchableOpacity>
              {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
  
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            {/* Cart icon when cart is empty */}
            <MaterialCommunityIcons name="cart-outline" size={150} color="#666" style={styles.emptyCartIcon} />
            <Text style={styles.emptyCartText}>Your cart is empty!</Text>
          </View>
        ) : (
          <View style={styles.cartListContainer}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.cartItemText}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{`$${item.price}`}</Text>
                  <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
                </View>
              )}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.buyButton} onPress={() => { /* Implement buying logic */ }}>
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000', // Dark background
      padding: 20,
      paddingTop: 50, // Padding to prevent overlap with status bar
    },
    backButton: {
      // marginBottom: 10,
      padding: 10,
      backgroundColor: '#FF6347', // Orange color for back button
      borderRadius: 5,
      alignSelf: 'flex-start',
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1, 
    },
    backButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    profileButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1, // Ensure the button is on top
    },
    emptyCartContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyCartIcon: {
      opacity: 0.3, // Low opacity for empty cart icon
    },
    emptyCartText: {
      fontSize: 20,
      color: '#888',
      marginTop: 20,
    },
    cartListContainer: {
      flex: 1,
      width: '100%',
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomColor: '#333',
      borderBottomWidth: 1,
    },
    cartItemText: {
      fontSize: 18,
      color: '#fff',
    },
    cartItemPrice: {
      fontSize: 18,
      color: '#bbb',
    },
    totalContainer: {
      padding: 20,
      borderTopColor: '#333',
      borderTopWidth: 1,
      alignItems: 'center',
    },
    totalText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    buyButton: {
      backgroundColor: '#1e90ff',
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 5,
    },
    buyButtonText: {
      color: '#fff',
      fontSize: 18,
    },
  });
  
  export default CartScreen;