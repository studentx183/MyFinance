import CreateTransaction from "@/components/CreateTransaction";
import TransactionHistory from "@/components/TransactionHistory";
import TabItems from "@/components/ui/TabItems";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "./styles/colors";
import { BORDER_RADIUS, Z_INDEX } from "./styles/tokens";

export default function Index() {
  const [selectedTab, setSelectedTab] = useState<number>(2);

  const tabItems = [
    { id: 1, name: "Income" },
    { id: 2, name: "Expense" },
  ];

  return (
    <View style={styles.container}>
      {/* Render FlatList first to fix expo-blur known issue */}
      <View style={styles.listContainer}>
        <TransactionHistory typeId={selectedTab} />
      </View>

      <BlurView
        intensity={20}
        tint="light"
        style={styles.inputWrapper}
      >
        <CreateTransaction typeId={selectedTab} />
      </BlurView>

      {/* TabWrapper as BlurView - rendered AFTER FlatList */}
      <BlurView intensity={20} tint="light" style={styles.tabWrapperBlur}>
        <TabItems
          items={tabItems}
          onTabChange={setSelectedTab}
          initialSelectedId={selectedTab}
        />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  tabWrapperBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 50, // TO-DO: Make responsive, now only for iPhone 10+ Pro
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 19 },
    shadowOpacity: 0.3,
    shadowRadius: 38,
    elevation: Z_INDEX.modal,
    borderRadius: BORDER_RADIUS.sm,
    overflow: "hidden", // Important for blur borders
    zIndex: Z_INDEX.overlay, // Ensure it's on top
  },
  listContainer: {
    flex: 1,
    paddingTop: 90, // Add top padding to account for absolute positioned blur
  },
  inputWrapper: {
    paddingHorizontal: 20,
    justifyContent: "flex-end",
  },
});
