
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { useCart } from '../src/context/CartContext';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  const userName = user?.email?.split('@')[0] || 'utilisateur';

  const menuItems = [
    { icon: '🥗', title: 'Menu de la semaine', subtitle: 'Découvrez nos plats', route: 'Menu', color: '#3FAE49' },
    { icon: '🛒', title: 'Mon panier', subtitle: `${cartCount} article${cartCount > 1 ? 's' : ''}`, route: 'Cart', color: '#F47C20' },
    { icon: '📋', title: 'Mes commandes', subtitle: 'Historique et statuts', route: 'Reservations', color: '#2196F3' },
    { icon: '💳', title: 'Mon abonnement', subtitle: 'Gérer votre formule', route: 'Abonnement', color: '#9C27B0' },
    { icon: '👤', title: 'Mon profil', subtitle: 'Paramètres du compte', route: 'Account', color: '#607D8B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjour {userName} 👋</Text>
          <Text style={styles.subtitle}>
            Votre cantine digitale – commandez pour la semaine et récupérez en 15s
          </Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickActionCard, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Menu')}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>🍽️</Text>
            <Text style={styles.quickActionTitle}>Commander maintenant</Text>
            <Text style={styles.quickActionSubtitle}>Menu de la semaine disponible</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: item.color + '15' }]}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Comment ça marche ?</Text>
          <Text style={styles.infoText}>
            1. Commandez vos repas pour la semaine{'\n'}
            2. Payez en ligne de manière sécurisée{'\n'}
            3. Récupérez vos plats à la machine BoxEat{'\n'}
            4. Scannez votre QR code et bon appétit !
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  quickActions: {
    marginBottom: spacing.lg,
  },
  quickActionCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  quickActionIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuGrid: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuIcon: {
    fontSize: 24,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.textLight,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});
