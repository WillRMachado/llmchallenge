import { YStack, TextArea, Button, Text } from 'tamagui'
import { analyzeTextForComponents } from '../../services/openAi'

export default function TabOneScreen() {
  const handlePress = async () => {
    try {
      const components = await analyzeTextForComponents('a red button')
      console.log('Analysis result:', components)
      // Here you can handle the response, e.g., update state or show an alert
      alert(JSON.stringify(components, null, 2))
    } catch (error) {
      console.error('Error analyzing text:', error)
      alert('Error analyzing text. Check console for details.')
    }
  }

  return (
    <YStack flex={1} bg="$background" p="$4" gap="$4">
      <TextArea
        flex={1}
        maxHeight="50%"
        placeholder="Type here..."
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        p="$3"
        fontSize="$5"
      />
      <Button 
        onPress={handlePress}
        bg="$red9"
        color="white"
        hoverStyle={{ bg: '$red10' }}
        pressStyle={{ bg: '$red8' }}
      >
        <Text color="white" fontWeight="bold">Analyze Text</Text>
      </Button>
    </YStack>
  )
}