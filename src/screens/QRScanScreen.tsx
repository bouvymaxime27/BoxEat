
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default function QRScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner QR</Text>
      <Text style={styles.description}>
        Fonctionnalité de scan QR à implémenter avec expo-camera
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
