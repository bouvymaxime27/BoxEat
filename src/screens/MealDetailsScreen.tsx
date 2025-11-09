
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing } from '../theme';
import QuantityStepper from '../components/QuantityStepper';
import Button from '../components/Button';
import { useCart } from '../store/cart.store';
import { Meal } from '../types';

export default function MealDetailsScreen({ route, navigation }: any) {
  const { meal } = route.params as { meal: Meal };
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    addItem({ mealId: meal.id, quantity, unitPriceCents: meal.priceCents });
    navigation.goBack();
  };

  const formatPrice = (cents: number) => `${(cents / 100).toFixed(2)} €`;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.supplier}>{meal.supplier}</Text>
        
        <View style={styles.labels}>
          {meal.labels.map((label) => (
            <View key={label} style={styles.label}>
              <Text style={styles.labelText}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{meal.description}</Text>

        <View style={styles.nutritionBox}>
          <Text style={styles.nutritionTitle}>Valeurs nutritionnelles (100g)</Text>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Calories</Text>
            <Text style={styles.nutritionValue}>{meal.calories} kcal</Text>
          </View>
        </View>

        {meal.allergens.length > 0 && (
          <View style={styles.allergensBox}>
            <Text style={styles.allergensTitle}>⚠️ Allergènes</Text>
            <Text style={styles.allergensText}>{meal.allergens.join(', ')}</Text>
          </View>
        )}

        <View style={styles.conservationBox}>
          <Text style={styles.conservationTitle}>Conservation</Text>
          <Text style={styles.conservationText}>
            À consommer sous {meal.dlcDays} jours • Conserver entre 2-4°C
          </Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Prix unitaire</Text>
            <Text style={styles.price}>{formatPrice(meal.priceCents)}</Text>
          </View>
          <QuantityStepper
            value={quantity}
            onIncrement={() => setQuantity(q => q + 1)}
            onDecrement={() => setQuantity(q => q - 1)}
          />
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{formatPrice(meal.priceCents * quantity)}</Text>
        </View>

        <Button 
          title={`Ajouter au panier (${formatPrice(meal.priceCents * quantity)})`}
          onPress={handleAdd}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  supplier: {
    fontSize: 14,
    color: '#666',
    marginBottom: spacing.md,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  label: {
    backgroundColor: colors.gray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  nutritionBox: {
    backgroundColor: colors.green + '15',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.green,
    marginBottom: spacing.sm,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionLabel: {
    fontSize: 14,
    color: colors.text,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  allergensBox: {
    backgroundColor: colors.orange + '15',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  allergensTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.orange,
    marginBottom: spacing.xs,
  },
  allergensText: {
    fontSize: 13,
    color: colors.text,
  },
  conservationBox: {
    backgroundColor: colors.gray,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  conservationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  conservationText: {
    fontSize: 13,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    marginBottom: spacing.lg,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.green,
  },
});
