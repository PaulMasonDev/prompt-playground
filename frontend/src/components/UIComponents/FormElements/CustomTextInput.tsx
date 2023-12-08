import { TextInput } from "react-native";
import { commonStyles } from "../commonStyles";

interface CustomTextInputProps {
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholder: string;
  onSubmit: () => Promise<void>;
  multiline?: boolean;
  clearTextOnFocus?: boolean;
}

export const CustomTextInput = ({
  value,
  onChangeText,
  onSubmit,
  placeholder,
  multiline,
  clearTextOnFocus,
}: CustomTextInputProps) => (
  <TextInput
    style={commonStyles.textInput}
    value={value}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmit}
    placeholder={placeholder}
    placeholderTextColor="#e0e0e0"
    multiline={multiline}
    clearTextOnFocus={clearTextOnFocus}
  />
);
