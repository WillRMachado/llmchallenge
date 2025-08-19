import { ViewStyle, TextStyle } from "react-native";

export type ComponentType = 'button' | 'input' | 'label';


export interface Component {
  name: ComponentType;
  color: string;
  description?: string;
  text?: string;
  placeholder?: string;
  styles?: ViewStyle & TextStyle;
}

export interface IdentifyComponentsResponse {
  components: Component[];
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  functions?: Array<{
    name: string;
    description?: string;
    parameters: object;
  }>;
  function_call?: 'auto' | 'none' | { name: string };
  temperature?: number;
  max_tokens?: number;
  response_format?: {
    type: 'text' | 'json_object';
  };
}
