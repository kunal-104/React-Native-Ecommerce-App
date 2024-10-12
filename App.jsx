import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import the store
import Loginscreen from './screens/LoginScreen';
import Landingscreen from './screens/LandingScreen';
import ProductListingScreen from './screens/ProductListingScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import { Easing } from 'react-native-reanimated';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Landingscreen} 
        options={{
            headerShown: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 2000, // Transition duration (milliseconds)
                  easing: Easing.out(Easing.poly(4)), // Easing function for smooth effect
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 2000,
                  easing: Easing.in(Easing.poly(4)),
                },
              },
            },
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress, // Fades in
              },
            }),
          }}/>
        <Stack.Screen name="loginscreens" component={Loginscreen} />
        <Stack.Screen name="ProductListing" component={ProductListingScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
