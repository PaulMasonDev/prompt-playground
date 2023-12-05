import { TextInput } from "react-native";
import { commonStyles } from "./commonStyles";

interface CustomTextInputProps {
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholder: string;
  multiline?: boolean;
}

export const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  multiline,
}: CustomTextInputProps) => (
  <TextInput
    style={commonStyles.textInput}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#e0e0e0"
    multiline={multiline}
  />
);
