import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { BORDER_RADIUS } from "./tokens";

export const mainStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "solid",
    borderRadius: BORDER_RADIUS.lg,
    padding: 10,
  },
});
