type ComponentType = "button" | "input" | "label";

export type Component = {
  name: ComponentType;
  color: string;
};

type OpenAIResponse = {
  choices: Array<{
    message: {
      function_call?: {
        name: string;
        arguments: string;
      };
      content: string | null;
    };
  }>;
};

const openAiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

const identifyComponentsAiFunction = {
  name: "identify_components",
  description: "Identify UI components from the text",
  parameters: {
    type: "object",
    properties: {
      components: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              enum: ["button", "input", "label"],
              description: "Type of the UI component",
            },
            color: {
              type: "string",
              description: "CSS color value like 'red' or '#ff0000'",
            },
          },
          required: ["name", "color"],
        },
      },
    },
    required: ["components"],
  },
};

export const analyzeTextForComponents = async (
  text: string
): Promise<Component[]> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a UI/UX expert. Analyze the following text and identify UI components (button, input, or label) with appropriate colors.",
          },
          { role: "user", content: text },
        ],
        functions: [identifyComponentsAiFunction],
        function_call: { name: identifyComponentsAiFunction.name },
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    const data: OpenAIResponse = await response.json();
    const message = data.choices[0]?.message;

    if (!response.ok) {
      throw new Error(message?.content || "Failed to analyze text");
    }

    if (!message?.function_call) {
      throw new Error("No function call in the response");
    }

    const functionArgs = JSON.parse(message.function_call.arguments);
    return functionArgs.components as Component[];
  } catch (error) {
    console.error("Error analyzing text with OpenAI:", error);
    throw error;
  }
};
