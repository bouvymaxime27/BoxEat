
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import { useCart } from '../src/context/CartContext';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

export default function MealDetailScreen({ route, navigation }) {
  const { meal } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => Math.min(10, q + 1));
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(meal, quantity);
    Alert.alert(
      'Ajouté au panier',
      `${quantity} x ${meal.title || meal.name} ajouté${quantity > 1 ? 's' : ''} au panier`,
      [
        { text: 'Continuer', style: 'cancel' },
        { text: 'Voir le panier', onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  const imageUrl = meal.imageUrl || meal.image || 'https://via.placeholder.com/400x300/3FAE49/FFFFFF?text=BoxEat';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{meal.title || meal.name}</Text>
              {meal.day && (
                <View style={styles.dayBadge}>
                  <Text style={styles.dayBadgeText}>{meal.day}</Text>
                </View>
              )}
            </View>
            
            {meal.description && (
              <Text style={styles.description}>{meal.description}</Text>
            )}
          </View>

          <View style={styles.infoGrid}>
            {meal.kcal && (
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>🔥</Text>
                <Text style={styles.infoValue}>{meal.kcal}</Text>
                <Text style={styles.infoLabel}>kcal</Text>
              </View>
            )}
            
            {meal.tag && (
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>🏷️</Text>
                <Text style={styles.infoValue}>{meal.tag}</Text>
                <Text style={styles.infoLabel}>Type</Text>
              </View>
            )}
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Prix</Text>
            <Text style={styles.price}>{meal.price.toFixed(2)} €</Text>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantité</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={decrement}
                disabled={quantity <= 1}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.quantityButton, quantity >= 10 && styles.quantityButtonDisabled]}
                onPress={increment}
                disabled={quantity >= 10}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceLabel}>Total</Text>
          <Text style={styles.footerPriceValue}>{(meal.price * quantity).toFixed(2)} €</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
  },
  dayBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  dayBadgeText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.h4,
    color: colors.text,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  priceSection: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  priceLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.h1,
    color: colors.primary,
  },
  quantitySection: {
    marginBottom: spacing.lg,
  },
  quantityLabel: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: colors.border,
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  quantityValue: {
    ...typography.h2,
    color: colors.text,
    minWidth: 60,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.large,
  },
  footerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  footerPriceLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footerPriceValue: {
    ...typography.h3,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: spacing.md + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
