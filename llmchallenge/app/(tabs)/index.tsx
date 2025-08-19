import { useState } from "react";
import { YStack, TextArea, Button, Text, ScrollView } from "tamagui";
import { identifyComponents } from "../../services/api/openaiService";
import type { Component } from "../../services/api/types";
import { IdentifiedComponents } from "../../components";

export default function TabOneScreen() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identifiedComponents, setIdentifiedComponents] = useState<Component[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const handlePress = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await identifyComponents(inputText);

      if (Array.isArray(response)) {
        setIdentifiedComponents(response);

        if (response.length === 0) {
          setError(
            "No components found. Please try again with more specific text."
          );
        }
      } else {
        setIdentifiedComponents([]);
        setError("an error happened on text parsers, please try again or adjust your input");
      }
    } catch (error) {
      setError("Error analyzing text. Please try again.");
      setIdentifiedComponents([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack flex={1} bg="$background" p="$4">
      <ScrollView flex={1} mb="$4">
        {error && (
          <YStack mb="$4">
            <Text color="$red10">{error}</Text>
          </YStack>
        )}
        <IdentifiedComponents components={identifiedComponents} />
      </ScrollView>
      
      <YStack gap="$4" pb="$4">
        <TextArea
          placeholder="Describe the components you want to identify..."
          value={inputText}
          onChangeText={setInputText}
          height={150}
          borderWidth={1}
          borderColor="$borderColor"
          p="$3"
          editable={!isLoading}
          multiline
        />
        <Button
          onPress={handlePress}
          bg="$blue9"
          color="white"
          hoverStyle={{ bg: "$blue10" }}
          pressStyle={{ bg: "$blue8" }}
          disabled={isLoading}
          opacity={isLoading ? 0.7 : 1}
        >
          {isLoading ? "Analyzing..." : "Identify Components"}
        </Button>
      </YStack>
    </YStack>
  );
}
