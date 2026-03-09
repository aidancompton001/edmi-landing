import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { configurableProducts } from '@edmi/shared';
import type { ConfiguratorGroupId } from '@edmi/shared';
import { ScreenWrapper } from '@/components/ui';
import { ProductSelector, MicroscopePreview, ConfigPanel, PriceSummary } from '@/components/configurator';
import { useConfiguratorStore } from '@/stores/configurator';
import { useCartStore } from '@/stores/cart';
import { useEdmikStore } from '@/stores/edmik';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

const BOTTOM_BAR_HEIGHT = 130;

export default function ConfiguratorScreen() {
  const router = useRouter();
  const { t } = useTranslation(['common', 'configurator']);
  const selectedProductId = useConfiguratorStore((s) => s.selectedProductId);
  const selections = useConfiguratorStore((s) => s.selections);
  const selectProduct = useConfiguratorStore((s) => s.selectProduct);
  const selectOption = useConfiguratorStore((s) => s.selectOption);
  const getSelectedProduct = useConfiguratorStore((s) => s.getSelectedProduct);
  const getTotalPrice = useConfiguratorStore((s) => s.getTotalPrice);
  const getSelectionComplete = useConfiguratorStore((s) => s.getSelectionComplete);
  const addItem = useCartStore((s) => s.addItem);
  const openEdmik = useEdmikStore((s) => s.open);

  const product = getSelectedProduct();
  const totalPrice = getTotalPrice();
  const isComplete = getSelectionComplete();

  const handleSelectOption = (groupId: ConfiguratorGroupId, optionId: string) => {
    selectOption(groupId, optionId);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Build option summary for product name
    const optionParts: string[] = [];
    for (const group of product.optionGroups) {
      const selectedId = selections[group.id];
      if (selectedId) {
        const option = group.options.find((o) => o.id === selectedId);
        if (option) {
          optionParts.push(t(`configurator:${option.labelKey.replace('configurator:', '')}`));
        }
      }
    }
    const configName = `${product.name} (${optionParts.join(', ')})`;

    addItem({
      id: product.productId + 10000, // offset to avoid collision with catalog products
      name: configName,
      slug: `config-${product.productId}`,
      price: totalPrice,
      regularPrice: totalPrice,
      salePrice: null,
      onSale: false,
      currency: 'EUR',
      stockQuantity: 1,
      stockStatus: 'in_stock',
      condition: 'new',
      images: product.images[0]
        ? [{ id: 0, src: product.images[0].src, alt: product.images[0].alt }]
        : [],
      categories: [],
      attributes: [],
      description: '',
      shortDescription: '',
      sku: `CFG-${product.productId}`,
      brand: product.brand,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    Alert.alert('', t('configurator:configurator.configAdded'));
  };

  const handleAskEdmik = () => {
    openEdmik();
  };

  const handleViewInRoom = () => {
    router.push('/ar-viewer');
  };

  return (
    <View style={styles.wrapper}>
      <ScreenWrapper scrollable style={{ paddingBottom: BOTTOM_BAR_HEIGHT }}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('configurator:configurator.title')}</Text>
          <Text style={styles.subtitle}>{t('configurator:configurator.subtitle')}</Text>
        </View>

        <View style={styles.content}>
          <ProductSelector
            products={configurableProducts}
            selectedId={selectedProductId}
            onSelect={selectProduct}
          />

          {product && (
            <>
              <MicroscopePreview images={product.images} />
              <ConfigPanel
                product={product}
                selections={selections}
                onSelectOption={handleSelectOption}
              />
            </>
          )}
        </View>
      </ScreenWrapper>

      <View style={styles.bottomBar}>
        <PriceSummary
          totalPrice={totalPrice}
          isComplete={isComplete}
          onAddToCart={handleAddToCart}
          onAskEdmik={handleAskEdmik}
          onViewInRoom={handleViewInRoom}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.md,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
