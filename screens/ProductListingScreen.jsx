import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet , ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/features/productSlice'; // Import fetch action

const products = [
  {
    id: '1',
    name: 'T-Shirt',
    brand: 'Nike',
    price: '$25',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Jeans',
    brand: 'Levi’s',
    price: '$45',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Jacket',
    brand: 'Adidas',
    price: '$65',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Sneakers',
    brand: 'Puma',
    price: '$80',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    name: 'Cap',
    brand: 'Reebok',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    name: 'Socks',
    brand: 'Under Armour',
    price: '$10',
    image: 'https://via.placeholder.com/150',
  },
];

const ProductListingScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [cartItems, setCartItems] = useState([]);


  // const { items: products, status, error } = useSelector((state) => state.products); // Access products from Redux state

  // // Fetch products when component mounts
  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchProducts());
  //   }
  // }, [dispatch, status]);

  // // If loading, show a spinner
  // if (status === 'loading') {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // // If there's an error, show the error message
  // if (status === 'failed') {
  //   return <Text style={styles.errorText}>Error: {error}</Text>;
  // }


  const filteredProducts = products.filter((product) => {
    return (
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      style={isGridView ? styles.gridItem : styles.listItem}
    >
      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
  
      {/* Product details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  
  

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.headerContainer}>
  <TextInput
    style={styles.searchInput}
    placeholder="Search by name or brand"
    placeholderTextColor="white"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
<TouchableOpacity onPress={() => navigation.navigate('Cart')}>
  <View>
    <MaterialIcons name="shopping-cart" size={30} color="white" />
    {cartItems.length > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

</View>


      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        key={isGridView ? 'grid' : 'list'}
        numColumns={isGridView ? 2 : 1}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsGridView(!isGridView)}
      >
        {
          isGridView ? 
          <MaterialIcons name='view-list' size={30} color="white" /> :
          <MaterialIcons name='view-module' size={30} color="white" />
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#101010', // Black background for the entire screen
  },
  headerContainer: {
    flexDirection: 'row',        // To align search bar and cart icon horizontally
    alignItems: 'center',        // Vertically align the items
    justifyContent: 'space-between',  // Space between search bar and cart icon
    padding: 10,                 // Padding around the container
    // backgroundColor: '#2C3E50',  
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,  
    height: 40,
    borderColor: '#333', // Darker border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#1E1E1E',
    color: 'white', // White text
    textShadowColor: 'black',
  },

  productList: {
    paddingBottom: 100, // To account for the floating button
  },
  gridItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#202020', // Dark background for product cards
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%', 
  },
  listItem: {
    
    flexDirection: 'row', // Align content horizontally for list view
    padding: 10,
    backgroundColor: '#202020',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center', // Ensure items are aligned vertically
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productDetails: {
    marginLeft: 15, // Space between image and text
    flex: 1, // Take up available space
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white', // White text for product name
  },
  productBrand: {
    fontSize: 14,
    color: '#777', // Gray text for brand
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#FF6347', // Same color for price
    fontWeight: 'bold',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF6347', // Orange button for FAB
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Shadow effect
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});

export default ProductListingScreen;
