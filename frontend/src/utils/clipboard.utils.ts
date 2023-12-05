import * as Clipboard from "expo-clipboard";

export const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
  alert("Text copied to clipboard");
};
