import { Text, GestureResponderEvent, TouchableOpacity } from "react-native";
import { commonStyles } from "../commonStyles";

interface CustomButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  title: string;
}

export const CustomButton = ({
  onPress,
  disabled,
  title,
}: CustomButtonProps) => (
  <TouchableOpacity
    style={[commonStyles.button, disabled && commonStyles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text
      style={[
        commonStyles.buttonText,
        disabled && commonStyles.disabledButtonText,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
