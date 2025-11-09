
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../src/theme';
import { Meal } from '../src/types';

interface MealCardProps {
  meal: Meal;
  onPress: () => void;
  onAdd: () => void;
}

export default function MealCard({ meal, onPress, onAdd }: MealCardProps) {
  const formatPrice = (cents: number) => `${(cents / 100).toFixed(2)} €`;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>{meal.name}</Text>
        {meal.description && (
          <Text numberOfLines={2} style={styles.description}>{meal.description}</Text>
        )}
        <View style={styles.labels}>
          {meal.labels.slice(0, 2).map((label) => (
            <View key={label} style={styles.label}>
              <Text style={styles.labelText}>{label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{formatPrice(meal.priceCents)}</Text>
            <Text style={styles.calories}>{meal.calories} kcal</Text>
          </View>
          <TouchableOpacity onPress={onAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text,
  },
  description: {
    color: '#666',
    marginTop: spacing.xs,
    fontSize: 13,
  },
  labels: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  label: {
    backgroundColor: colors.gray,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  labelText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.text,
  },
  calories: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: colors.green,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
});
