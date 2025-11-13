
import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CategoryChips from '../components/CategoryChips';
import MealCard from '../components/MealCard';
import { MEALS_DATA } from '../src/data/meals';
import { colors, spacing, borderRadius, typography } from '../theme';

const CATEGORIES = [
  { key: 'all', label: 'Tous' },
  { key: 'healthy', label: 'Healthy' },
  { key: 'veggie', label: 'Végé' },
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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Rechercher un plat…"
            placeholderTextColor={colors.textLight}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CategoryChips categories={CATEGORIES} activeKey={category} onChange={setCategory} />

      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Menus de la semaine</Text>
        <Text style={styles.resultCount}>{filtered.length} plat{filtered.length > 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={() => handleMealPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>Aucun plat trouvé</Text>
            <Text style={styles.emptySubtext}>Essayez une autre recherche</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  searchContainer: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  clearIcon: {
    fontSize: 18,
    color: colors.textLight,
    padding: spacing.xs,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  resultCount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  list: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  empty: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
