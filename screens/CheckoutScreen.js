
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useCart } from '../src/context/CartContext';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

export default function CheckoutScreen({ navigation }) {
  const { items, getTotal, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [processing, setProcessing] = useState(false);

  const total = getTotal();
  const subtotal = total;
  const tva = total * 0.06;
  const totalTTC = subtotal + tva;

  const paymentMethods = [
    { id: 'card', name: 'Carte bancaire', icon: '💳' },
    { id: 'apple', name: 'Apple Pay', icon: '' },
    { id: 'google', name: 'Google Pay', icon: '🌐' },
    { id: 'sodexo', name: 'Sodexo', icon: '🎫' },
    { id: 'edenred', name: 'Edenred', icon: '🎫' },
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      
      const orderCode = `BX-${Date.now().toString().slice(-6)}`;
      const orderItems = items.map(item => ({
        title: item.title || item.name,
        day: item.day,
        qty: item.quantity,
        price: item.price * item.quantity,
      }));

      clearCart();
      
      navigation.replace('Pickup', {
        code: orderCode,
        total: totalTTC,
        items: orderItems,
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récapitulatif</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.orderItemInfo}>
                <Text style={styles.orderItemName}>{item.title || item.name}</Text>
                <Text style={styles.orderItemDetails}>
                  {item.day} • x{item.quantity}
                </Text>
              </View>
              <Text style={styles.orderItemPrice}>
                {(item.price * item.quantity).toFixed(2)} €
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.paymentMethodActive,
              ]}
              onPress={() => setSelectedPayment(method.id)}
              activeOpacity={0.7}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                <Text style={styles.paymentMethodName}>{method.name}</Text>
              </View>
              <View style={[
                styles.radio,
                selectedPayment === method.id && styles.radioActive,
              ]}>
                {selectedPayment === method.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails du paiement</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sous-total</Text>
            <Text style={styles.priceValue}>{subtotal.toFixed(2)} €</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>TVA (6%)</Text>
            <Text style={styles.priceValue}>{tva.toFixed(2)} €</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total TTC</Text>
            <Text style={styles.totalValue}>{totalTTC.toFixed(2)} €</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, processing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={processing}
          activeOpacity={0.8}
        >
          <Text style={styles.payButtonText}>
            {processing ? 'Traitement...' : `Payer ${totalTTC.toFixed(2)} €`}
          </Text>
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
    padding: spacing.lg,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  orderItemDetails: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  orderItemPrice: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  paymentMethodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  paymentMethodIcon: {
    fontSize: 24,
  },
  paymentMethodName: {
    ...typography.body,
    color: colors.text,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  priceLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  priceValue: {
    ...typography.body,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.text,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.large,
  },
  payButton: {
    backgroundColor: colors.primary,
    padding: spacing.md + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
