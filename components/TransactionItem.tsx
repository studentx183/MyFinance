import { COLORS } from "@/app/styles/colors";
import { TransactionModel } from "@/types/transaction-model";
import { formatAmount } from "@/utils/formatAmount";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const HistoryItem: React.FC<{ item: TransactionModel }> = ({ item }) => {
  const swipeableRef = useRef<Swipeable>(null);

  const formatDate = (date: Date | string) => {
    const dateObj = new Date(date);
    const today = new Date();

    if (dateObj.toDateString() === today.toDateString()) {
      return dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return dateObj.toLocaleDateString();
    }
  };

  const getPressedStyle = ({ pressed }: { pressed: boolean }) => {
    // if (!pressed) return { backgroundColor: "white" };
    return {
      backgroundColor: COLORS.background,
    };
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log("Delete item:", item.id);
    // Close swipeable after action
    swipeableRef.current?.close();
  };

  const handleEdit = () => {
    // Add your edit logic here
    console.log("Edit item:", item.id);
    // Close swipeable after action
    swipeableRef.current?.close();
  };

  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <View style={[styles.action, styles.editAction]}>
        <Pressable style={styles.actionBtn} onPress={handleEdit}>
          <Text style={styles.actionTxt}>Edit</Text>
        </Pressable>
      </View>
      <View style={[styles.action, styles.deleteAction]}>
        <Pressable style={styles.actionBtn} onPress={handleDelete}>
          <Text style={styles.actionTxt}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        rightThreshold={40}
        friction={2}
        overshootRight={false}
        enableTrackpadTwoFingerGesture
      >
        <Pressable
          style={({ pressed }) => [
            getPressedStyle({ pressed }),
            styles.container,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemContainer}>
            <Text style={styles.amountText}>
              {formatAmount(item.amount, item.typeId)}
            </Text>
            <Text style={styles.itemText}>{item.for}</Text>
            {/* {item.for && ":"} {item.for} */}
          </View>
          <Text style={styles.dateText}> {formatDate(item.createdAt)} </Text>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  container: {
    padding: 12,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  itemText: {
    fontSize: 14,
    color: COLORS.text,
  },
  dateText: {
    marginTop: 4,
    color: COLORS.secondaryText,
  },
  actionsContainer: {
    flexDirection: "row",
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  deleteAction: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    backgroundColor: COLORS.danger,
  },
  editAction: {
    backgroundColor: COLORS.warning,
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  actionTxt: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
