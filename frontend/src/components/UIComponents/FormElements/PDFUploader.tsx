// PDFUploader.js

import React, { ChangeEvent, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { colors, commonStyles } from "../commonStyles";

interface PDFUploaderProps {
  setState: (fieldName: string, value: string | boolean) => void;
}

const PDFUploader = ({ setState }: PDFUploaderProps) => {
  const [fileName, setFileName] = useState("");

  const mb = 2;

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = mb * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File size should not exceed ${mb} MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        console.log(base64String.split(",")[1]);
        setState("resume", base64String.split(",")[1]); // Split to remove the data URL part
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  if (Platform.OS === "web") {
    return (
      <View>
        <label style={{ ...styles.pdfUploaderLabel, display: "inline-block" }}>
          {`Upload Resume - ${mb} MB file size limit`}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e)}
            style={styles.pdfUploaderInput} // Inline style for input specific properties
          />
        </label>
        <Text style={styles.pdfUploaderFileName}>
          {(fileName && `File Name: ${fileName}`) || ` `}
        </Text>
      </View>
    );
  }

  // Placeholder for iOS and Android
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>
        PDF Uploader is available on Web only
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfUploaderLabel: {
    backgroundColor: colors.tertiary,
    color: colors.text,
    fontFamily: "Arial",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    cursor: "pointer",
  },
  pdfUploaderInput: {
    opacity: 0,
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
  },
  pdfUploaderFileName: {
    color: "#e0e0e0",
    fontFamily: "Arial",
    marginTop: 5,
    marginBottom: 10,
    // Additional styles for the file name display
  },
  placeholderContainer: {
    ...commonStyles.button, // Reuse button style for consistency
    padding: 20,
    alignItems: "center",
  },
  placeholderText: {
    color: commonStyles.buttonText.color,
    fontSize: commonStyles.buttonText.fontSize,
  },
});

export default PDFUploader;
