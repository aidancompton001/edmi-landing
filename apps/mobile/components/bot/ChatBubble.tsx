import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { BotMessage, BotAction, BotProductCard as BotProductCardData } from '@edmi/shared';
import { BotProductCard } from './BotProductCard';
import { ActionButtons } from './ActionButtons';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface ChatBubbleProps {
  message: BotMessage;
  onActionPress: (action: BotAction) => void;
  onProductPress: (productId: number) => void;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  onActionPress,
  onProductPress,
}) => {
  const isBot = message.role === 'bot';

  if (isBot) {
    return (
      <View style={styles.botRow}>
        <View style={styles.avatar}>
          <Ionicons name="chatbubble-ellipses" size={16} color={colors.white} />
        </View>
        <View style={styles.botBubbleWrapper}>
          <View style={styles.botBubble}>
            <Text style={styles.botText}>{message.text}</Text>
            {message.products && message.products.length > 0 && (
              <View style={styles.productsSection}>
                {message.products.map((product) => (
                  <BotProductCard
                    key={product.id}
                    product={product}
                    onPress={onProductPress}
                  />
                ))}
              </View>
            )}
            {message.actions && message.actions.length > 0 && (
              <ActionButtons actions={message.actions} onActionPress={onActionPress} />
            )}
          </View>
          <Text style={styles.botTimestamp}>{formatTime(message.timestamp)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.userRow}>
      <View style={styles.userBubbleWrapper}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{message.text}</Text>
        </View>
        <Text style={styles.userTimestamp}>{formatTime(message.timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  botBubbleWrapper: {
    maxWidth: '80%',
    flex: 1,
  },
  botBubble: {
    backgroundColor: colors.bgLightAlt,
    borderRadius: radius.md,
    borderTopLeftRadius: 4,
    padding: spacing.md,
  },
  botText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    lineHeight: 22,
  },
  botTimestamp: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.textSecondaryLight,
    marginTop: 4,
    marginLeft: spacing.xs,
  },
  productsSection: {
    marginTop: spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  userBubbleWrapper: {
    maxWidth: '80%',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    borderTopRightRadius: 4,
    padding: spacing.md,
  },
  userText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.white,
    lineHeight: 22,
  },
  userTimestamp: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.textSecondaryLight,
    marginTop: 4,
    marginRight: spacing.xs,
  },
});
