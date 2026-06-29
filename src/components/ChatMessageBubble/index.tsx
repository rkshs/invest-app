import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';
import { ChatMessage } from '../../types/chatMessage';

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  return (
    <View
      style={[
        styles.row,
        message.isOwn ? styles.rowOwn : styles.rowIncoming,
      ]}
    >
      <View style={styles.column}>
        {!message.isOwn ? (
          <Text style={styles.sender}>{message.senderName}</Text>
        ) : null}

        <View
          style={[
            styles.bubble,
            message.isOwn ? styles.bubbleOwn : styles.bubbleIncoming,
          ]}
        >
          <Text
            style={[
              styles.text,
              message.isOwn ? styles.textOwn : styles.textIncoming,
            ]}
          >
            {message.text}
          </Text>
        </View>

        <Text
          style={[
            styles.timestamp,
            message.isOwn ? styles.timestampOwn : styles.timestampIncoming,
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    maxWidth: '82%',
  },
  rowIncoming: {
    alignSelf: 'flex-start',
  },
  rowOwn: {
    alignSelf: 'flex-end',
  },
  column: {
    gap: spacing.xs,
  },
  sender: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  bubble: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  bubbleIncoming: {
    backgroundColor: colors.surfaceElevated,
    borderTopLeftRadius: spacing.xs,
  },
  bubbleOwn: {
    backgroundColor: colors.blue,
    borderTopRightRadius: spacing.xs,
  },
  text: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md + 6,
  },
  textIncoming: {
    color: colors.text,
  },
  textOwn: {
    color: colors.white,
  },
  timestamp: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
  },
  timestampIncoming: {
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  timestampOwn: {
    color: colors.textSecondary,
    alignSelf: 'flex-end',
    marginRight: spacing.xs,
  },
});
