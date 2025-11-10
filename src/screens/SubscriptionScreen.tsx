
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

const PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    price: '9.90€/mois',
    features: ['10 repas/mois', 'Réservation 24h à l\'avance', 'Support email'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '49.90€/mois',
    features: ['50 repas/mois', 'Réservation instantanée', 'Support prioritaire', '10% de réduction'],
  },
];

export default function SubscriptionScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Abonnements</Text>
      
      {PLANS.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>{plan.price}</Text>
          
          {plan.features.map((feature, idx) => (
            <Text key={idx} style={styles.feature}>✓ {feature}</Text>
          ))}
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>S'abonner</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  planCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.green,
    marginBottom: spacing.md,
  },
  feature: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  button: {
    backgroundColor: colors.green,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
