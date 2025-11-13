
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, Alert } from 'react-native';
import { useCart } from '../src/context/CartContext';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

export default function CartScreen({ navigation }) {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const total = getTotal();

  const handleRemove = (item) => {
    Alert.alert(
      'Retirer du panier',
      `Voulez-vous retirer ${item.title || item.name} du panier ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Retirer', style: 'destructive', onPress: () => removeFromCart(item.id) },
      ]
    );
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Panier vide', 'Ajoutez des plats avant de passer au paiement');
      return;
    }
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }) => {
    const imageUrl = item.imageUrl || item.image || 'https://via.placeholder.com/80x80/3FAE49/FFFFFF?text=Box';
    
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: imageUrl }} style={styles.itemImage} />
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title || item.name}
          </Text>
          {item.day && (
            <Text style={styles.itemDay}>{item.day}</Text>
          )}
          <Text style={styles.itemPrice}>{item.price.toFixed(2)} €</Text>
        </View>

        <View style={styles.itemActions}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(item)}
          >
            <Text style={styles.removeButtonText}>Retirer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptySubtitle}>
            Découvrez nos délicieux plats et commencez votre commande
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.emptyButtonText}>Voir le menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabelBold}>Total TTC</Text>
            <Text style={styles.totalValueBold}>{total.toFixed(2)} €</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Passer au paiement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            Alert.alert(
              'Vider le panier',
              'Voulez-vous supprimer tous les articles ?',
              [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Vider', style: 'destructive', onPress: clearCart },
              ]
            );
          }}
        >
          <Text style={styles.clearButtonText}>Vider le panier</Text>
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
  listContent: {
    padding: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
  },
  itemDetails: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  itemTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  itemDay: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  itemPrice: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  quantityValue: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginTop: spacing.sm,
  },
  removeButtonText: {
    ...typography.bodySmall,
    color: colors.error,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.large,
  },
  totalSection: {
    marginBottom: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  totalLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  totalValue: {
    ...typography.body,
    color: colors.text,
  },
  totalLabelBold: {
    ...typography.h4,
    color: colors.text,
  },
  totalValueBold: {
    ...typography.h3,
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: spacing.md + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  clearButton: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  clearButtonText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  emptyButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
