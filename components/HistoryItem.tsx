import { HistoryItemModel } from "@/types/history-item-model";
import { StyleSheet, Text, View } from "react-native";
import { Type } from "./constants/type";

const HistoryItem: React.FC<{ item: HistoryItemModel }> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.itemText}>
        {" "}
        {item.typeId === Type.EXPENSE ? "-" : "+"} {item.amount} {item.for}
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
