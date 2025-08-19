import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import type { Component } from "../../services/api/types";

interface IdentifiedButtonProps {
  component: Component;
  style?: ViewStyle;
}

export const IdentifiedButton: React.FC<IdentifiedButtonProps> = ({
  component,
  style,
}) => (
  <TouchableOpacity
    style={
      [
        styles.button,
        { backgroundColor: component.color },
        component.styles,
        style,
      ] as StyleProp<ViewStyle>
    }
  >
    <Text style={[styles.buttonText, component.styles as StyleProp<TextStyle>]}>
      {component.text || component.name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6c5ce7",
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
