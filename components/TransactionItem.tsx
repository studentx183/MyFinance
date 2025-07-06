import { TransactionModel } from "@/types/transaction-model";
import { formatAmount } from "@/utils/formatAmount";
import { StyleSheet, Text, View } from "react-native";

const HistoryItem: React.FC<{ item: TransactionModel }> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.itemText}>
        {formatAmount(item.amount, item.typeId)}
        {item.for && ":"} {item.for}
      </Text>
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
