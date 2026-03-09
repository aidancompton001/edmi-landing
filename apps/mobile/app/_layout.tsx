import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import i18n from '@/lib/i18n';
import { queryClient } from '@/lib/queryClient';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Unbounded': require('@expo-google-fonts/unbounded/Unbounded_400Regular.ttf'),
    'Unbounded-Medium': require('@expo-google-fonts/unbounded/Unbounded_500Medium.ttf'),
    'Unbounded-SemiBold': require('@expo-google-fonts/unbounded/Unbounded_600SemiBold.ttf'),
    'Unbounded-Bold': require('@expo-google-fonts/unbounded/Unbounded_700Bold.ttf'),
    'Inter': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen
              name="ar-viewer"
              options={{
                presentation: 'fullScreenModal',
                animation: 'fade',
              }}
            />
          </Stack>
          <StatusBar style="dark" />
        </QueryClientProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
