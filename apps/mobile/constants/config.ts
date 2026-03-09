import Constants from 'expo-constants';

function getApiUrl(): string {
  // In dev: extract IP from Expo Go debugger host (e.g. "192.168.1.5:8081" → "http://192.168.1.5:3000")
  const debuggerHost = Constants.expoGoConfig?.debuggerHost;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:3000`;
  }
  return process.env['EXPO_PUBLIC_API_URL'] || 'http://localhost:3000';
}

export const APP_CONFIG = {
  API_URL: getApiUrl(),
  APP_ENV: process.env['EXPO_PUBLIC_APP_ENV'] || 'development',
} as const;
