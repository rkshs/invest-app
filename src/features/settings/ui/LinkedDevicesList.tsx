import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { mockLinkedDevices } from '../data/mockLinkedDevices';
import { LinkedDevice } from '../types';
import { colors, radius, spacing, typography } from '../../../shared/theme';

export function LinkedDevicesList() {
  const [devices, setDevices] = useState<LinkedDevice[]>(mockLinkedDevices);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUnlink = (device: LinkedDevice) => {
    if (device.isCurrent) {
      return;
    }

    setDevices((current) => current.filter((item) => item.id !== device.id));
    setFeedback(`${device.name} отвязано`);
  };

  if (devices.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Нет привязанных устройств</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {devices.map((device, index) => (
        <View
          key={device.id}
          style={[styles.item, index === devices.length - 1 && styles.itemLast]}
        >
          <View style={styles.deviceIconWrap}>
            <Ionicons name="phone-portrait-outline" size={18} color={colors.blue} />
          </View>

          <View style={styles.deviceContent}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceMeta}>{device.lastActiveLabel}</Text>

            {device.isCurrent ? (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Это устройство</Text>
              </View>
            ) : null}
          </View>

          {!device.isCurrent ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Отвязать ${device.name}`}
              onPress={() => handleUnlink(device)}
              style={({ pressed }) => [
                styles.unlinkButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.unlinkButtonText}>Отвязать</Text>
            </Pressable>
          ) : null}
        </View>
      ))}

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  itemLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  deviceIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs / 2,
  },
  deviceContent: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs / 2,
  },
  deviceName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
  },
  deviceMeta: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  currentBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs / 2,
    borderRadius: radius.full,
    backgroundColor: colors.blueLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  currentBadgeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    color: colors.blue,
  },
  unlinkButton: {
    alignSelf: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  unlinkButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.red,
  },
  feedback: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.green,
  },
  emptyState: {
    paddingVertical: spacing.sm,
  },
  emptyStateText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  pressed: {
    opacity: 0.85,
  },
});
