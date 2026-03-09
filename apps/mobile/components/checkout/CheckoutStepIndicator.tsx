import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

interface CheckoutStepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const CheckoutStepIndicator: React.FC<CheckoutStepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <View style={styles.container}>
      {steps.map((label, index) => (
        <View key={label} style={styles.stepWrapper}>
          <View style={styles.dotRow}>
            {index > 0 && (
              <View
                style={[
                  styles.line,
                  index <= currentStep && styles.lineActive,
                ]}
              />
            )}
            <View
              style={[
                styles.dot,
                index <= currentStep && styles.dotActive,
                index === currentStep && styles.dotCurrent,
              ]}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  index < currentStep && styles.lineActive,
                ]}
              />
            )}
          </View>
          <Text
            style={[
              styles.label,
              index <= currentStep && styles.labelActive,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.borderLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotCurrent: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.borderLight,
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    marginTop: spacing.xs,
  },
  labelActive: {
    color: colors.primary,
    fontFamily: fonts.bodySemiBold,
  },
});
