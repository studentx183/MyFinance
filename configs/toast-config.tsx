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
    borderRadius: 8,
  },
  errorContainer: {
    borderColor: "#D92D20",
    backgroundColor: "#FEF3F2",
  },
  successContainer: {
    borderColor: "#ABEFC6",
    backgroundColor: "#ECFDF3",
  },
  text1Error: {
    color: "#D92D20",
    fontSize: 12,
    fontWeight: "600",
  },
  text1Success: {
    color: "#067647",
    fontSize: 12,
    fontWeight: "600",
  },
  text2: {
    color: "white",
  },
});
