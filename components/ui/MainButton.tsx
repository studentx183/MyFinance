// MainButton.tsx
import { COLORS } from "@/app/styles";
import { BORDER_RADIUS, Z_INDEX } from "@/app/styles/tokens";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type ButtonGroup = 'primary' | 'secondary';

interface MainButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  group?: ButtonGroup;
  style?: ViewStyle;
}

const MainButton: React.FC<MainButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  group = 'primary',  // default
  style,
}) => {
  const groupStyles = group === 'secondary' ? styles.secondary : styles.primary;
  const groupTextStyles =
    group === 'secondary' ? styles.secondaryText : styles.primaryText;

  return (
    <Pressable
      accessibilityRole="button" // always a button for RN
      style={({ pressed }) => [
        styles.base,
        groupStyles,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={group === 'secondary' ? COLORS.primary : COLORS.textOnPrimary}
        />
      ) : (
        <Text style={[styles.textBase, groupTextStyles]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: Z_INDEX.medium,
    minWidth: 120,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    backgroundColor: COLORS.primaryLight,
  },

  // Group styles
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  // Text styles
  textBase: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: COLORS.textOnPrimary,
  },
  secondaryText: {
    color: COLORS.primary,
  },
});

export default MainButton;
