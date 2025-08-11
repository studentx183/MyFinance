import CreateTransaction from "@/components/CreateTransaction";
import TransactionHistory from "@/components/TransactionHistory";
import TabItems from "@/components/ui/TabItems";
import toastConfig from "@/configs/toast-config";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { COLORS } from "./styles/colors";

export default function Index() {
  const [selectedTab, setSelectedTab] = useState(2);

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

      <View style={styles.inputWrapper}>
        <CreateTransaction typeId={selectedTab} />
      </View>

      {/* TabWrapper as BlurView - rendered AFTER FlatList */}
      <BlurView intensity={20} tint="light" style={styles.tabWrapperBlur}>
        <TabItems
          items={tabItems}
          onTabChange={setSelectedTab}
          initialSelectedId={selectedTab}
        />
      </BlurView>

      <Toast
        config={toastConfig}
        position="top"
        topOffset={100}
        visibilityTime={3000}
      />
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
    elevation: 15,
    borderRadius: 10,
    overflow: "hidden", // Important for blur borders
    zIndex: 10, // Ensure it's on top
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
