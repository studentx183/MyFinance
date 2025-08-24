import { COLORS } from "@/app/styles/colors";
import { BORDER_RADIUS } from "@/app/styles/tokens";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.container, styles.errorContainer]}>
      {text1 && <Text style={styles.text1Error}>{text1}</Text>}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.container, styles.successContainer]}>
      {text1 && <Text style={styles.text1Success}>{text1}</Text>}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
  delete: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.container, styles.errorContainer]}>
      {text1 && <Text style={styles.text1Error}>{text1}</Text>}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: 52,
    padding: 12,
    borderRadius: BORDER_RADIUS.xs,
  },
  errorContainer: {
    borderColor: COLORS.dangerBorder,
    backgroundColor: COLORS.dangerLight,
  },
  successContainer: {
    borderColor: COLORS.successBorder,
    backgroundColor: COLORS.successLight,
  },
  text1Error: {
    color: COLORS.dangerBorder,
    fontSize: 12,
    fontWeight: "600",
  },
  text1Success: {
    color: COLORS.successText,
    fontSize: 12,
    fontWeight: "600",
  },
  text2: {
    color: COLORS.white,
  },
});
