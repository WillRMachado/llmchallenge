import { Component, ComponentType } from '../services/api/types';



export function parseAiIdentifiedComponents(jsonString: string): Component[] {
  try {
    const { components } = JSON.parse(jsonString);
    if (!Array.isArray(components)) {
      throw new Error('Expected an array of components');
    }

    return components.map(component => {
      if (!['button', 'input', 'label'].includes(component.name)) {
        throw new Error(`Invalid component type: ${component.name}. Must be one of: button, input, label`);
      }

      return {
        name: component.name as ComponentType,
        color: component.color || '#000000',
        text: component.text || '',
        placeholder: component.placeholder || '',
        styles: component.styles || {},
      };
    });
  } catch (error) {
    console.error('Failed to parse AI identified components:', error);
    throw error;
  }
}








