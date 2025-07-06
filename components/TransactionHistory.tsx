import TransactionItem from "@/components/TransactionItem";
import { fetchHistory } from "@/services/transaction";
import { Result } from "@/types/api";
import { TransactionModel } from "@/types/transaction-model";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const AnimatedTransactionItem: React.FC<{
  item: TransactionModel;
  index: number;
}> = ({ item, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
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
  const [data, setData] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const filteredData = data.filter((item) => item.typeId === typeId);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      const result: Result<TransactionModel[]> = await fetchHistory();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  if (error) {
    // You can render an error component here
    console.log("Error loading transactions:", error);
  }

  return (
    <View>
      {filteredData.map((item, index) => (
        <AnimatedTransactionItem key={item.id} item={item} index={index} />
      ))}
    </View>
  );
};

export default History;
