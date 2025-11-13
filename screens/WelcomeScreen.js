
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#3FAE49', '#2E8B3D', '#1B5E28']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo-boxeat.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>BoxEat</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Votre cantine digitale</Text>
          <Text style={styles.subtitle}>
            Commandez, payez et récupérez vos repas frais en 15 secondes
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('SignIn')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Des repas frais • Préparés par des chefs • Livrés quotidiennement
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  brandName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  footer: {
    ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
