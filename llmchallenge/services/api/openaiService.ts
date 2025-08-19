import { apiClient } from './config';
import { handleApiError } from './errorUtils';
import { 
  ChatCompletionRequest, 
  ChatMessage, 
  Component,
  ComponentType 
} from './types';

interface ApiError extends Error {
  status: number;
  code: string;
}

const MODEL = 'gpt-4';

const createApiError = (message: string, status: number, code: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.status = status;
  error.code = code;
  return error;
};

const IDENTIFY_COMPONENTS_FUNCTION = {
  name: 'identify_components',
  description: 'Identify UI components from the text',
  parameters: {
    type: 'object',
    properties: {
      components: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              enum: ['button', 'input', 'label'],
              description: 'The type of the UI component (button, input, or label)'
            },
            color: {
              type: 'string',
              description: 'A CSS color value like "red" or "#ff0000" for the component'
            },
            text: {
              type: 'string',
              description: 'The visible text content for the component (for buttons and labels)'
            },
            placeholder: {
              type: 'string',
              description: 'Placeholder text (for input components)'
            },
            styles: {
              type: 'object',
              description: 'MUST include additional styles for the component using React Native style properties (e.g., {fontWeight: "bold", fontSize: 16, margin: 10}). Always include relevant styles based on the component type.'
            }
          },
          required: ['name', 'color'],
          additionalProperties: false
        }
      }
    },
    required: ['components']
  }
};

const getSystemMessage = (): ChatMessage => ({
  role: 'system',
  content: `You are a UI/UX expert. Analyze the text and identify UI components (button, input, or label). 
  
  IMPORTANT: You MUST call the identify_components function with the identified components.
  
  For each component, include these properties:
  - name: The type of component (must be one of: button, input, label)
  - color: A CSS color value (e.g., 'red', '#ff0000', 'rgb(255,0,0)')
  - text: The visible text content (for buttons and labels)
  - placeholder: The placeholder text (for input fields)
  - styles: ALWAYS include a styles object with React Native style properties based on the component's appearance
    - For buttons: backgroundColor, padding, borderRadius, etc.
    - For inputs: borderWidth, borderColor, padding, etc.
    - For labels: fontSize, fontWeight, margin, etc.
  
  Example 1 (Button):
  Input: "A blue button that says 'Submit' with white text"
  Output: {
    "name": "button",
    "color": "blue",
    "text": "Submit",
    "placeholder": "",
    "styles": {
      "backgroundColor": "blue",
      "color": "white",
      "padding": 10,
      "borderRadius": 5,
      "textAlign": "center"
    }
  }
  
  Example 2 (Input):
  Input: "A search input with a light gray border"
  Output: {
    "name": "input",
    "color": "#333333",
    "text": "",
    "placeholder": "Search...",
    "styles": {
      "borderWidth": 1,
      "borderColor": "#cccccc",
      "padding": 10,
      "borderRadius": 4,
      "backgroundColor": "white"
    }
  }`
});

export const identifyComponents = async (text: string): Promise<Component[]> => {
  try {
    console.log('Identifying components for text:', text);
    
    const messages: ChatMessage[] = [
      getSystemMessage(),
      {
        role: 'user',
        content: `Identify all UI components in this text: "${text}"`
      }
    ];

    const request = {
      model: MODEL,
      messages,
      temperature: 0.2,
      functions: [IDENTIFY_COMPONENTS_FUNCTION],
      function_call: { name: 'identify_components' }
    };

    console.log('Sending request to OpenAI:', JSON.stringify(request, null, 2));
    const response = await apiClient.post('/chat/completions', request).catch(handleApiError);
    
    console.log('OpenAI raw response:', JSON.stringify(response.data, null, 2));
    
    const message = response.data.choices[0]?.message;
    if (!message || !message.function_call || !message.function_call.arguments) {
      throw createApiError('Invalid response format from OpenAI', 500, 'INVALID_RESPONSE');
    }

    try {
      const { components } = JSON.parse(message.function_call.arguments);
      console.log({componentsA: components})
      if (!Array.isArray(components)) {
        throw new Error('Expected an array of components');
      }

      // Ensure all components have required fields
      return components.map(component => ({
        name: component.name,
        color: component.color || '#000000',
        text: component.text || '',
        placeholder: component.placeholder || '',
        styles: component.styles || {},
      }));
    } catch (parseError) {
      console.error('Failed to parse response:', message);
      throw createApiError('Failed to parse response', 500, 'PARSE_ERROR');
    }
  } catch (error) {
    console.error('Error identifying components:', error);
    throw createApiError('Failed to identify components', 500, 'IDENTIFY_COMPONENTS_ERROR');
  }
};
