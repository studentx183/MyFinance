import { COLORS } from "@/app/styles/colors";
import { BORDER_RADIUS, Z_INDEX } from "@/app/styles/tokens";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal as RNModal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  animationType?: "none" | "slide" | "fade";
}

const Modal: React.FC<ModalProps> = ({ 
  visible, 
  onClose, 
  title, 
  children, 
  animationType = "fade" 
}) => {
  return (
    <RNModal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Android back button
    >
      <BlurView intensity={20} tint="light" style={styles.overlay}>
        <View style={styles.modal}>
          {/* Modal Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
          </View>
          
          {/* Modal Content */}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </BlurView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.overlay,
  },
  modal: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    width: "90%",
    maxWidth: 400,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Z_INDEX.high,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 20,
    color: COLORS.textSecondary,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});

export default Modal;
