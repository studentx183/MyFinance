// components/
import { COLORS } from "@/app/styles/colors";
import { mainStyles } from "@/app/styles/global";
import ArrowIcon from "@/components/icons/Arrow";
import IconBtn from "@/components/ui/IconBtn";
import NumInput from "@/components/ui/NumInput";
import { useTransactions } from "@/contexts/TransactionContext";
import { TransactionModel } from "@/types/transaction-model";
import { formatAmount } from "@/utils/formatAmount";
import { uuidv4 } from "@/utils/uuidV4";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";

const CreateTransaction: React.FC<{ typeId: number }> = ({ typeId }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [forWhat, setForWhat] = useState<string>("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [id, setNewId] = useState(uuidv4());

  const { createTransaction, isLoading } = useTransactions();

  const handleAmountSubmit = (value: number) => {
    setAmount(value);
    setShowTextInput(true);
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0) return;

    const transaction: TransactionModel = {
      id,
      typeId,
      amount,
      for: forWhat,
      createdAt: new Date(),
    };

    const res = await createTransaction(transaction);

    if (res.success) {
      // Reset form
      setAmount(null);
      setForWhat("");
      setShowTextInput(false);
      setNewId(uuidv4());
      Toast.show({
        type: "success",
        text1: "Transaction added!",
      });
    }
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInUp}
      exiting={FadeOutDown}
    >
      {/* Amount preview */}
      {showTextInput && (
        <Animated.View
          entering={SlideInLeft.duration(300)}
          style={styles.amountPreview}
        >
          <Text style={styles.amountText}>
            {formatAmount(amount || 0, typeId)} {forWhat && ": " + forWhat}
          </Text>
        </Animated.View>
      )}

      {/* Input row container */}
      <View style={styles.inputRow}>
        {!showTextInput && (
          <Animated.View
            style={styles.inputContainer}
            exiting={SlideOutLeft.duration(300)}
            entering={SlideInLeft.duration(300)}
          >
            <NumInput
              value={amount}
              onValueChange={setAmount}
              onSubmit={handleAmountSubmit}
              placeholder="How much?"
            />
          </Animated.View>
        )}

        {showTextInput && (
          <Animated.View
            entering={SlideInRight.duration(300)}
            exiting={SlideOutRight.duration(300)}
            style={styles.inputContainer}
          >
            <TextInput
              style={[mainStyles.input, styles.textInput]}
              placeholder="Optional: For what?"
              onChangeText={setForWhat}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              editable={!isLoading}
              value={forWhat}
            />
            <View style={styles.submitBtn}>
              <IconBtn
                size={38}
                icon={ArrowIcon}
                iconColor={COLORS.white}
                loading={isLoading}
                onPress={handleSubmit}
              />
            </View>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  amountPreview: {
    marginBottom: 15,
    position: "absolute",
    top: -40,
    left: 0,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    textShadowColor: COLORS.textShadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  textInput: {
    flex: 1,
    marginBottom: 0,
  },
  submitBtn: {
    width: "10%",
  },
});

export default CreateTransaction;
