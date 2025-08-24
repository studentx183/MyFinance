import { mainStyles } from "@/app/styles/global";
import { useState } from "react";
import { DimensionValue, TextInput } from "react-native";

interface NumInputProps {
  value?: number | null;
  width?: DimensionValue;
  placeholder?: string;
  onValueChange: (value: number | null) => void;
  onSubmit?: (value: number) => void;
  required?: boolean;
}

const NumInput: React.FC<NumInputProps> = ({
  onValueChange,
  onSubmit,
  value,
  width,
  placeholder,
  required,
}) => {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || "");

  const handleNumChange = (value: string) => {
    const formattedValue = value.replace(/[^0-9]/g, "");
    const parsedValue = formattedValue ? parseInt(formattedValue, 10) : "";
    setInputValue(parsedValue.toString());
    onValueChange(parsedValue || null);
  };

  const handleSubmit = () => {
    // for submitting by pressing the return key
    const parsedValue = inputValue ? parseInt(inputValue, 10) : 0;
    if (parsedValue > 0 && onSubmit) {
      onSubmit(parsedValue);
    }
  };

  return (
    <TextInput
      style={[mainStyles.input, { width: width || "100%" }]}
      value={inputValue}
      keyboardType="numeric"
      placeholder={placeholder || "Enter amount"}
      onChangeText={handleNumChange}
      onSubmitEditing={handleSubmit}
      returnKeyType="done"
    />
  );
};

export default NumInput;
