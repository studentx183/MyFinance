import { COLORS } from "@/app/styles/colors";
import { TransactionModel } from "@/types/transaction-model";
import { formatAmount } from "@/utils/formatAmount";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import DeleteTransaction from "./DeleteTransaction";
import UpdateTransaction from "./UpdateTransaction";

const HistoryItem: React.FC<{ item: TransactionModel }> = ({ item }) => {
  const swipeableRef = useRef<Swipeable>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
    setIsDeleteModalOpen(true);
    swipeableRef.current?.close();
  };

  const handleEdit = () => {
    setIsUpdateModalOpen(true);
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
    <>
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

      <UpdateTransaction
        item={item}
        visible={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
      <DeleteTransaction
        itemId={item.id}
        visible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
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
    color: COLORS.text,
    fontWeight: "600",
  },
  itemText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  dateText: {
    marginTop: 4,
    color: COLORS.textTertiary,
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
