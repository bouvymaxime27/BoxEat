
import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import CategoryChips from '../components/CategoryChips';
import MealCard from '../components/MealCard';
import { MEALS_DATA } from '../src/data/meals';
import { colors } from '../theme';

const CATEGORIES = [
  { key: 'all', label: 'Tous' },
  { key: 'healthy', label: 'Healthy' },
  { key: 'veggie', label: 'Veggie' },
  { key: 'protein', label: 'Protéiné' },
];

export default function MenuScreen({ navigation }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const inCat = category === 'all' 
      ? MEALS_DATA 
      : MEALS_DATA.filter(m => (m.tags || []).includes(category));
    const q = query.trim().toLowerCase();
    return q ? inCat.filter(m => (m.name || m.title || '').toLowerCase().includes(q)) : inCat;
  }, [category, query]);

  const handleMealPress = (meal) => {
    navigation.navigate('MealDetail', { meal });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BoxEat</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Rechercher un plat…"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <CategoryChips categories={CATEGORIES} activeKey={category} onChange={setCategory} />

      <Text style={styles.subtitle}>Menus de la semaine</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={() => handleMealPress(item)} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucun plat trouvé.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  subtitle: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#777',
  },
});
