import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { BotMessage, BotAction, Order } from '@edmi/shared';
import { getMockBotResponse, mockOrders } from '@edmi/shared';
import { useCartStore } from '@/stores/cart';
import { useOrderHistoryStore } from '@/stores/orderHistory';
import { ChatBubble } from './ChatBubble';
import { QuickActions } from './QuickActions';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CHAT_HEIGHT = SCREEN_HEIGHT * 0.85;

interface EDMikChatProps {
  visible: boolean;
  onClose: () => void;
}

let messageCounter = 0;
function generateId(): string {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

export const EDMikChat: React.FC<EDMikChatProps> = ({ visible, onClose }) => {
  const { t } = useTranslation('bot');
  const router = useRouter();

  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = useRef(new Animated.Value(CHAT_HEIGHT)).current;
  const flatListRef = useRef<FlatList<BotMessage>>(null);
  const hasGreeted = useRef(false);

  // Keyboard listener
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvent, (e) => setKeyboardHeight(e.endCoordinates.height));
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  // Slide animation
  useEffect(() => {
    if (visible) {
      // Add greeting on first open
      if (!hasGreeted.current) {
        hasGreeted.current = true;
        setMessages([
          {
            id: generateId(),
            role: 'bot',
            text: t('edmik.greeting'),
            timestamp: new Date().toISOString(),
          },
        ]);
      }
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: CHAT_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, t]);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const addBotMessage = useCallback((text: string, actions?: BotMessage['actions'], products?: BotMessage['products']) => {
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'bot',
        text,
        actions,
        products,
        timestamp: new Date().toISOString(),
      },
    ]);
    scrollToEnd();
  }, [scrollToEnd]);

  const handleSend = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'user',
        text: trimmed,
        timestamp: new Date().toISOString(),
      },
    ]);
    setInputText('');
    setIsThinking(true);
    scrollToEnd();

    // Simulate bot thinking delay
    const delay = 600 + Math.random() * 400;
    setTimeout(() => {
      const response = getMockBotResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'bot',
          text: response.text,
          actions: response.actions,
          products: response.products,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsThinking(false);
      scrollToEnd();
    }, delay);
  }, [scrollToEnd]);

  const handleAction = useCallback((action: BotAction) => {
    switch (action.type) {
      case 'reorder': {
        const storeOrders = useOrderHistoryStore.getState().orders;
        const order = action.orderId
          ? (storeOrders.find((o: Order) => o.id === action.orderId) ?? mockOrders.find((o) => o.id === action.orderId))
          : storeOrders[0] ?? mockOrders[0];

        if (order) {
          const addItem = useCartStore.getState().addItem;
          order.items.forEach((item: { productId: number; name: string; image: string; price: number; quantity: number; total: number }) => {
            addItem({
              id: item.productId,
              name: item.name,
              slug: '',
              price: item.price,
              regularPrice: item.price,
              salePrice: null,
              onSale: false,
              currency: 'EUR',
              stockQuantity: 1,
              stockStatus: 'in_stock',
              condition: 'new',
              images: item.image ? [{ id: 0, src: item.image, alt: '' }] : [],
              categories: [],
              attributes: [],
              description: '',
              shortDescription: '',
              sku: '',
              brand: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          });
          addBotMessage(t('responses.reorderAdded'));
        }
        break;
      }

      case 'navigate': {
        onClose();
        setTimeout(() => {
          if (action.screen?.startsWith('tel:')) {
            Linking.openURL(action.screen);
          } else if (action.screen === 'catalog') {
            router.push('/catalog' as any);
          } else if (action.screen?.startsWith('order/')) {
            router.push(`/${action.screen}` as any);
          } else {
            router.push('/(tabs)' as any);
          }
        }, 350);
        break;
      }

      case 'contact_manager': {
        Linking.openURL('tel:+380441234567');
        break;
      }

      case 'show_product': {
        onClose();
        setTimeout(() => {
          router.push(`/product/${action.productId}` as any);
        }, 350);
        break;
      }

      case 'add_to_cart': {
        if (action.productId) {
          addBotMessage(t('responses.reorderAdded'));
        }
        break;
      }
    }
  }, [onClose, router, addBotMessage, t]);

  const handleProductPress = useCallback((productId: number) => {
    onClose();
    setTimeout(() => {
      router.push(`/product/${productId}` as any);
    }, 350);
  }, [onClose, router]);

  const handleMicPress = useCallback(() => {
    Alert.alert(t('edmik.name'), t('edmik.voiceSoon'));
  }, [t]);

  const renderMessage = useCallback(({ item }: { item: BotMessage }) => (
    <ChatBubble
      message={item}
      onActionPress={handleAction}
      onProductPress={handleProductPress}
    />
  ), [handleAction, handleProductPress]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Chat Container */}
        <Animated.View
          style={[
            styles.chatContainer,
            { bottom: keyboardHeight, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <View style={styles.headerAvatar}>
                  <Ionicons name="chatbubble-ellipses" size={16} color={colors.white} />
                </View>
                <Text style={styles.headerTitle}>{t('edmik.name')}</Text>
              </View>
              <Pressable onPress={onClose} hitSlop={12}>
                <Ionicons name="close" size={24} color={colors.textSecondaryLight} />
              </Pressable>
            </View>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => scrollToEnd()}
          />

          {/* Thinking indicator */}
          {isThinking && (
            <View style={styles.thinkingRow}>
              <View style={styles.thinkingAvatar}>
                <Ionicons name="chatbubble-ellipses" size={12} color={colors.white} />
              </View>
              <View style={styles.thinkingBubble}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.thinkingText}>{t('edmik.thinking')}</Text>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <QuickActions onActionPress={handleSend} />

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <Pressable onPress={handleMicPress} style={styles.micButton}>
              <Ionicons name="mic-outline" size={22} color={colors.textSecondaryLight} />
            </Pressable>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder={t('edmik.placeholder')}
              placeholderTextColor={colors.textSecondaryLight}
              returnKeyType="send"
              onSubmitEditing={() => handleSend(inputText)}
              editable={!isThinking}
            />
            <Pressable
              onPress={() => handleSend(inputText)}
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              disabled={!inputText.trim() || isThinking}
            >
              <Ionicons
                name="send"
                size={18}
                color={inputText.trim() ? colors.white : colors.textSecondaryLight}
              />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  chatContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT - CHAT_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bgLight,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderLight,
    marginBottom: spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.textPrimaryLight,
  },
  messageList: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  thinkingAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.bgLightAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  thinkingText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  inputBar: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.sm,
  },
  micButton: {
    opacity: 0.4,
    padding: spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    backgroundColor: colors.bgLightAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.bgLightAlt,
  },
});
