
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

const FAQ_ITEMS = [
  {
    question: 'Comment commander un repas ?',
    answer: 'Parcourez le menu de la semaine, ajoutez vos plats au panier et finalisez votre commande.',
  },
  {
    question: 'Combien de temps puis-je conserver mes repas ?',
    answer: 'Les repas se conservent entre 2 et 4 jours au réfrigérateur selon le plat.',
  },
  {
    question: 'Comment récupérer ma commande ?',
    answer: 'Scannez le QR code à la machine BoxEat pour récupérer votre commande en 15 secondes.',
  },
];

export default function FaqScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      
      {FAQ_ITEMS.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity
            onPress={() => setExpanded(expanded === index ? null : index)}
            style={styles.questionContainer}
          >
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.icon}>{expanded === index ? '−' : '+'}</Text>
          </TouchableOpacity>
          
          {expanded === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  faqItem: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: colors.green,
    fontWeight: '700',
  },
  answer: {
    padding: spacing.md,
    paddingTop: 0,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
