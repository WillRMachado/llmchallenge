# API Service Documentation

This directory contains the API service implementation for interacting with OpenAI's API using Axios.

## Structure

- `config.ts` - Axios instance configuration and setup
- `types.ts` - TypeScript type definitions
- `openaiService.ts` - OpenAI API service implementation
- `errorUtils.ts` - Error handling utilities
- `index.ts` - Barrel file for exports

## Usage

### Initial Setup

1. Add your OpenAI API key to your environment variables:

```bash
# .env
EXPO_PUBLIC_OPENAI_API_KEY=your-api-key-here
```

### Basic Usage

```typescript
import { OpenAIService } from './api';

// Identify components from text
try {
  const components = await OpenAIService.identifyComponents(
    'I need a red button and a blue input field'
  );
  console.log(components);
  // Output: [{ name: 'button', color: 'red' }, { name: 'input', color: 'blue' }]
} catch (error) {
  console.error('Error:', error.message);
}

// Chat completion
try {
  const response = await OpenAIService.chatCompletion([
    { role: 'user', content: 'Hello, how are you?' }
  ]);
  console.log(response);
} catch (error) {
  console.error('Error:', error.message);
}
```

## Error Handling

All API calls throw `ApiError` instances with the following properties:

- `message`: Human-readable error message
- `status`: HTTP status code (if available)
- `code`: Error code for programmatic handling

## Best Practices

1. Always wrap API calls in try/catch blocks
2. Use TypeScript types for better development experience
3. Handle loading and error states in your UI components
4. Implement proper error boundaries in your React components
