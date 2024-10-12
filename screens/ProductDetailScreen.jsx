import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch
// import { addToCart } from '../store/actions/cartActions'; // Import addToCart action
import { addItem } from '../redux/features/cartSlice';  // Import actions

const ProductDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(); // Get dispatch function
  const { product } = route.params; // Get the product details passed from the listing screen
  const [selectedSize, setSelectedSize] = useState(null);


  const handleAddItem = () => {
    const newItem = { id: product.id, name: product.name, price: product.price };  // Example item
    dispatch(addItem(newItem));  // Dispatch addItem action
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    handleAddItem();
    // Add logic to add the product to the cart
    alert(`${product.name} added to cart (Size: ${selectedSize})`);
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Product Details */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>This is a short description of the product.</Text>

      {/* Size Selector */}
      <View style={styles.sizeSelectorContainer}>
        <Text style={styles.sizeLabel}>Select Size:</Text>
        <View style={styles.sizesContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#101010', // Dark background
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FF6347', // Orange color for back button
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#FF6347', // Orange color for price
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  sizeSelectorContainer: {
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  selectedSizeButton: {
    backgroundColor: '#FF6347', // Orange color for selected size
  },
  sizeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedSizeButtonText: {
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#FF6347', // Orange color for Add to Cart button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
