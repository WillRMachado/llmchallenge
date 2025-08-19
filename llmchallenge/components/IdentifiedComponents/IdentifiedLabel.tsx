import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { Component } from '../../services/api/types';

interface IdentifiedLabelProps {
  component: Component;
  style?: ViewStyle;
}

export const IdentifiedLabel: React.FC<IdentifiedLabelProps> = ({ component, style }) => (
  <View 
    style={[
      styles.componentBox,
      style
    ] as StyleProp<ViewStyle>}
  >
    <Text style={{
      ...styles.componentText,
      color: component.color,
      ...(component.styles || {})
    } as StyleProp<TextStyle>}>
      {component.text || component.name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  componentBox: {
    padding: 12,
    borderRadius: 8,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
  componentText: { 
    color: 'white', 
    fontWeight: 'bold',
  },
});
