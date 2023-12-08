import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { colors } from "../commonStyles";

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onPress: (value: any) => void;
}
const RadioButton = ({ label, value, checked, onPress }: RadioButtonProps) => (
  <TouchableOpacity onPress={() => onPress(value)}>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.accent,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: colors.accent,
            }}
          />
        )}
      </View>
      <Text style={{ marginLeft: 10, marginRight: 10, color: colors.text }}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

interface RadioGroupProps {
  options: {
    label: string;
    value: string;
  }[];
  setExternalValue: (value: any) => void;
}

export const RadioGroup = ({ options, setExternalValue }: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setExternalValue(value);
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", paddingLeft: 2 }}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onPress={() => handleSelect(option.value)}
        />
      ))}
    </View>
  );
};
