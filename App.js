
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ReservationsProvider } from './src/context/ReservationsContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

import Splash from './components/Splash';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import MenuScreen from './screens/MenuScreen';
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

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSplash) {
    return <Splash />;
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#3FAE49',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MainMenu" 
            component={MainMenuScreen}
            options={{ title: 'BoxEat' }}
          />
          <Stack.Screen 
            name="Menu" 
            component={MenuScreen}
            options={{ title: 'Menu de la semaine' }}
          />
          <Stack.Screen 
            name="MealDetail" 
            component={MealDetailScreen}
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
            name="Account" 
            component={AccountScreen}
            options={{ title: 'Mon profil' }}
          />
          <Stack.Screen 
            name="Reservations" 
            component={ReservationsScreen}
            options={{ title: 'Mes commandes' }}
          />
          <Stack.Screen 
            name="Historique" 
            component={HistoriqueScreen}
            options={{ title: 'Historique' }}
          />
          <Stack.Screen 
            name="Fidelite" 
            component={FideliteScreen}
            options={{ title: 'Fidélité' }}
          />
          <Stack.Screen 
            name="Abonnement" 
            component={AbonnementScreen}
            options={{ title: 'Mon abonnement' }}
          />
          <Stack.Screen 
            name="Planification" 
            component={PlanificationScreen}
            options={{ title: 'Planification' }}
          />
          <Stack.Screen 
            name="Pickup" 
            component={PickupScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen}
            options={{ title: 'Connexion' }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ title: 'Créer un compte' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <CartProvider>
            <ReservationsProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </ReservationsProvider>
          </CartProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
