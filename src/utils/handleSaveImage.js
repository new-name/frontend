import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import { CONTAINER_HEIGHT } from "../constants/size";

export const handleSaveImageFile = async (imageRef, saveToLocal = true) => {
  try {
    const localUri = await captureRef(imageRef, {
      format: "png",
      quality: 1.0,
      height: CONTAINER_HEIGHT,
    });

    if (saveToLocal && localUri) {
      await MediaLibrary.saveToLibraryAsync(localUri);
      return alert("Successfully Saved!");
    }

    const base64Data = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return base64Data;
  } catch (err) {
    console.log(err);
  }
};
