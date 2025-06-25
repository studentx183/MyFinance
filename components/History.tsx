import { HistoryItemModel } from "@/types/history-item-model";
import { useState } from "react";
import { View } from "react-native";
import AnimatedView from "./AnimatedView";
import HistoryItem from "./HistoryItem";

// TO-DO : Replace with real data fetching logic

const History: React.FC<{ typeId: number }> = ({ typeId }) => {
  const [data, setData] = useState<HistoryItemModel[]>([
    {
      id: 1,
      typeId: 2,
      amount: 1000,
      createdAt: new Date(),
      for: "Water Bill",
    },
    {
      id: 2,
      typeId: 1,
      amount: 5000,
      createdAt: new Date(),
      for: "Salary",
    },
    {
      id: 3,
      typeId: 2,
      amount: 2000,
      createdAt: new Date(),
      for: "Electricity Bill",
    },
    {
      id: 4,
      typeId: 1,
      amount: 3000,
      createdAt: new Date(),
      for: "Freelance Work",
    },
  ]);

  return (
    <View>
      {data
        .filter((item) => item.typeId === typeId)
        .map((item, index) => (
          <AnimatedView key={item.id} index={index}>
            <HistoryItem item={item} />
          </AnimatedView>
        ))}
    </View>
  );
};

export default History;
