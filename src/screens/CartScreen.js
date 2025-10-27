import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme';

export default function CartScreen() {
  return (
    <View style={{ flex:1, backgroundColor: colors.white, padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>
        Mon panier 🛒
      </Text>
    </View>
  );
}
