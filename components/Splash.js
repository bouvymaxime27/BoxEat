// components/Splash.js
import React, { useEffect, useRef } from 'react';
import { Text, Image, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Splash() {
  const fade = useRef(new Animated.Value(0)).current;     // opacité
  const scale = useRef(new Animated.Value(0.96)).current; // zoom "respiration"

  useEffect(() => {
    // fondu d'entrée
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // pulsation infinie (aller-retour)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.96,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fade, scale]);

  return (
    <LinearGradient
      colors={['#0F172A', '#111827', '#0B1220']}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <Animated.View style={{ alignItems: 'center', gap: 14, opacity: fade, transform: [{ scale }] }}>
        <Image
          source={require('../assets/logo-boxeat.png')}
          style={{ width: 120, height: 120, borderRadius: 24 }}
          resizeMode="contain"
        />
        <Text style={{ color: 'white', fontSize: 26, fontWeight: '800', letterSpacing: 0.5 }}>
          BoxEat
        </Text>
        <Text style={{ color: '#cbd5e1', fontSize: 14 }}>Chargement…</Text>
      </Animated.View>
    </LinearGradient>
  );
}
