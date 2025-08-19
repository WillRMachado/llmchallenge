import { ViewStyle, TextStyle } from "react-native";

export type ComponentType = "button" | "input" | "label";

export interface Component {
  name: ComponentType;
  color: string;
  description?: string;
  text?: string;
  placeholder?: string;
  styles?: ViewStyle & TextStyle;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
