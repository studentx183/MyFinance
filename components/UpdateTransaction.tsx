import { mainStyles } from "@/app/styles/global";
import { useTransactions } from "@/contexts/TransactionContext";
import { TransactionModel } from "@/types/transaction-model";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import MainButton from "./ui/MainButton";
import Modal from "./ui/Modal";
import NumInput from "./ui/NumInput";

interface UpdateTransactionProps {
  visible: boolean;
  item: TransactionModel;
  onClose: () => void;
}

const UpdateTransaction: React.FC<UpdateTransactionProps> = ({
  visible,
  item,
  onClose,
}) => {
  const { id, amount, for: forWhat, createdAt } = item || {};

  const [newAmount, setNewAmount] = useState<number | null>(amount || null);
  const [newForWhat, setNewForWhat] = useState<string>(forWhat || "");
  const [newCreatedDate, setNewCreatedDate] = useState<Date>(createdAt);

  const { updateTransaction, isLoading } = useTransactions();

  const handleUpdate = async () => {
    const updatedItem: Partial<TransactionModel> = {
      amount: newAmount!,
      for: newForWhat,
      createdAt: newCreatedDate,
    };
    const result = await updateTransaction(id, updatedItem);
    if (result.success) {
      onClose();
      Toast.show({
        type: "success",
        text1: "Transaction updated!",
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal visible={visible} onClose={handleClose} title="Edit Expense">
      <Animated.View entering={FadeInUp}>
        <NumInput value={newAmount} onValueChange={setNewAmount} />
      </Animated.View>

      <Animated.View entering={FadeInUp}>
        <TextInput
          style={mainStyles.input}
          value={newForWhat}
          onChangeText={setNewForWhat}
          placeholder="Enter description"
        />
      </Animated.View>

      <Animated.View entering={FadeInUp} style={styles.buttonsContainer}>
        <MainButton
          title="Update"
          onPress={handleUpdate}
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

export default UpdateTransaction;
