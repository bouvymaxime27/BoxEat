
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../theme';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max = 10,
}: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, value <= min && styles.disabled]}
        onPress={onDecrement}
        disabled={value <= min}
      >
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity
        style={[styles.button, value >= max && styles.disabled]}
        onPress={onIncrement}
        disabled={value >= max}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    backgroundColor: colors.gray,
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    minWidth: 40,
    textAlign: 'center',
  },
});
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({ 
  value, 
  onIncrement, 
  onDecrement,
  min = 1,
  max = 99 
}: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrement}
        disabled={value <= min}
        style={[styles.button, value <= min && styles.buttonDisabled]}
      >
        <Text style={[styles.buttonText, value <= min && styles.buttonTextDisabled]}>−</Text>
      </TouchableOpacity>
      
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
      
      <TouchableOpacity
        onPress={onIncrement}
        disabled={value >= max}
        style={[styles.button, value >= max && styles.buttonDisabled]}
      >
        <Text style={[styles.buttonText, value >= max && styles.buttonTextDisabled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.gray,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  buttonTextDisabled: {
    color: '#999',
  },
  valueContainer: {
    minWidth: 40,
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
});
