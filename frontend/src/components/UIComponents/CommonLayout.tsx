import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { colors, commonStyles } from "./commonStyles";
import HorizontalLine from "./HorizontalLine";

interface CommonLayoutProps {
  inputSection: JSX.Element;
  outputSection: JSX.Element;
  isResponseVisible: boolean;
}

export const CommonLayout = ({
  inputSection,
  outputSection,
  isResponseVisible,
}: CommonLayoutProps) => {
  const [isInputVisible, setIsInputVisible] = useState(true);

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  useEffect(() => {
    if (isResponseVisible) {
      setIsInputVisible(false);
    }
  }, [isResponseVisible]);

  return (
    <View style={commonStyles.container}>
      {outputSection}
      <HorizontalLine />
      {isInputVisible && inputSection}
      {isResponseVisible && (
        <TouchableOpacity
          onPress={toggleInputVisibility}
          style={[commonStyles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={commonStyles.buttonText}>{`${
            isInputVisible ? "Hide" : "Show"
          } Input Section`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
