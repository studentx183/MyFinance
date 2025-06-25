import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TabItemsProps {
  items: Array<{
    id: number;
    name: string;
  }>;
  onTabChange?: (selectedId: number) => void;
  initialSelectedId?: number;
}

const TabItems: React.FC<TabItemsProps> = ({
  items,
  onTabChange,
  initialSelectedId = items[0]?.id,
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const handleTabPress = (id: number) => {
    setSelectedId(id);
    onTabChange?.(id);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isSelected = item.id === selectedId;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              isSelected && styles.selectedItem,
              isFirst && styles.firstItem,
              isLast && styles.lastItem,
            ]}
            onPress={() => handleTabPress(item.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.itemText, isSelected && styles.selectedItemText]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    marginHorizontal: 16,
    marginVertical: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 14,
  },
  item: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    marginHorizontal: 1,
  },
  selectedItem: {
    backgroundColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  firstItem: {
    marginLeft: 0,
  },
  lastItem: {
    marginRight: 0,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  selectedItemText: {
    color: "#fff",
    fontWeight: "600",
  },
});
