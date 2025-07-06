import CreateTransaction from "@/components/CreateTransaction";
import TabItems from "@/components/TabItems";
import History from "@/components/TransactionHistory";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [selectedTab, setSelectedTab] = useState(2);

  const tabItems = [
    { id: 1, name: "Income" },
    { id: 2, name: "Expense" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TabItems
          items={tabItems}
          onTabChange={setSelectedTab}
          initialSelectedId={selectedTab}
        />

        <History typeId={selectedTab} />

        <CreateTransaction typeId={selectedTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
});
