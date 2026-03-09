import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, radius } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PREVIEW_HEIGHT = SCREEN_WIDTH * 0.65;
const IMAGE_WIDTH = SCREEN_WIDTH - spacing.md * 2;

interface MicroscopePreviewProps {
  images: { src: string; alt: string }[];
}

export const MicroscopePreview: React.FC<MicroscopePreviewProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / IMAGE_WIDTH);
    setActiveIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.src }}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        ))}
      </ScrollView>
      {images.length > 1 && (
        <View style={styles.dots}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scroll: {
    width: IMAGE_WIDTH,
    height: PREVIEW_HEIGHT,
    borderRadius: radius.lg,
    backgroundColor: colors.bgLightAlt,
    overflow: 'hidden',
  },
  scrollContent: {
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: PREVIEW_HEIGHT,
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
});
