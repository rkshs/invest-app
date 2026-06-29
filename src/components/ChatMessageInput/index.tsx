import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';

type ChatMessageInputProps = {
  bottomInset?: number;
  disabled?: boolean;
  onSendPress?: (message: string) => void;
};

const SEND_BUTTON_SIZE = 36;

export function ChatMessageInput({
  bottomInset = 0,
  disabled = false,
  onSendPress,
}: ChatMessageInputProps) {
  const [draft, setDraft] = useState('');
  const canSend = draft.trim().length > 0 && !disabled;

  const handleSendPress = () => {
    if (!canSend) {
      return;
    }

    onSendPress?.(draft.trim());
    setDraft('');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(bottomInset, spacing.md) },
      ]}
    >
      <View style={styles.field}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Сообщение..."
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, Platform.OS === 'web' && webInputStyle]}
          editable={!disabled}
          multiline
          maxLength={1000}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Отправить"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={handleSendPress}
          style={({ pressed }) => [
            styles.sendButton,
            !canSend && styles.sendButtonDisabled,
            pressed && canSend && styles.pressed,
          ]}
        >
          <Ionicons name="arrow-up" size={20} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    backgroundColor: colors.background,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    minHeight: 48,
    maxHeight: 128,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 6,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  input: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: 24,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    paddingVertical: 0,
    borderWidth: 0,
  },
  sendButton: {
    width: SEND_BUTTON_SIZE,
    height: SEND_BUTTON_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sendButtonDisabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.85,
  },
});

const webInputStyle = {
  outlineStyle: 'none',
  outlineWidth: 0,
  minWidth: 0,
} as unknown as TextStyle;
