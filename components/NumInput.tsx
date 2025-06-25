import { useState } from "react";
import { DimensionValue, StyleSheet, TextInput } from "react-native";

interface NumInputProps {
  width?: DimensionValue;
  onValueChange: (value: number | null) => void;
}

const NumInput: React.FC<NumInputProps> = ({ onValueChange, width }) => {
  const [num, setNum] = useState<string>("");

  const handleNumChange = (value: string) => {
    const formattedValue = value.replace(/[^0-9]/g, "");
    const parsedValue = formattedValue ? parseInt(formattedValue, 10) : "";
    setNum(parsedValue.toString());
    onValueChange(parsedValue || null);
  };

  return (
    <TextInput
      style={[styles.input, { width: width || "100%" }]}
      value={num}
      keyboardType="numeric"
      placeholder="Enter value"
      onChangeText={handleNumChange}
    />
  );
};

export default NumInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
