import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ConfigurableProduct, ConfiguratorGroupId } from '@edmi/shared';
import { OptionGroup } from './OptionGroup';
import { spacing } from '@/constants/theme';

interface ConfigPanelProps {
  product: ConfigurableProduct;
  selections: Record<ConfiguratorGroupId, string | null>;
  onSelectOption: (groupId: ConfiguratorGroupId, optionId: string) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ product, selections, onSelectOption }) => {
  return (
    <View style={styles.container}>
      {product.optionGroups.map((group) => (
        <OptionGroup
          key={group.id}
          group={group}
          selectedOptionId={selections[group.id]}
          onSelect={(optionId) => onSelectOption(group.id, optionId)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
});
