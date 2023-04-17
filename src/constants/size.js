import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const APP_FOOTER_HEIGHT = screenHeight / 12;
export const SCROLL_HANDLE_HEIGHT = 20;
export const SCREEN_WIDTH = screenWidth;
export const SCREEN_HEIGHT = screenHeight;

export const CONTAINER_WIDTH = screenWidth * 0.9;
export const IMAGE_WIDTH = screenWidth * 0.8;
export const EDIT_WIDTH = screenWidth * 0.8;

export const MIN_TEXT_SIZE = 10;
export const MAX_TEXT_SIZE = 100;

export const MIN_GIF_SIZE = 30;
export const MAX_GIF_SIZE = 420;
