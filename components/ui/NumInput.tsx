import { mainStyles } from "@/app/styles/global";
import { useState } from "react";
import { DimensionValue, TextInput } from "react-native";

interface NumInputProps {
  width?: DimensionValue;
  onValueChange: (value: number | null) => void;
  onSubmit?: (value: number) => void;
  placeholder?: string;
}

const NumInput: React.FC<NumInputProps> = ({
  onValueChange,
  onSubmit,
  width,
  placeholder,
}) => {
  const [num, setNum] = useState<string>("");

  const handleNumChange = (value: string) => {
    const formattedValue = value.replace(/[^0-9]/g, "");
    const parsedValue = formattedValue ? parseInt(formattedValue, 10) : "";
    setNum(parsedValue.toString());
    onValueChange(parsedValue || null);
  };

  const handleSubmit = () => {
    const parsedValue = num ? parseInt(num, 10) : 0;
    if (parsedValue > 0 && onSubmit) {
      onSubmit(parsedValue);
    }
  };

  return (
    <TextInput
      style={[mainStyles.input, { width: width || "100%" }]}
      value={num}
      keyboardType="numeric"
      placeholder={placeholder || "Enter amount"}
      onChangeText={handleNumChange}
      onSubmitEditing={handleSubmit}
      returnKeyType="done"
    />
  );
};

export default NumInput;
