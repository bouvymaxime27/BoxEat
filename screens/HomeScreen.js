import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, backgroundColor: colors.white, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>
        Bonjour 👋
      </Text>
      <Text style={{ marginTop: 8, color: '#444' }}>
        Votre cantine digitale – commandez pour la semaine et récupérez en 15s.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={{ marginTop: 24, backgroundColor: colors.green, padding: 16, borderRadius: 14 }}>
        <Text style={{ color: colors.white, textAlign: 'center', fontWeight: '700' }}>
          Voir le menu de la semaine
        </Text>
      </TouchableOpacity>
    </View>
  );
}
