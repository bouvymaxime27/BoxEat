
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import MealCard from '../../components/MealCard';
import { useCart } from '../store/cart.store';
import { Meal } from '../types';

const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Chili sin carne',
    description: 'Chili végétarien aux haricots rouges',
    supplier: 'BoxEat Kitchen',
    labels: ['veggie', 'healthy'],
    calories: 420,
    allergens: [],
    priceCents: 890,
    imageUrl: 'https://via.placeholder.com/300x200/3FAE49/FFFFFF?text=Chili',
    dlcDays: 3,
    day: 'Lundi',
  },
  {
    id: '2',
    name: 'Curry de poulet',
    description: 'Poulet tendre au curry avec riz basmati',
    supplier: 'BoxEat Kitchen',
    labels: ['protein', 'healthy'],
    calories: 580,
    allergens: ['gluten'],
    priceCents: 890,
    imageUrl: 'https://via.placeholder.com/300x200/F47C20/FFFFFF?text=Curry',
    dlcDays: 2,
    day: 'Lundi',
  },
];

export default function MenuScreen({ navigation }: any) {
  const [filter, setFilter] = useState<string>('all');
  const addToCart = useCart((state) => state.add);

  const handleMealPress = (meal: Meal) => {
    navigation.navigate('MealDetails', { meal });
  };

  const handleAddToCart = (meal: Meal) => {
    addToCart(meal, 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_MEALS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => handleMealPress(item)}
            onAdd={() => handleAddToCart(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    padding: spacing.lg,
  },
});
