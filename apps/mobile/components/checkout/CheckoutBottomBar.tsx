import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/constants/theme';

interface CheckoutBottomBarProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
  nextLabel: string;
  backLabel: string;
}

export const CheckoutBottomBar: React.FC<CheckoutBottomBarProps> = ({
  step,
  onNext,
  onBack,
  loading = false,
  nextLabel,
  backLabel,
}) => {
  return (
    <View style={styles.container}>
      {step > 0 && (
        <View style={styles.backWrapper}>
          <Button
            title={backLabel}
            variant="outline"
            onPress={onBack}
            fullWidth
          />
        </View>
      )}
      <View style={step > 0 ? styles.nextWrapper : styles.fullWrapper}>
        <Button
          title={nextLabel}
          variant="gradient"
          onPress={onNext}
          fullWidth
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.bgLight,
    gap: spacing.sm,
  },
  backWrapper: {
    flex: 1,
  },
  nextWrapper: {
    flex: 2,
  },
  fullWrapper: {
    flex: 1,
  },
});
