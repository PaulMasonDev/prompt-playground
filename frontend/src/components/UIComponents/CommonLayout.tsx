import { View } from "react-native";
import { commonStyles } from "./commonStyles";
import HorizontalLine from "./HorizontalLine";

interface CommonLayoutProps {
  inputSection: JSX.Element;
  outputSection: JSX.Element;
}

export const CommonLayout = ({
  inputSection,
  outputSection,
}: CommonLayoutProps) => {
  return (
    <View style={commonStyles.container}>
      {outputSection}
      <HorizontalLine />
      {inputSection}
    </View>
  );
};
