import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { isARSupportedOnDevice } from '@reactvision/react-viro';

import { ARViewerScreen, ARUnsupported } from '@/components/ar';
import { colors } from '@/constants/theme';

type ARCheckState = 'checking' | 'supported' | 'unsupported';

export default function ARViewerLazy() {
  const router = useRouter();
  const [arSupport, setArSupport] = useState<ARCheckState>('checking');

  useEffect(() => {
    isARSupportedOnDevice()
      .then((result) => {
        setArSupport(result.isARSupported ? 'supported' : 'unsupported');
      })
      .catch(() => {
        setArSupport('unsupported');
      });
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (arSupport === 'checking') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (arSupport === 'unsupported') {
    return <ARUnsupported onClose={handleClose} />;
  }

  return <ARViewerScreen onClose={handleClose} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
});
