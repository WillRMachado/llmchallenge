import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { Component } from '../../services/api/types';

interface IdentifiedInputProps {
  component: Component;
  style?: ViewStyle;
}

export const IdentifiedInput: React.FC<IdentifiedInputProps> = ({ component, style }) => (
  <TextInput
    style={{
      ...styles.input,
      ...(component.styles || {}),
      ...(style || {})
    } as StyleProp<TextStyle>}
    placeholder={component.placeholder || 'Enter text...'}
    placeholderTextColor={'gray'}
    value={component.text}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    minHeight: 50,
  },
});
