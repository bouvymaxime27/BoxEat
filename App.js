
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReservationsProvider } from './src/context/ReservationsContext';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AccountScreen from './screens/AccountScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import HistoriqueScreen from './screens/HistoriqueScreen';
import FideliteScreen from './screens/FideliteScreen';
import AbonnementScreen from './screens/AbonnementScreen';
import PlanificationScreen from './screens/PlanificationScreen';
import PickupScreen from './screens/PickupScreen';
import MenuScreen from './screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReservationsProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Welcome"
              screenOptions={{ 
                headerShown: false
              }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="MainMenu" component={MainMenuScreen} />
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="MealDetail" component={MealDetailScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="Account" component={AccountScreen} />
              <Stack.Screen name="Reservations" component={ReservationsScreen} />
              <Stack.Screen name="Historique" component={HistoriqueScreen} />
              <Stack.Screen name="Fidelite" component={FideliteScreen} />
              <Stack.Screen name="Abonnement" component={AbonnementScreen} />
              <Stack.Screen name="Planification" component={PlanificationScreen} />
              <Stack.Screen name="Pickup" component={PickupScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ReservationsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
