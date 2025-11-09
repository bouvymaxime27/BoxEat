
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, borderRadius, spacing } from '../theme';
import { generateQRCode } from '../utils/qr';

const MOCK_ORDERS = [
  {
    id: 'BX-001234',
    date: '2025-01-15',
    items: [
      { name: 'Pad thaï aux crevettes', quantity: 1, price: 8.90 },
      { name: 'Salade César', quantity: 1, price: 7.50 },
    ],
    total: 16.40,
    status: 'PRET',
    machineId: 'M-BXL-01',
    slotDate: '2025-01-16T12:00:00',
  },
  {
    id: 'BX-001189',
    date: '2025-01-08',
    items: [
      { name: 'Curry de poulet', quantity: 2, price: 8.90 },
    ],
    total: 17.80,
    status: 'RETIRE',
    machineId: 'M-BXL-01',
    slotDate: '2025-01-09T12:30:00',
  },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PREP: { label: 'En préparation', color: colors.orange },
  STOCKE: { label: 'Stocké', color: '#2196F3' },
  PRET: { label: 'Prêt à retirer', color: colors.green },
  RETIRE: { label: 'Retiré', color: '#999' },
};

export default function OrdersScreen({ navigation }: any) {
  const [selectedQR, setSelectedQR] = React.useState<string | null>(null);

  const handleShowQR = async (orderId: string) => {
    const qrDataUrl = await generateQRCode(orderId);
    setSelectedQR(qrDataUrl);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes commandes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
          <Text style={styles.subscriptionLink}>Mon abonnement →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loyaltyCard}>
        <Text style={styles.loyaltyTitle}>🎁 Programme fidélité</Text>
        <Text style={styles.loyaltyText}>9/10 repas - Encore 1 repas pour 1 offert !</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '90%' }]} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>À venir</Text>
      {MOCK_ORDERS.filter(o => o.status !== 'RETIRE').map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>{order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: STATUS_LABELS[order.status].color + '20' }]}>
              <Text style={[styles.statusText, { color: STATUS_LABELS[order.status].color }]}>
                {STATUS_LABELS[order.status].label}
              </Text>
            </View>
          </View>
          
          {order.items.map((item, idx) => (
            <View key={idx} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
              <Text style={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)} €</Text>
            </View>
          ))}
          
          <View style={styles.orderFooter}>
            <View>
              <Text style={styles.dateLabel}>Retrait prévu</Text>
              <Text style={styles.dateValue}>
                {new Date(order.slotDate).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </Text>
            </View>
            <Text style={styles.totalPrice}>{order.total.toFixed(2)} €</Text>
          </View>

          {order.status === 'PRET' && (
            <TouchableOpacity 
              style={styles.qrButton}
              onPress={() => handleShowQR(order.id)}
            >
              <Text style={styles.qrButtonText}>📱 Afficher le QR code</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Text style={styles.sectionTitle}>Historique</Text>
      {MOCK_ORDERS.filter(o => o.status === 'RETIRE').map((order) => (
        <View key={order.id} style={[styles.orderCard, styles.completedCard]}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>{order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#f5f5f5' }]}>
              <Text style={[styles.statusText, { color: '#999' }]}>
                {STATUS_LABELS[order.status].label}
              </Text>
            </View>
          </View>
          
          {order.items.map((item, idx) => (
            <View key={idx} style={styles.orderItem}>
              <Text style={[styles.itemName, { color: '#999' }]}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={[styles.itemPrice, { color: '#999' }]}>
                {(item.price * item.quantity).toFixed(2)} €
              </Text>
            </View>
          ))}
        </View>
      ))}

      {selectedQR && (
        <View style={styles.qrModal}>
          <TouchableOpacity 
            style={styles.qrOverlay}
            onPress={() => setSelectedQR(null)}
          />
          <View style={styles.qrContent}>
            <Text style={styles.qrTitle}>Code de retrait</Text>
            <Image source={{ uri: selectedQR }} style={styles.qrImage} />
            <Text style={styles.qrInstructions}>
              Présentez ce code à la machine BoxEat
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedQR(null)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subscriptionLink: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '600',
  },
  loyaltyCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.green + '15',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.green + '30',
  },
  loyaltyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.green,
    marginBottom: spacing.xs,
  },
  loyaltyText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.white,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.green,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  orderCard: {
    margin: spacing.lg,
    marginTop: 0,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  completedCard: {
    opacity: 0.7,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  itemName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.green,
  },
  qrButton: {
    marginTop: spacing.md,
    backgroundColor: colors.green,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  qrButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  qrModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  qrContent: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    maxWidth: 320,
    width: '90%',
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  qrImage: {
    width: 240,
    height: 240,
    marginBottom: spacing.lg,
  },
  qrInstructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  closeButton: {
    backgroundColor: colors.gray,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
