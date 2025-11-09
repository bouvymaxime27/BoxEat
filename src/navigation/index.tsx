
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';

// Screens
import HomeScreen from '../../screens/HomeScreen';
import MenuScreen from '../../screens/MenuScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import OrdersScreen from '../screens/OrdersScreen';
import QRScanScreen from '../screens/QRScanScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FaqScreen from '../screens/FaqScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.white },
          headerTintColor: colors.green,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{ title: 'Menu de la semaine' }}
        />
        <Stack.Screen 
          name="MealDetails" 
          component={MealDetailsScreen}
          options={{ title: 'Détails du plat' }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ title: 'Mon panier' }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{ title: 'Paiement' }}
        />
        <Stack.Screen 
          name="Orders" 
          component={OrdersScreen}
          options={{ title: 'Mes commandes' }}
        />
        <Stack.Screen 
          name="QRScan" 
          component={QRScanScreen}
          options={{ title: 'Scanner QR' }}
        />
        <Stack.Screen 
          name="Subscription" 
          component={SubscriptionScreen}
          options={{ title: 'Mon abonnement' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Mon profil' }}
        />
        <Stack.Screen 
          name="Faq" 
          component={FaqScreen}
          options={{ title: 'FAQ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
