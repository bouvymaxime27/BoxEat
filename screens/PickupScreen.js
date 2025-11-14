
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useReservations } from '../src/context/ReservationsContext';
import { colors, spacing, borderRadius, typography } from '../theme';

export default function PickupScreen({ route, navigation }) {
  const { code, total, items } = route.params;
  const { addReservation } = useReservations();

  useEffect(() => {
    addReservation({
      code,
      total,
      items,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>✅</Text>
        </View>

        <Text style={styles.title}>Paiement confirmé !</Text>
        <Text style={styles.subtitle}>
          Votre commande a été enregistrée avec succès
        </Text>

        <View style={styles.qrContainer}>
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrCode}>{code}</Text>
          </View>
          <Text style={styles.qrLabel}>Code de retrait</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📍 Point de retrait</Text>
          <Text style={styles.infoText}>Machine BoxEat principale</Text>
          
          <Text style={styles.infoTitle}>🕐 Disponible</Text>
          <Text style={styles.infoText}>À partir de maintenant</Text>
          
          <Text style={styles.infoTitle}>💡 Instructions</Text>
          <Text style={styles.infoText}>
            1. Rendez-vous à la machine BoxEat{'\n'}
            2. Scannez ce code QR ou entrez le code{'\n'}
            3. Récupérez vos plats{'\n'}
            4. Bon appétit ! 🍽️
          </Text>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Récapitulatif</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryItemText}>
                {item.qty}x {item.title} ({item.day})
              </Text>
              <Text style={styles.summaryItemPrice}>{item.price.toFixed(2)} €</Text>
            </View>
          ))}
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>{total.toFixed(2)} €</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reservations')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Voir mes commandes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  successIcon: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  successEmoji: {
    fontSize: 80,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  qrCode: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '800',
  },
  qrLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  orderSummary: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryItemText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  summaryItemPrice: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryTotalLabel: {
    ...typography.h4,
    color: colors.text,
  },
  summaryTotalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    padding: spacing.md,
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
