import { COLORS } from "@/app/styles/colors";
import { BORDER_RADIUS } from "@/app/styles/tokens";
import TransactionItem from "@/components/TransactionItem";
import { useTransactions } from "@/contexts/TransactionContext";
import { TransactionModel } from "@/types/transaction-model";
import { useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AnimatedTransactionItem: React.FC<{
  item: TransactionModel;
  index: number;
  isLast: boolean;
}> = ({ item, index, isLast }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    ...(isLast
      ? {}
      : {
          borderBottomColor: COLORS.border,
          borderBottomWidth: 1,
        }),
  }));

  useEffect(() => {
    const delay = index * 50;
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 300 }));
  }, [index]);

  return (
    <Animated.View style={animatedStyle}>
      <TransactionItem item={item} />
    </Animated.View>
  );
};

const History: React.FC<{ typeId: number }> = ({ typeId }) => {
  const { getTransactionsByType, error } = useTransactions();
  const filteredData = getTransactionsByType(typeId);
  const FlatListRef = useRef<FlatList<TransactionModel>>(null);

  useEffect(() => {
    if (FlatListRef.current) {
      setTimeout(
        () => FlatListRef.current!.scrollToEnd({ animated: true }),
        100
      );
    }
  }, [filteredData]);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.content}>
        <FlatList
          ref={FlatListRef}
          data={filteredData}
          renderItem={({ item, index }) => (
            <AnimatedTransactionItem
              item={item}
              index={index}
              isLast={index === filteredData.length - 1}
            />
          )}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    borderStyle: "solid",
    shadowColor: COLORS.black,
    borderRadius: BORDER_RADIUS.xs,
  },
});
