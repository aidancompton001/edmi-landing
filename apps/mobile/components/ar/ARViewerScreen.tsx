import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import MicroscopeARScene, { type ARPlacementState } from './MicroscopeARScene';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface ARViewerScreenProps {
  onClose: () => void;
}

export default function ARViewerScreen({ onClose }: ARViewerScreenProps) {
  const { t } = useTranslation('configurator');
  const [arState, setARState] = useState<ARPlacementState>('scanning');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  const handleStateChange = useCallback((state: ARPlacementState) => {
    setARState(state);
  }, []);

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true);
  }, []);

  const handleReset = useCallback(() => {
    setARState('scanning');
    setModelLoaded(false);
    setSceneKey((prev) => prev + 1);
  }, []);

  const getStatusText = () => {
    switch (arState) {
      case 'scanning':
        return t('configurator.ar.scanHint');
      case 'readyToPlace':
        return t('configurator.ar.tapToPlace');
      case 'placed':
        return t('configurator.ar.interactionHint');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <ViroARSceneNavigator
        key={sceneKey}
        initialScene={{
          scene: () => (
            <MicroscopeARScene
              onStateChange={handleStateChange}
              onModelLoaded={handleModelLoaded}
            />
          ),
        }}
        style={styles.arView}
      />

      {/* Loading overlay */}
      {arState !== 'scanning' && !modelLoaded && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{t('configurator.ar.loading')}</Text>
        </View>
      )}

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{t('configurator.ar.title')}</Text>
        <View style={styles.closeButton} />
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        {arState === 'scanning' && (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color={colors.white} />
            <Text style={styles.statusText}>{t('configurator.ar.scanning')}</Text>
          </View>
        )}

        <Text style={styles.hintText}>{getStatusText()}</Text>

        {arState === 'placed' && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleReset} activeOpacity={0.7}>
              <Ionicons name="refresh" size={20} color={colors.white} />
              <Text style={styles.actionText}>{t('configurator.ar.reset')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const TOP_INSET = Platform.OS === 'ios' ? 50 : 30;
const BOTTOM_INSET = Platform.OS === 'ios' ? 34 : 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  arView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.body,
    color: colors.white,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: TOP_INSET,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.white,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: BOTTOM_INSET + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
    color: colors.white,
  },
  hintText: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.bodySmall,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  actionText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.white,
  },
});
