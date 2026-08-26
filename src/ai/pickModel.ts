import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";

export async function pickAndCopyModel(): Promise<string> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: false,
  });

  if (result.canceled || !result.assets?.length) {
    throw new Error("No model file selected.");
  }

  const sourceUri = result.assets[0].uri;
  const destPath = `${FileSystem.documentDirectory}model.gguf`;

  const fileInfo = await FileSystem.getInfoAsync(destPath);
  if (!fileInfo.exists) {
    await FileSystem.copyAsync({ from: sourceUri, to: destPath });
  }

  return destPath.replace("file://", ""); // llama.rn ko plain path chahiye
}