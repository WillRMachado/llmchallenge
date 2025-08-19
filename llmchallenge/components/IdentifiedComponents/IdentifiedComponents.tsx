import React from "react";
import { View, StyleSheet } from "react-native";
import { IdentifiedButton } from "./IdentifiedButton";
import { IdentifiedInput } from "./IdentifiedInput";
import { IdentifiedLabel } from "./IdentifiedLabel";
import type { Component, ComponentType } from "../../services/api/types";

const styles = StyleSheet.create({
  container: { marginTop: 16, width: "100%" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  componentItem: { marginBottom: 8 },
  componentLabel: { fontSize: 14, color: "gray", marginBottom: 4 },
});

interface IdentifiedComponentsProps {
  components: Component[];
}

type ComponentRenderer = (component: Component) => React.JSX.Element;

const componentsMap: Record<ComponentType, ComponentRenderer> = {
  button: (component) => <IdentifiedButton component={component} />,
  input: (component) => <IdentifiedInput component={component} />,
  label: (component) => <IdentifiedLabel component={component} />,
};

export const IdentifiedComponents: React.FC<IdentifiedComponentsProps> = ({
  components,
}) => {
  if (!components?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {components.map((component, index) => (
        <View key={`${component.name}-${index}`} style={styles.componentItem}>
          {componentsMap[component.name]?.(component) || null}
        </View>
      ))}
    </View>
  );
};
