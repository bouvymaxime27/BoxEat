
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

export default function MealCard({ meal, onPress }) {
  const imageUrl = meal.imageUrl || meal.image || 'https://via.placeholder.com/120x120/3FAE49/FFFFFF?text=BoxEat';
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {meal.title || meal.name}
          </Text>
          {meal.day && (
            <View style={styles.dayBadge}>
              <Text style={styles.dayText}>{meal.day}</Text>
            </View>
          )}
        </View>
        
        {meal.description && (
          <Text style={styles.description} numberOfLines={2}>
            {meal.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            {meal.kcal && (
              <View style={styles.info}>
                <Text style={styles.infoIcon}>🔥</Text>
                <Text style={styles.infoText}>{meal.kcal} kcal</Text>
              </View>
            )}
            {meal.tag && (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{meal.tag}</Text>
              </View>
            )}
          </View>
          <Text style={styles.price}>{meal.price.toFixed(2)} €</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.small,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.surface,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  dayBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  dayText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoIcon: {
    fontSize: 14,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  tagBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  price: {
    ...typography.h4,
    color: colors.primary,
  },
});
