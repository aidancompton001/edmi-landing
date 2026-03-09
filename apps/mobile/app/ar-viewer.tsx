import { lazy, Suspense } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

const ARViewerLazy = lazy(() => import('@/screens/ar/ARViewerLazy'));

export default function ARViewerRoute() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ARViewerLazy />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
});
