import { useTransactions } from "@/contexts/TransactionContext";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import MainButton from "./ui/MainButton";
import Modal from "./ui/Modal";

interface DeleteTransactionProps {
  visible: boolean;
  itemId: string;
  onClose: () => void;
}

const DeleteTransaction: React.FC<DeleteTransactionProps> = ({
  visible,
  itemId,
  onClose,
}) => {
  const { deleteTransaction, isLoading } = useTransactions();

  const handleDelete = async () => {
    const res = await deleteTransaction(itemId);
    if (res.success) {
      onClose();
      Toast.show({
        type: "success",
        text1: "Transaction deleted!",
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal visible={visible} onClose={handleClose} title="Delete Expense">
      <Animated.View entering={FadeInUp}>
        <Text>Are you sure you want to delete this transaction?</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp} style={styles.buttonsContainer}>
        <MainButton
          title="Delete"
          onPress={handleDelete}
          loading={isLoading}
          style={styles.actionButton}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
  },
});

export default DeleteTransaction;
